import React, { useState } from "react";
import "./Register.css";
import api from "../config/axiosInstance";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();

    // Basic validation
    if (!formData.name || !phone || !email || !password) {
      setError("All fields are required!");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Invalid phone number! Enter 10 digits.");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Invalid email format!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    try {
      const response = await api.post("/users/register", formData);
      localStorage.setItem("token", response.data.token);

      console.log("🚀 ~ Registration Response:", response);
      toast.success("Registration successful!");
      await queryClient.invalidateQueries({queryKey:["user"]})

      setError("");
      navigate("/");
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err)
      toast.error("Registration failed. Please try again.");
      setError("");
    }
  };

  return (
    <div className="register-page">
      <div className="glass-container">
        <img
          src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
          alt="Water Metro"
          className="logo"
        />
        <h2 className="title">Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <TextField
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
          />

          <label>Phone Number</label>
          <TextField
            type="tel"
            name="phone"
            placeholder="1234567890"
            value={formData.phone}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
          />

          <label>Email</label>
          <TextField
            type="email"
            name="email"
            placeholder="username@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
          />

          <label>Password</label>
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
          />

          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
