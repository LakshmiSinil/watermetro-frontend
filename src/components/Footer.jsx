import React from "react";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section */}
        <div style={styles.section}>
          <img
            src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
            alt="Water Metro"
            style={styles.logo}
          />
          <p>4th Floor</p>
          <p>JLN Metro Station</p>
          <p>Kaloor, Cochin - 682017</p>
          <div style={styles.socialIcons}>
            <FaFacebook style={styles.icon} />
            <FaInstagram style={styles.icon} />
            <FaEnvelope style={styles.icon} />
          </div>
        </div>

        {/* Middle Section */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.list}>
            {["Home", "About Us", "Terminals", "Know Your Journey"].map((item) => (
              <li key={item} style={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Get in Touch</h3>
          <p>📞 +91 7511165656</p>
          <p>✉ customercare@watermetro.co.in</p>
          <div style={styles.subscribeBox}>
            <input type="email" placeholder="email@example.com" style={styles.input} />
            <button style={styles.button}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottom}>
        <p>© 2025 Kochi Water Metro</p>
      </div>
    </footer>
  );
};

// Inline styles
const styles = {
  footer: {
    background: "linear-gradient(to right, #007bff, #00c8ff)",
    color: "white",
    padding: "20px 0",
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "20px",
  },
  section: {
    flex: 1,
    minWidth: "250px",
    margin: "10px",
  },
  logo: {
    width: "100px",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    margin: "5px 0",
    cursor: "pointer",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    justifyContent: "center",
  },
  icon: {
    fontSize: "24px",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  subscribeBox: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    padding: "8px",
    flex: 1,
    border: "none",
    borderRadius: "5px 0 0 5px",
  },
  button: {
    background: "#0056b3",
    color: "white",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    borderRadius: "0 5px 5px 0",
  },
  bottom: {
    borderTop: "1px solid white",
    marginTop: "20px",
    paddingTop: "10px",
    fontSize: "14px",
  },
};

export default Footer;
