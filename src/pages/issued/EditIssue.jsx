import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import Button from "../../components/Button";
import { IssueContext } from '../../context/IssueContext';

export default function EditIssue() {
  const { id } = useParams();
  const { updateIssue } = useContext(IssueContext);
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/issued/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load book.");
      }
    };
    load();
  }, [id]);

  if (!form) return <div className="container"><p>Loading...</p></div>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateIssue(id, form);
      navigate(`/issued/${id}`);
    } catch (err) {
      console.error(err);
      setError("Update failed.");
    }
  };

  return (
    <div className="container">
      <h2>Edit Issue</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
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
          <input name="issued_date" value={form.issued_date} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Due date</label>
          <input name="return_date" value={form.return_date} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Issued</option>
            <option>Returned</option>
          </select>
        </div>

        

        {error && <p className="error">{error}</p>}
        <Button label="Save Changes" type="submit" />
      </form>
    </div>
  );
}
