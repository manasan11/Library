import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../pages/Pagestyle.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setError("Enter a valid email address.");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      const ok = await login(form.email, form.password);
      if (!ok) {
        setError("Invalid email or password.");
        return;
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="login container-fluid">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <div className="input-group">
          <input name="email" placeholder="Enter email here" value={form.email} onChange={handleChange} />
        </div>
    <br /><br />
        <div className="input-group">
          <input
            name="password"
            type="password" placeholder="Enter password here"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="btn" type="submit">Login</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Not an authorized staff member?{" "}
        <Link to="/register" className="btn">Guest</Link>
      </p>
    </div>
  );
}
