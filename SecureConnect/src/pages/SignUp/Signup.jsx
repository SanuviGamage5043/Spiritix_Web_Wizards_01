import React from 'react';
import './Signup.css';
import SignupForm from '../../components/SignupForm/SignupForm';

function Signup() {
  return (
    <div className='signuppagecontent'>
      <h1 className='headingsignup'>Creata an account</h1>
      <SignupForm />
    </div>
  )
}

export default Signup;
