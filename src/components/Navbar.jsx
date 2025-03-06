import React, { useState } from 'react';
import './navbar.css'; // You can keep your existing styles if needed

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/consultancy-services", label: "Consultancy Services" },
    { href: "/terminals", label: "Terminals" },
    { href: "/know-your-journey", label: "Know Your Journey" },
];

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state

    const handleLogout = () => {
        setIsAuthenticated(false);
        alert('You have been logged out');
        // Clear localStorage/session if you're using that
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <a href="/" className="navbar-logo">
                        <img
                            src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
                            alt="Water Metro Logo"
                            className="logo-image"
                        />
                    </a>

                    <div className="navbar-links">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="nav-link">
                                {link.label}
                            </a>
                        ))}

                        {/* Ternary for auth links */}
                        {isAuthenticated ? (
                            <button className="nav-button" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <a href="/login" className="nav-button">Login</a>
                                <a href="/register" className="nav-button">Register</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

