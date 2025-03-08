/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

function SignUpForm() {
  return (
    <form className='fullform'>
      <div>
        <label className='labeldetails'>
            Username
        </label>
        <input 
            id='username'
            type='text'
            className='inputdetails'
            />
      </div>
      <div>
        <label className='labeldetails'>
            Password
        </label>
        <input 
            id='password'
            type='text'
            className='inputdetails'
            />
      </div>
      <div>
        <label className='labeldetails'>
            Confrim Password
        </label>
        <input 
            id='confrimpassowrd'
            type='text'
            className='inputdetails'
            />
      </div>
    </form>
  )
}

export default SignUpForm;
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUpForm.css';

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Full name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }

    // Username validation
    if (!formData.username) {
      tempErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      tempErrors.username = 'Username must be at least 4 characters';
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      tempErrors.password = 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/login');
    }
  };

  return (
    <div className="pageContainer">
      <div className="contentWrapper">
        <div className="rowContainer">
          <div className="formColumn">
            <form className="formContainer" onSubmit={handleSubmit}>
              <h2 className="formTitle">Create Account</h2>

              <div className="inputGroup">
                <input
                  type="text"
                  name="fullName"
                  className={`inputField ${errors.fullName ? 'error' : ''}`}
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="errorMessage">{errors.fullName}</span>}
              </div>

              <div className="inputGroup">
                <input
                  type="email"
                  name="email"
                  className={`inputField ${errors.email ? 'error' : ''}`}
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="errorMessage">{errors.email}</span>}
              </div>

              <div className="inputGroup">
                <input
                  type="text"
                  name="username"
                  className={`inputField ${errors.username ? 'error' : ''}`}
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <span className="errorMessage">{errors.username}</span>}
              </div>

              <div className="inputGroup">
                <div className="passwordField">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`inputField ${errors.password ? 'error' : ''}`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="errorMessage">{errors.password}</span>}
              </div>

              <div className="inputGroup">
                <div className="passwordField">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className={`inputField ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="errorMessage">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="submitButton">
                Sign Up
              </button>

              <div className="loginSection">
                <span>Already have an account?</span>
                <button type="button" className="loginLink" onClick={() => navigate('/login')}>
                  Log in
                </button>
                <button type="button" className="homeLink" onClick={() => navigate('/')}>
                  ← Back to Home
                </button>
              </div>
            </form>
          </div>

          <div className="imageColumn">
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg"
              alt="Sign up illustration"
              className="signupImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
