import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BookContext } from '../context/BookContext'
import './Home.css'

const Home = () => {
  const { books } = useContext(BookContext);

  const featuredBooks = books.slice(0, 6);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>📚 Library Management System</h1>
          <p>Discover, Explore, and Manage Your Library Collection</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register as Guest</Link>
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
          <Link to="/register" className="btn-browse">Browse All Books →</Link>
        </div>
      </section>

      <section className="guest-info">
        <div className="guest-card">
          <h3>👋 Guest Access</h3>
          <p>Not an authorized staff member? Register as a guest to:</p>
          <ul>
            <li>✓ Browse the complete book collection</li>
            <li>✓ View book details and availability</li>
            <li>✓ Explore the library catalog</li>
          </ul>
          <Link to="/register" className="btn-register">Register as Guest</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
