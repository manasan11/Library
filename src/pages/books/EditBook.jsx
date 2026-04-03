import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import { api } from "../../utils/api";
import './BookStyles.css';

const libraryImage = "https://user-images.githubusercontent.com/70696174/180493025-0c3bfb13-2a61-473e-bc94-6e07d6bcc345.JPG";

export default function EditBook() {
  const { id } = useParams();
  const { updateBook, books } = useContext(BookContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    status: "Available",
    description: "",
    image: libraryImage
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load book.");
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateBook(id, form);
      navigate(`/books/${id}`);
    } catch (err) {
      console.error(err);
      setError("Update failed. Please try again.");
    }
  };

  if (loading) return <div className="edit-book-container"><p>Loading...</p></div>;

  return (
    <div className="edit-book-container">
      <div className="edit-book-card">
        <div className="edit-book-header">
          <h2>✏️ Edit Book</h2>
          <Link to="/books" className="btn-back">⬅️ Back</Link>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input name="title" value={form.title || ''} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input name="author" value={form.author || ''} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Genre</label>
              <input name="genre" value={form.genre || ''} onChange={handleChange} placeholder="e.g., Fiction, Classic" />
            </div>

            <div className="form-group">
              <label>Year</label>
              <input name="year" type="number" value={form.year || ''} onChange={handleChange} placeholder="e.g., 2024" />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status || 'Available'} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description || ''} onChange={handleChange} rows="4" placeholder="Book description..." />
          </div>

          {error && <p className="error-msg">{error}</p>}
          
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate(`/books/${id}`)}>Cancel</button>
            <button type="submit" className="btn-submit">💾 Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
