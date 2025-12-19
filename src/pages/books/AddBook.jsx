import React, { useState, useContext } from "react";
import { BookContext } from "../../context/BookContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import '../Pagestyle.css'

export default function AddBook() {
  const { addBook } = useContext(BookContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    description: "",
    status: "Available",
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
    <div className="container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 640}} className="addbook">
        <div className="input-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Author</label>
          <input name="author" value={form.author} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Year</label>
          <input name="year" type="number" value={form.year} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Available</option>
            <option>Out of stock</option>
          </select>
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        {error && <p className="error">{error}</p>}
        <Button label="Add Book" type="submit" />
      </form>
    </div>
  );
}
