import React, { useState } from "react";
import "./navbar.css"; // You can keep your existing styles if needed
import { useUser } from "../context/useUser.hook.jsx";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About Us" },
  { href: "/consultancy-services", label: "Consultancy Services" },
  { href: "/terminals", label: "Terminals" },
  { href: "/know-your-journey", label: "Know Your Journey" },
];

function Navbar() {
  const { user } = useUser();
  console.log("🚀 ~ Navbar ~ user:", user);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* TODO: make button use navigate remove href */}
          <a href="/" className="navbar-logo">
            <img
              src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
              alt="Water Metro Logo"
              className="logo-image"
            />
          </a>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}

            {user ? (
              <>
                {user?.name}
                <button className="nav-button" onClick={()=>navigate("/login")}>Logout</button>
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={() => navigate("/login")}>
                  Login
                </Button>
                {/* TODO: change all href to navigate , use material UI buttons */}
                <a href="/register" className="nav-button">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
