import React, { useState } from "react";
import api from "../config/axiosInstance";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ email: "", password: "" });
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
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setError("");
      if (response?.data?.user?.role === "admin") {
        navigate("/admin");
        return;
      }
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
      setError("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "89vh",
        background: "linear-gradient(to bottom, #009faa, #0892ee)",
        fontFamily: "Arial, sans-serif",
        padding: "1px",
      }}
    >
      <Box
        sx={{
          background: "rgba(52, 203, 223, 0.95)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 24px rgba(255, 252, 252, 0.1)",
          width: { xs: "90%", sm: "400px" },
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          textAlign: "center",
        }}
      >
        <img
          src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
          alt="Water Metro"
          style={{ display: "block", margin: "0 auto 16px", height: "50px" }}
        />
        <Typography variant="h5" sx={{ color: "#eff8ff", mb: 2 }}>
          Login
        </Typography>

        {error && (
          <Typography sx={{ color: "#d9534f", fontSize: "14px", mb: 1 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
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
              backgroundColor: "#0077cc",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
              "&:hover": { backgroundColor: "#005fa3" },
            }}
          >
            Login
          </Button>
        </form>

        <Typography sx={{ mt: 2, fontSize: "14px", color: "white" }}>
          Don't have an account yet?
          <Button
            href="/register"
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Register for free
          </Button>
        </Typography>
       
      </Box>
    </Box>
  );
};

export default Login;
