import React, { useState } from "react";
import axios from "axios";
import "./SignUpForm.css";

const SignUpForm = ({ users }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      if (name === "username") {
        if (value.length < 8) error = "Username must be at least 8 characters long";
        else if (users.includes(value)) error = "Username is already taken";
      }
      if (name === "password") {
        if (!/(?=.[a-z])(?=.[A-Z])(?=.*\W)/.test(value)) {
          error = "Password must contain an uppercase, lowercase, and a special character";
        }
      }
      if (name === "confirmPassword") {
        if (value !== form.password) error = "Passwords do not match";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      username: validate("username", form.username),
      password: validate("password", form.password),
      confirmPassword: validate("confirmPassword", form.confirmPassword),
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some((err) => err)) {
      try {
        const response = await axios.post("http://localhost:5000/api/signup", {
          username: form.username,
          password: form.password,
        });
        setSubmitted(true);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="inputsignup"
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="inputsignup"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="inputsignup"
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      <button type="submit" disabled={Object.values(errors).some((err) => err)}>
        Sign Up
      </button>
      {submitted && <p className="success">Signup Successful!</p>}
    </form>
  );
};

export default SignUpForm;
