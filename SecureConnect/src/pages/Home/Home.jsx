import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import "./Home.css";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");

//     if (storedUsername) {
//       setUsername(storedUsername);
//     } else {
//         navigate('/login'); 
//     }
//   }, [navigate]);

  const handleLogout = () => {
    //localStorage.removeItem('username');
    navigate('/login'); 
  };


  return (
    <div>
      <div className="homeheader">
        <h1 className="messagedetails">{username ? `Hello, ${username}!` : 'Hello!'}</h1>
        <button className="logoutbtn" onClick={handleLogout}>
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
