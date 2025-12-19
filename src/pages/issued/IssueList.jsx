import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import { IssueContext } from '../../context/IssueContext';
export default function IssueList() {
  const { issued, deleteIssue } = useContext(IssueContext);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const filtered = issued.filter((b) => {
    const s = q.toLowerCase();
    return (
      b.title.toLowerCase().includes(s) ||
      b.author.toLowerCase().includes(s) ||
      b.borrowed_by.toLowerCase().includes(s)
    );
  });

  return (
    <div className="container">
      <h2>Issued Books</h2>

      <div className="searchbar" style={{ display: "flex", alignItems: "center", gap: 500 }}>
        <input placeholder="Search by title/author/borrowed by" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn" onClick={() => navigate("/issued/add")}> Issue Book</button>
      </div>

      <div style={{ marginTop: 16 }}>
        {filtered.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="grid">
            {filtered.map((book) => (
              <div key={book.id} className="card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Borrowed by:</strong> {book.borrowed_by}</p>
                <p><strong>Status:</strong> {book.status}</p>

                <div className="cardbuttons">
                  <Link to={`/issued/${book.id}`} className="btn">Details</Link>
                  <Link to={`/issued/edit/${book.id}`} className="btn" style={{ marginLeft: 6 }}>Edit</Link>
                  <button className="btn" style={{ marginLeft: 6 }} onClick={() => {
                    if (window.confirm("Delete this book?")) deleteIssue(book.id);
                  }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
