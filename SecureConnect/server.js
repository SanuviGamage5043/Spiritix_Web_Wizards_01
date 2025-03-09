import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment variables!");
  process.exit(1); // Stop the server if JWT_SECRET is not set
}

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "secureconnect",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1); // Stop the server if database connection fails
  } else {
    console.log("Connected to MySQL!");
  }
});

// User Registration Route (SignUp)
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [existingUsers] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Username already taken!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get User Details (Read)
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.promise().query("SELECT * FROM users WHERE id = ?", [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ user: user[0] });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update User (Update)
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    // Hash the password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let query = "UPDATE users SET ";
    const params = [];

    if (username) {
      query += "username = ?, ";
      params.push(username);
    }

    if (password) {
      query += "password = ?, ";
      params.push(hashedPassword);
    }

    query = query.slice(0, -2); // Remove trailing comma and space
    query += " WHERE id = ?";
    params.push(id);

    const [result] = await db.promise().query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete User (Delete)
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.promise().query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
