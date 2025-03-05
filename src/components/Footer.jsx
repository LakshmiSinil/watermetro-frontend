import React from "react";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import "./footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <img src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png" alt="Water Metro" className="footer-logo" />
          <p>4th Floor</p>
          <p>JLN Metro Station</p>
          <p>Kaloor, Cochin - 682017</p>
          <div className="social-icons">
            <FaFacebook className="icon" />
            <FaInstagram className="icon" />
            <FaEnvelope className="icon" />
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Terminals</li>
            <li>Know Your Journey</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-section">
          <h3>Get in Touch</h3>
          <p>📞 +91 7511165656</p>
          <p>✉ customercare@watermetro.co.in</p>
          <div className="subscribe-box">
            <input type="email" placeholder="email@example.com" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© 2025 Kochi Water Metro  </p>
      </div>
    </footer>
  );
};

export default Footer;
