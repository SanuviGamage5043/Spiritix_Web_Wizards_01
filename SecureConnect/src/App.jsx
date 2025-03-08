<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<h1>Welcome to Dashboard</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
=======
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from './pages/Home/Home';
import Login from './components/LoginForm/LoginForm';
import Signup from './components/SignUpForm/SignUpForm';

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
>>>>>>> 7a4dcafaca89c0b688a0268df3106900f6dcf71c
