import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar" style={{backgroundColor:"#34495E", padding: "15px", display: "flex", justifyContent: "right", gap:"20px"}}>
      <Link to="/" style={{color:"white", textDecoration:"none", fontSize:"large", fontWeight:"normal"}}>Home</Link>
 
      {user ? (
        <>
          <Link to="/dashboard" style={{color:"white", textDecoration:"none", fontSize:"large", fontWeight:"normal"}}>Dashboard</Link>
          <Link to="/books" style={{color:"white", textDecoration:"none", fontSize:"large", fontWeight:"normal"}}>Books</Link>
          <Link to="/issued" style={{color:"white", textDecoration:"none", fontSize:"large", fontWeight:"normal"}}>Issued</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{color:"white", textDecoration:"none", fontSize:"large", fontWeight:"normal"}}>Login</Link>
          <Link to="/register" style={{color:"white", textDecoration:"none", fontSize:"large", fontWeight:"normal"}}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar
