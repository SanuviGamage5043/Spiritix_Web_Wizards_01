import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ users }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Validation function
  const validate = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      if (name === "username" && !users.includes(value)) {
        error = "Username does not exist";
      }
      if (name === "password" && value.length < 6) {
        error = "Password must be at least 6 characters long";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: validate("username", form.username),
      password: validate("password", form.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: form.username,
        password: form.password,
      });

      localStorage.setItem("token", response.data.token); // Save token to localStorage
      setSubmitted(true);
      setErrorMessage(null);
      navigate("/home"); // Redirect after successful login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label className="labelname">Username</label>
        <input
          type="text"
          name="username"
          className="inputname"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div className="form-group">
        <label className="labelname">Password</label>
        <input
          type="password"
          name="password"
          className="inputname"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit" disabled={Object.values(errors).some((err) => err)}>
        Log In
      </button>

      {submitted && <p className="success">Login Successful!</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
