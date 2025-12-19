import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import './Pagestyle.css'
import Button from "../components/Button";
const Register = () => {
    emailjs.init("gEMccHReJFU8aD1PY");

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [errors, setErrors] = useState({});
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length === 0) {
            emailjs
                .send("service_5sm92zl", "template_yhmkdzr", {
                    name: formData.name,
                    email: formData.email,
                    
                })
                .then(() => {
                    alert("Registration successfull");
                    navigate('/bookread');
                })
                .catch(() => {
                    alert("Failed to submit");
                });
        } else {
            setErrors(validationErrors);
        }
    }; 

    return (
        <div className="register">
            <h2>Register here</h2>
                  <h6>Not an authorized staff member?</h6>
      <p>Enter as Guest to browse books and view the library.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} /><br /><br />
                    {errors.name && <p>{errors.name}</p>}

                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} /><br /><br />
                    {errors.email && <p>{errors.email}</p>}

                    <button type='submit' className="btn">View as a guest</button><br />
                </div>
            </form>
        </div>
    );
}

export default Register;




