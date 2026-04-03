import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AuthStyles.css";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back! 👋</h2>
            <p>Login to access the library</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                name="email" 
                type="email"
                placeholder="Enter your email" 
                value={form.email} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password" 
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" className="btn-auth">Login</button>
          </form>

          <div className="auth-footer">
            <p>Not an authorized staff member?</p>
            <Link to="/register" className="btn-guest">Register as Guest</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
