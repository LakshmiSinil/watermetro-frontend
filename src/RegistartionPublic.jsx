import React, { useState } from "react";
import "./Registerp.css"; // Ensure this file exists
import api from "./config/axiosInstance";

const Registrationp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  console.log("🚀 ~ Registrationp ~ formData:", formData);

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim inputs before validation
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
    const response = await api.post("/users/register", formData);
    console.log("🚀 ~ handleSubmit ~ response:", response);
    setError("");

    // Reset form after successful registration
    // setFormData({ name: "", phone: "", email: "", password: "" });
  };

  return (
    <div className="pbackground">
      <div className="glass-container">
        <img
          src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
          alt="Water Metro"
          className="logo"
        />
        <h2 className="title">Register</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Show error if any */}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="1234567890"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="username@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrationp;
