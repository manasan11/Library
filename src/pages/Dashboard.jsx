import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BookContext } from "../context/BookContext";
import { IssueContext } from "../context/IssueContext";


export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { books } = useContext(BookContext);
  const { issued } = useContext(IssueContext);
  const myCount = books.length;
  const issueCount = issued.length;

  return (
    <div className="container" style={{marginTop:20}}>
      <h2>Welcome, {user?.name || "User"}</h2>

      
        <div>
          <p>You have <strong>{myCount}</strong> books in your library.</p>
          <Link to="/books" className="btn" style={{ marginLeft: 8}}>View Books</Link>
          <Link to="/books/add" className="btn" style={{ marginLeft: 8}}>Add Book</Link>
        </div>
  
  
        <div>
          <p>You have <strong>{issueCount}</strong> issued books in your library.</p>
          <Link to="/issued" className="btn" style={{ marginLeft: 8 }}>View issued list</Link>
          <Link to="/issued/add" className="btn" style={{ marginLeft: 8 }}>Add issue</Link>
        </div>
      </div>
    

    
  );
}

