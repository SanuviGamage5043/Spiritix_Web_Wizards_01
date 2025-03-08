import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // Import the CSS file
import Background from "../assets/image/login.jpeg"; // Ensure correct path

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded user credentials (for demo purposes)
  const mockUser = {
    username: "admin",
    password: "123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (username === mockUser.username && password === mockUser.password) {
      setError("");
      navigate("/dashboard"); // Redirect to the dashboard after login
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className = "background">
        <img src = {Background} className = "background-image"/>
      </div>
      <div className = 'login-container'>
      <h2 className = 'login-title'>User Login</h2>

      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleLogin}>
        
        <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

        <button type="submit" className="login-btn">Log In</button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;
