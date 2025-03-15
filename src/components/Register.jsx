import React, { useState } from "react";
import api from "../config/axiosInstance";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

      toast.success("Registration successful!");
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      setError("");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
      setError("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #4188ce, #2e79ce)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          background: "rgba(82, 166, 245, 0.9)",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 8px 24px rgba(90, 150, 211, 0.884)",
          width: { xs: "90%", sm: "400px" },
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(59, 76, 235, 0.849)",
          textAlign: "center",
        }}
      >
        <img
          src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
          alt="Water Metro"
          style={{ display: "block", margin: "0 auto 20px", height: "50px" }}
        />
        <Typography variant="h5" sx={{ color: "#ebf2f7", mb: 1 }}>
          Register
        </Typography>

        {error && (
          <Typography sx={{ color: "#d9534f", fontSize: "14px", mb: 1 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          />

          <TextField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
            sx={{ mb: 3, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#40a9da",
              color: "rgb(224, 224, 224)",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
              "&:hover": { backgroundColor: "#0c7fd1" },
            }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
