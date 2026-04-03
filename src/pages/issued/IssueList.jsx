import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IssueContext } from '../../context/IssueContext';
import { AuthContext } from '../../context/AuthContext';
import './IssuedStyles.css';

export default function IssueList() {
  const { issued, deleteIssue } = useContext(IssueContext);
  const { user } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const filtered = issued.filter((item) => {
    const s = q.toLowerCase();
    return (
      (item.bookTitle || "").toLowerCase().includes(s) ||
      (item.studentName || "").toLowerCase().includes(s)
    );
  });

  return (
    <div className="issued-container">
      <div className="issued-header">
        <h2>📚 Issued Books</h2>
        {(user?.role === 'admin' || user?.email === 'manasa@gmail.com') && <button className="btn-issue" onClick={() => navigate("/issued/add")}>+ Issue New Book</button>}
      </div>

      <div className="search-box">
        <input 
          placeholder="🔍 Search by book title or student name..." 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
        />
      </div>

      <div className="issued-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No issued books found.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="issued-card">
              <div className="issued-card-header">
                <span className={`status-badge ${item.status === 'Issued' ? 'status-issued' : 'status-returned'}`}>
                  {item.status || 'Issued'}
                </span>
              </div>
              <h3>{item.bookTitle}</h3>
              <div className="issued-details">
                <p><strong>👤 Student:</strong> {item.studentName}</p>
                <p><strong>📅 Issued:</strong> {item.issueDate}</p>
                <p><strong>📅 Due:</strong> {item.returnDate}</p>
              </div>
              <div className="issued-actions">
                <Link to={`/issued/${item.id}`} className="btn-view">View</Link>
                {(user?.role === 'admin' || user?.email === 'manasa@gmail.com') && (
                  <>
                    <Link to={`/issued/edit/${item.id}`} className="btn-edit">Edit</Link>
                    <button className="btn-delete" onClick={() => {
                      if (window.confirm("Delete this issue record?")) deleteIssue(item.id);
                    }}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
