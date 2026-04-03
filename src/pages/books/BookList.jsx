import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import { AuthContext } from "../../context/AuthContext";
import './BookStyles.css';

export default function BookList() {
  const { books, deleteBook } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const filtered = books.filter((b) => {
    const s = q.toLowerCase();
    return (
      (b.title || "").toLowerCase().includes(s) ||
      (b.author || "").toLowerCase().includes(s) ||
      (b.status || "").toLowerCase().includes(s) ||
      (b.genre || "").toLowerCase().includes(s)
    );
  });

  const defaultImage = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop';

  return (
    <div className="books-container">
      <div className="books-header">
        <h2>📚 Library Books</h2>
        {(user?.role === 'admin' || user?.email === 'manasa@gmail.com') && <button className="btn-add-book" onClick={() => navigate("/books/add")}>+ Add Book</button>}
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
            <p>No books found in the library.</p>
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
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">✍️ {book.author}</p>
                <p className="genre">📖 {book.genre} • 📅 {book.year}</p>
                <p className="description">{book.description}</p>
                <div className="book-actions">
                  <Link to={`/books/${book.id}`} className="btn-details">View</Link>
                  {(user?.role === 'admin' || user?.email === 'manasa@gmail.com') && (
                    <>
                      <Link to={`/books/edit/${book.id}`} className="btn-edit-book">Edit</Link>
                      <button className="btn-delete-book" onClick={() => {
                        if (window.confirm("Delete this book?")) deleteBook(book.id);
                      }}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
