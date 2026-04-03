import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BookContext } from '../context/BookContext'
import { AuthContext } from '../context/AuthContext'
import './Home.css'

const Home = () => {
  const { books } = useContext(BookContext);
  const { user } = useContext(AuthContext);

  const featuredBooks = books.slice(0, 6);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>📚 Welcome, {user?.name || 'User'}!</h1>
          <p>Library Management System - Explore and Manage Your Collection</p>
          <div className="hero-buttons">
            <Link to="/books" className="btn-primary">Browse Books</Link>
            <Link to="/issued" className="btn-secondary">View Issued</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Book Collection</h3>
          <p>Browse our vast collection of books across various genres</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Issue Tracking</h3>
          <p>Track issued books and manage returns efficiently</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>User Management</h3>
          <p>Manage students and staff with ease</p>
        </div>
      </section>

      <section className="featured-books">
        <h2>Featured Books</h2>
        <div className="books-showcase">
          {featuredBooks.map((book) => (
            <div key={book.id} className="showcase-book">
              <img 
                src={book.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop'} 
                alt={book.title}
              />
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link to="/books" className="btn-browse">Browse All Books →</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
