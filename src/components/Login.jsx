import React, { useState } from "react";
import "./login.css";
import api from "../config/axiosInstance";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const queryClient = useQueryClient()

    const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
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

    try {
      const response = await api.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);

      toast.success("Login successful!");
      await queryClient.invalidateQueries({queryKey:["user"]})
      setError(""); // Clear any previous error
      navigate("/"); // Redirect to home page
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
      setError("");
    }
  };



  return (
    <div className="login-page">
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
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
          />

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>

        <p className="register-text">
          Don't have an account yet?
          <Button href="/register">Register for free</Button>
          <Button href="/RoutePage">Routes</Button>
          <Button href="/BoatPage">Boats</Button>
          <Button href="/ServicePage">Services</Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
