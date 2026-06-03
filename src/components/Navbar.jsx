import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={user ? "/home" : "/login"} onClick={() => setMenuOpen(false)}>📚 Library</Link>
      </div>
      <button className={`navbar-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        {user ? (
          <>
            <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link>
            <Link to="/issued" onClick={() => setMenuOpen(false)}>Issued</Link>
            <button className="btn-logout" onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn-register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar
