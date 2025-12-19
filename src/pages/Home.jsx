import React from 'react'
import './Pagestyle.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='home container'>
      <h1 >LIBRARY MANAGEMENT SYSTEM</h1>
      <h5 >Only authorized users can log in and access the system.</h5>
      <Link to="/login" className="btn">Login</Link>
      <h6>Not an authorized staff member?</h6>
      <p>Create a Guest account to browse books and view the library in read-only mode.</p>
        <Link to="/register" className="btn">Login as Guest</Link>
        
    </div>
  )
}

export default Home
