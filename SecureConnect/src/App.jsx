import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
  );
};

export default App;
