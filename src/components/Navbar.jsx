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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
            <a href="/Register" className="nav-button">Register</a>
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
                {/* user endenki user nta perr kanikkanam, login button onnnum venda */}
                <a href="/Login" className="nav-button" onClick={() => setMenuOpen(false)}>
                  Login
                </a>
                <a href="/Register" className="nav-button" onClick={() => setMenuOpen(false)}>
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
