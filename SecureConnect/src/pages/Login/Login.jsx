import React from "react";
import axios from "axios";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";  // For navigation to SignUp page
import "./Login.css";

const Login = () => {
  const users = ["existingUser", "testUser"]; // Example users

  return (
    <div className="login-container">
      <h1 className="login-heading">Login to Your Account</h1>
      <LoginForm users={users} />
      <p className="signup-link">
        Don't you have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
