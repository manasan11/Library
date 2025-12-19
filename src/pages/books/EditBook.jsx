import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import { api } from "../../utils/api";
import Button from "../../components/Button";

export default function EditBook() {
  const { id } = useParams();
  const { updateBook } = useContext(BookContext);
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load book.");
      }
    };
    load();
  }, [id]);

  if (!form) return <div className="container"><p>Loading...</p></div>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateBook(id, form);
      navigate(`/books/${id}`);
    } catch (err) {
      console.error(err);
      setError("Update failed.");
    }
  };

  return (
    <div className="container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
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
          <input name="year" value={form.year} onChange={handleChange} />
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
        <Button label="Save Changes" type="submit" />
      </form>
    </div>
  );
}
