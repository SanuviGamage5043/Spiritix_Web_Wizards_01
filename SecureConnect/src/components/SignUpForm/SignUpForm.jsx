import React from 'react';
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
