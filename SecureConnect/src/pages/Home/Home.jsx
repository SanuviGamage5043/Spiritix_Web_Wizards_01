import React from 'react';
import './Home.css';

function Home() {
  return (
    <main className='homepagecontent'>
        <div className='homeheader'>
        <h1 className='messagedetails'>Hello</h1>
        <button className='logoutbtn'>Logout</button>
        </div>
        <div>
            <h2 classname='headingwelcome'>
                Welcome to SecureConnect
            </h2>
        </div>
        
    </main>
   
    
  );
}

export default Home;
