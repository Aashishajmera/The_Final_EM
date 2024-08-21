import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Signup.css";

export default function SignUp() {
    // State for form fields and errors
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // Clear errors when user types
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value)
        }));
    };

    // Validate individual field
    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                return value.trim() ? "" : "Username is required";
            case 'email':
                return value.trim()
                    ? /\S+@\S+\.\S+/.test(value) ? "" : "Email is invalid"
                    : "Email is required";
            case 'password':
                return value.trim()
                    ? value.length >= 6 ? "" : "Password must be at least 6 characters"
                    : "Password is required";
            default:
                return "";
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {
            username: validateField('username', formData.username),
            email: validateField('email', formData.email),
            password: validateField('password', formData.password)
        };

        setErrors(validationErrors);

        if (Object.values(validationErrors).every(error => !error)) {
            // Form is valid, handle form submission here (e.g., API call)
            console.log("Form submitted:", formData);
            toast.success("Form submitted successfully!");
        } else {
            toast.error("Please fill the form correctly.");
        }
    };

    return (
        <>
            <main className="main-container d-flex align-items-center justify-content-center">
                <div className="input-container p-4 m-3">
                    <div className="text-center mb-3">
                        <h3 className="fw-bolder">SignUp</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInputName"
                                name="username"
                                placeholder="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInputName">Username</label>
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Email address</label>
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingPassword">Password</label>
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="btn btn-outline-success me-2">SignUp</button>
                            <Link to="/singIn">Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </main>
            <ToastContainer />
        </>
    );
}
