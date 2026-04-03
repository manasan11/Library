import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { BookContext } from "../../context/BookContext";
import { AuthContext } from "../../context/AuthContext";
import './BookStyles.css';

const libraryImage = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const { deleteBook } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load book.");
      }
    };
    load();
  }, [id]);

  if (error) 
    return 
    <div className="book-details-container">
      <p className="error">{error}</p>
    </div>;
  if (!book) 
    return 
    <div className="book-details-container">
      <p>Loading...</p>
    </div>;

  return (
    <div className="book-details-page">
      <div className="book-details-wrapper">
        <div className="book-details-card-full">
          <div className="book-image-section">
            <img src={book.image || libraryImage} alt={book.title} />
          </div>
          
          <div className="book-info-section">
            <div className="book-header">
              <h1>{book.title}</h1>
              <p className="book-author">By {book.author}</p>
            </div>
            
            <div className="book-details-grid">
              <div className="detail-item">
                <span className="detail-icon">📖</span>
                <div className="detail-content">
                  <label>Genre</label>
                  <p>{book.genre || 'N/A'}</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <div className="detail-content">
                  <label>Published Year</label>
                  <p>{book.year || 'N/A'}</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🆔</span>
                <div className="detail-content">
                  <label>Book ID</label>
                  <p>#{book.id}</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📚</span>
                <div className="detail-content">
                  <label>Availability</label>
                  <p className={book.status === 'Available' ? 'text-success' : 'text-warning'}>
                    {book.status === 'Available' ? 'Available for Issue' : 'Currently Issued'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="book-description-section">
              <h3>📝 Book Description</h3>
              <div className="description-box">
                <p className="description-text">
                  {book.description && book.description.length > 0 
                    ? book.description 
                    : ` "${book.title}" is a remarkable book written by ${book.author}. 
                    
This book belongs to the ${book.genre || 'General'} genre and was published in ${book.year || 'unknown year'}.

${book.status === 'Available' 
  ? 'This book is currently available in our library and can be issued.' 
  : 'This book is currently issued and not available for borrowing.'}

Visit our library to explore this amazing read!`}
                </p>
              </div>
            </div>
            
            <div className="book-details-actions">
              {(user?.role === 'admin' || user?.email === 'manasa@gmail.com') && (
                <>
                  <Link to={`/books/edit/${book.id}`} className="btn-edit-book">✏️ Edit Details</Link>
                  <button className="btn-delete-book" onClick={() => {
                    if (window.confirm("Are you sure you want to delete this book?")) {
                      deleteBook(book.id);
                      navigate("/books");
                    }
                  }}>🗑️ Delete Book</button>
                </>
              )}
              <Link to="/books" className="btn-back">⬅️ Back to Books</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
