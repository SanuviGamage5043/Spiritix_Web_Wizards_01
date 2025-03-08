import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "./SignUp.css";

const SignUp = () => {
  const users = ["existingUser", "testUser"]; // Example usernames

  return (
    <div className="signup-container">
      <h1 className="signup-heading">Create a new account</h1>
      <SignUpForm users={users} />
    </div>
  );
};

export default SignUp;
