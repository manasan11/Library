import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './BookRead.css';

const BookRead = () => {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState("");
    
  const filtered = books.filter((b) => {
    const s = q.toLowerCase();
    return (
      (b.title || "").toLowerCase().includes(s) ||
      (b.author || "").toLowerCase().includes(s) ||
      (b.status || "").toLowerCase().includes(s) ||
      (b.genre || "").toLowerCase().includes(s)
    );
  });

  useEffect(() => {
    axios
      .get("http://localhost:5002/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const defaultImage = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop';

  return (
    <div className="guest-books-page">
      <div className="guest-header">
        <div>
          <h2>📚 Library Collection</h2>
          <p>Browse our books as a guest</p>
        </div>
        <div className="guest-actions">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register-guest">Register</Link>
        </div>
      </div>

      <div className="search-box">
        <input 
          placeholder="🔍 Search by title, author, genre..." 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
        />
      </div>

      <div className="books-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No books found.</p>
          </div>
        ) : (
          filtered.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img 
                  src={book.image || defaultImage} 
                  alt={book.title}
                  onError={(e) => { e.target.src = defaultImage; }}
                />
                <span className={`book-status ${book.status === 'Available' ? 'available' : 'issued'}`}>
                  {book.status}
                </span>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">✍️ {book.author}</p>
                <p className="genre">📖 {book.genre} • 📅 {book.year}</p>
                <p className="description">{book.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookRead;
