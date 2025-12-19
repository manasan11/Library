import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import '../Pagestyle.css'

export default function BookList() {
  const { books, deleteBook } = useContext(BookContext);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const filtered = books.filter((b) => {
    const s = q.toLowerCase();
    return (
      b.title.toLowerCase().includes(s) ||
      b.author.toLowerCase().includes(s) ||
      b.status.toLowerCase().includes(s) ||
      (b.category || "").toLowerCase().includes(s)
    );
  });

  return (
    <div className="container-fluid">
      <h2>Books</h2>

      <div className="searchbar container-fluid" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input placeholder="Search by title/author/category/available" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn" onClick={() => navigate("/books/add")}>Add Book</button>
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
                <p><strong>Year:</strong> {book.year}</p>
                <p><strong>Status:</strong> {book.status}</p>

                <div className="cardbuttons">
                  <Link to={`/books/${book.id}`} className="btn">Details</Link>
                  <Link to={`/books/edit/${book.id}`} className="btn" >Edit</Link>
                  <button className="btn" onClick={() => {
                    if (window.confirm("Delete this book?")) deleteBook(book.id);
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
