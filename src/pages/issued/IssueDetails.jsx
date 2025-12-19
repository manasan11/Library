import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { BookContext } from "../../context/BookContext";
import { IssueContext } from '../../context/IssueContext';
export default function IssueDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const { deleteIssue } = useContext(IssueContext);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/issued/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load book.");
      }
    };
    load();
  }, [id]);

  if (error) return <div className="container"><p className="error">{error}</p></div>;
  if (!book) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Borrowed by:</strong> {book.borrowed_by}</p>
      <p><strong>Issued date:</strong> {book.issued_date}</p>
      <p><strong>Due date:</strong> {book.return_date}</p>
      <p><strong>Status:</strong> {book.status}</p>


      <div style={{ marginTop: 12 }}>
        <Link to={`/issued/edit/${book.id}`} className="btn">Edit</Link>
        <button className="btn" style={{ marginLeft: 8 }} onClick={() => {
          if (window.confirm("Delete this record?")) {
            deleteIssue(book.id);
            navigate("/issued");
          }
        }}>Delete</button>
        <Link to="/issued" className="btn" style={{ marginLeft: 8 }}>Back</Link>
      </div>
    </div>
  );
}
