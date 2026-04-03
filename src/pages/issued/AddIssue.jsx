import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IssueContext } from "../../context/IssueContext";
import { BookContext } from "../../context/BookContext";
import './IssuedStyles.css';

export default function AddIssue() {
  const { addIssue } = useContext(IssueContext);
  const { books } = useContext(BookContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bookId: "",
    bookTitle: "",
    studentName: "",
    issueDate: "",
    returnDate: "",
    status: "Issued",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "bookId") {
      const selectedBook = books.find(b => b.id === parseInt(e.target.value));
      setForm({ 
        ...form, 
        bookId: e.target.value,
        bookTitle: selectedBook ? selectedBook.title : ""
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    if (!form.bookId || !form.studentName) {
      setError("Please select a book and enter student name.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    try {
      await addIssue(form);
      navigate("/issued");
    } catch (err) {
      console.error(err);
      setError("Failed to issue book.");
    }
  };

  const availableBooks = books.filter(b => b.status === 'Available');

  return (
    <div className="add-issue-container">
      <div className="add-issue-card">
        <h2>📖 Issue a Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Book</label>
            <select name="bookId" value={form.bookId} onChange={handleChange} required>
              <option value="">-- Choose a book --</option>
              {availableBooks.map(book => (
                <option key={book.id} value={book.id}>{book.title} - {book.author}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Student Name</label>
            <input 
              name="studentName" 
              value={form.studentName} 
              onChange={handleChange} 
              placeholder="Enter student name"
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Issue Date</label>
              <input 
                name="issueDate" 
                type="date" 
                value={form.issueDate} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input 
                name="returnDate" 
                type="date" 
                value={form.returnDate} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {error && <p className="error-msg">{error}</p>}
          
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/issued")}>Cancel</button>
            <button type="submit" className="btn-submit">Issue Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}
