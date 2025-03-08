import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import "./Home.css";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Retrieve username from localStorage (or any global state)
  //   const savedUsername = localStorage.getItem("username");
  //   if (savedUsername) {
  //     setUsername(savedUsername);
  //   } else {
  //     // Redirect to login page if no username is found
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <div>
      <div className="homeheader">
        <h1 className="messagedetails">{username ? `Hello, ${username}!` : 'Hello!'}</h1>
        <button
          className="logoutbtn"
          onClick={() => {
            
            
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <div className="homecontent">
        <h1 className="welcomemessage">Welcome to SecureConnect</h1>
      </div>
    </div>
  );
}

export default Home;
