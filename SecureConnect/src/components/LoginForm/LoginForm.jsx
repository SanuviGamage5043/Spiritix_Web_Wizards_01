import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ users }) => {
  const [form, setForm] = useState({
    username: "admin",
    password: "1234567",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      username: validate("username", form.username),
      password: validate("password", form.password),
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).some((err) => err)) {
      setSubmitted(true);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
    </form>
  );
};

export default LoginForm;
