import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { BookContext } from "../../context/BookContext";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const { deleteBook } = useContext(BookContext);
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
    <div className="container">
      <p className="error">{error}</p>
    </div>;
  if (!book) 
    return 
    <div className="container">
      <p>Loading...</p>
    </div>;

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Status:</strong> {book.status}</p>
      <p style={{ marginTop: 12 }}>{book.description}</p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/books/edit/${book.id}`} className="btn">Edit</Link>
        <button className="btn" style={{ marginLeft: 8 }} onClick={() => {
          if (window.confirm("Delete this book?")) {
            deleteBook(book.id);
            navigate("/books");
          }
        }}>Delete</button>
        <Link to="/books" className="btn" style={{ marginLeft: 8 }}>Back</Link>
      </div>
    </div>
  );
}
