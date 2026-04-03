import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BookContext } from "../context/BookContext";
import { IssueContext } from "../context/IssueContext";
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { books } = useContext(BookContext);
  const { issued } = useContext(IssueContext);
  const bookCount = books.length;
  const issueCount = issued.length;
  const availableCount = bookCount - issueCount;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name || "User"}! 👋</h1>
          <p>{user?.role === 'admin' || user?.email === 'manasa@gmail.com' ? "Full access" : "Read-only access"}</p>
        </div>
        <div className="user-avatar">
          <span>{user?.name?.charAt(0) || 'U'}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card books">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{bookCount}</h3>
            <p>Total Books</p>
          </div>
        </div>
        <div className="stat-card available">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{availableCount}</h3>
            <p>Available</p>
          </div>
        </div>
        <div className="stat-card issued">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{issueCount}</h3>
            <p>Issued</p>
          </div>
        </div>
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>2</h3>
            <p>Users</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <div className="action-card">
          <div className="action-icon books-icon">📖</div>
          <div className="action-content">
            <h3>Manage Books</h3>
            <p>Add, edit, or remove books from your library</p>
          </div>
          <div className="action-buttons">
            <Link to="/books" className="btn-view">View All</Link>
            {(user?.role === 'admin' || user?.email === 'manasa@gmail.com') && <Link to="/books/add" className="btn-add">+ Add New</Link>}
          </div>
        </div>

        <div className="action-card">
          <div className="action-icon issued-icon">📝</div>
          <div className="action-content">
            <h3>Issue Management</h3>
            <p>Track and manage book issues and returns</p>
          </div>
          <div className="action-buttons">
            <Link to="/issued" className="btn-view">View All</Link>
            {(user?.role === 'admin' || user?.email === 'manasa@gmail.com') && <Link to="/issued/add" className="btn-add">+ New Issue</Link>}
          </div>
        </div>
      </div>

      <div className="quick-links">
        <h3>Quick Links</h3>
        <div className="links-grid">
          <Link to="/books" className="quick-link">
            <span>📚</span> Browse Books
          </Link>
          <Link to="/issued" className="quick-link">
            <span>📋</span> Issued Books
          </Link>
          {(user?.role === 'admin' || user?.email === 'manasa@gmail.com') && (
            <>
              <Link to="/books/add" className="quick-link">
                <span>➕</span> Add Book
              </Link>
              <Link to="/issued/add" className="quick-link">
                <span>📖</span> Issue Book
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

