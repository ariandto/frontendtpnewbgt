import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import './App.css'; // Import CSS file

const App = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('token'); // Remove token from sessionStorage
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">Auth App</div>
        <ul className="navbar-links">
          <li>
            <Link to="/register">Register</Link>
          </li>
          {!token && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {token && (
            <>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/home"
            element={token ? <Home token={token} /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
