import React, { useEffect, useState } from "react";
import axios from "axios";
import './Pagestyle.css'
const BookRead = () => {
  const [books, setBooks] = useState([]);
      const [q, setQ] = useState("");
    
  const filtered = books.filter((b) => {
    const s = q.toLowerCase();
    return (
      b.title.toLowerCase().includes(s) ||
      b.author.toLowerCase().includes(s) ||
      b.status.toLowerCase().includes(s) ||
      (b.category || "").toLowerCase().includes(s)
    );
  });
  useEffect(() => {
    axios
      .get("http://localhost:5002/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="readonly">
      <h2>Books</h2>

      <div className="searchbar" style={{ display: "flex", alignItems: "center", gap: 500 }}>
        <input placeholder="Search by title/author/category/available" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

    <div style={{ marginTop: 16 }}>
        {filtered.length === 0 ? (
          <p>No books found.</p>
        ) : (

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {filtered.map((book) => (
          <div key={book.id} className="card">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Status:</strong> {book.status}</p>
            <p><strong>Description:</strong> {book.description}</p>

          </div>
        ))}
      </div>
        )}
    </div>
    </div>
  );
};

export default BookRead;
