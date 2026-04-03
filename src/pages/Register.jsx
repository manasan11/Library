import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './AuthStyles.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [errors, setErrors] = useState({});
    const { register, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        return errors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length === 0) {
            try {
                await register({ name: formData.name, email: formData.email, role: 'student', password: 'guest123' });
                await login(formData.email, 'guest123');
                navigate('/dashboard');
            } catch (err) {
                errors.submit = "Registration failed. Try again.";
                setErrors({ ...errors, submit: "Registration failed. Try again." });
            }
        } else {
            setErrors(validationErrors);
        }
    }; 

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Register as Guest 👤</h2>
                        <p>Browse books in read-only mode</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Enter your name"
                                value={formData.name} 
                                onChange={handleChange} 
                            />
                            {errors.name && <span className="field-error">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email"
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>

                        {errors.submit && <p className="error-msg">{errors.submit}</p>}

                        <button type='submit' className="btn-auth">Register as Guest</button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account?</p>
                        <Link to="/login" className="btn-guest">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;




