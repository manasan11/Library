import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { IssueContext } from "../../context/IssueContext";

export default function AddIssue() {
  const { addIssue } = useContext(IssueContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    borrowed_by : "",
    issued_date: "",
    return_date: "",
    status: "Issued",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.title || !form.author || !form.borrowed_by) {
      setError("Details are required.");
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
      setError("Failed to add data.");
    }
  };

  return (
    <div className="container">
      <h2>Add Issued</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 640 }} className="addbook">
        <div className="input-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Author</label>
          <input name="author" value={form.author} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Borrowed by</label>
          <input name="borrowed_by" value={form.borrowed_by} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Issued date</label>
          <input name="issued_date" type="date" value={form.issued_date} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Due date</label>
          <input name="return_date" type="date" value={form.return_date} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Issued</option>
            <option>Returned</option>
          </select>
        </div>


        {error && <p className="error">{error}</p>}
        <Button label="Add Issue" type="submit" />
      </form>
    </div>
  );
}
