import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "./navbar.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About Us" },
  { href: "/consultancy-services", label: "Consultancy Services" },
  { href: "/terminals", label: "Terminals" },
  { href: "/know-your-journey", label: "Know Your Journey" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [registerDropdown, setRegisterDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".register-container")) {
        setRegisterDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-content">
          <a href="/" className="navbar-logo">
            <img
              src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
              alt="Water Metro Logo"
              className="logo-image"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="navbar-links desktop-only">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <a href="/Login" className="nav-button">Login</a>

            <div className="register-container">
              <button
                className="nav-button"
                onClick={() => setRegisterDropdown((prev) => !prev)}
              >
                Register
              </button>
              {registerDropdown && (
                <div className="register-dropdown">
                  <a href="/register/employee" className="dropdown-item">
                    Employee
                  </a>
                  <a href="/register/public" className="dropdown-item">
                    Public
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="mobile-only">
            <button
              className="nav-toggle-button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <FaBars className={`menu-icon ${isScrolled ? "text-scrolled" : "text-default"}`} />
            </button>

            {menuOpen && (
              <div className="nav-links-mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a href="/Login" className="nav-button" onClick={() => setMenuOpen(false)}>
                  Login
                </a>

                <div className="register-container">
                  <button
                    className="nav-button"
                    onClick={() => setRegisterDropdown((prev) => !prev)}
                  >
                    Register
                  </button>
                  {registerDropdown && (
                    <div className="register-dropdown">
                      
                    <a href="/registartion_public">Public</a>
                    <a href="/registerem">Employee</a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
