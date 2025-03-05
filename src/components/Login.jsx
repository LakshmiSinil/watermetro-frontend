import React, { useState } from "react";
import "./login.css";
import api from "../config/axiosInstance";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log("🚀 ~ Login ~ formData:", formData);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!formData.email || !password) {
      setError("All fields are required!");
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

    const response = await api.post("/users/login", formData);
    localStorage.setItem("token", response.data.token);
    console.log("🚀 ~ handleSubmit ~ response:", response);
    setError("");

    // Optional: reset the form
    // setFormData({ email: "", password: "" });
  };

  return (
    <div className="login-page"> {/* Unique wrapper for scoping */}
      <div className="glass-container">
        <img
          src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
          alt="Water Metro"
          className="logo"
        />
        <h2 className="title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className="register-text">
          Don't have an account yet? <a href="/Register">Register for free</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
