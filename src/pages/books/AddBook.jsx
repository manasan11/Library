import React, { useState, useContext } from "react";
import { BookContext } from "../../context/BookContext";
import { useNavigate } from "react-router-dom";
import './BookStyles.css';

const libraryImage = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop";

export default function AddBook() {
  const { addBook } = useContext(BookContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
    description: "",
    status: "Available",
    image: libraryImage,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.title || !form.author) {
      setError("Title and author are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    try {
      await addBook(form);
      navigate("/books");
    } catch (err) {
      console.error(err);
      setError("Failed to add book.");
    }
  };

  return (
    <div className="edit-book-container">
      <div className="edit-book-card">
        <div className="edit-book-header">
          <h2>➕ Add New Book</h2>
          <button className="btn-back" onClick={() => navigate("/books")}>⬅️ Back</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input name="author" value={form.author} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Genre</label>
              <input name="genre" value={form.genre} onChange={handleChange} placeholder="e.g., Fiction, Classic" />
            </div>

            <div className="form-group">
              <label>Year</label>
              <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="e.g., 2024" />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Book description..." />
          </div>

          {error && <p className="error-msg">{error}</p>}
          
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/books")}>Cancel</button>
            <button type="submit" className="btn-submit">➕ Add Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}
