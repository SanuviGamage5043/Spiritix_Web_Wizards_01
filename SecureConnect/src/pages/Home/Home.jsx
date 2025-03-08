import React from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <div className='homeheader'>
        <h1 className='messagedetails'>Hello</h1>
        <button className='logoutbtn'>Logout</button>
      </div>

      <div className='homecontent'>
        <h1 className='welcomemessage'>Welcome to SecureConnect</h1>
      </div>
    </div>
   
    
  );
}

export default Home;
