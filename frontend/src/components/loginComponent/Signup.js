import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios'; // Import axios
import "./Signup.css";

export default function SignUp() {
    // State for form fields and errors
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert email to lowercase if the field being changed is email
        const normalizedValue = name === 'email' ? value.toLowerCase() : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: normalizedValue
        }));

        // Clear errors when user types
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, normalizedValue)
        }));
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'userName':
                // Check if username contains only alphabetic characters
                const alphabeticPattern = /^[A-Za-z]+$/;
                if (!value.trim()) {
                    return "Username is required";
                } else if (!alphabeticPattern.test(value)) {
                    return "Username must be alphabetic";
                }
                return ""; // Valid username
            case 'email':
                // General email validation pattern
                const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
                if (!value.trim()) {
                    return "Email is required";
                } else if (!emailPattern.test(value)) {
                    return "Email is invalid";
                } 
                return ""; // Valid email
            case 'password':
                return value.trim()
                    ? value.length >= 6 ? "" : "Password must be at least 6 characters"
                    : "Password is required";
            default:
                return "";
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {
            userName: validateField('userName', formData.userName),
            email: validateField('email', formData.email),
            password: validateField('password', formData.password)
        };

        setErrors(validationErrors);

        if (Object.values(validationErrors).every(error => !error)) {
            // Form is valid, handle form submission here (e.g., API call)
            try {
                const response = await axios.post('http://localhost:3000/user/usersignup', formData);
                setFormData({
                    userName: "",
                    email: "",
                    password: ""
                }); // Clear the form
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.data.msg || "Sign-Up successful!",
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Navigate to the sign-in page after success
                    navigate('/signIn');
                });
            } catch (error) {
                console.error("Error during sign-up:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data?.msg || "Sign-Up failed. Please try again.",
                    confirmButtonText: 'OK'
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: "Please fill the form correctly.",
                confirmButtonText: 'OK'
            });
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
                                name="userName"
                                placeholder="userName"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInputName">Username</label>
                            {errors.userName && <div className="text-danger">{errors.userName}</div>}
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
                            <Link to="/signIn">Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
