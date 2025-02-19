import React from 'react';
import './login.css';


const Login = () => {
  return (
    <div className="background">
      <div className="glass-container">
        <img src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png" alt="Water Metro" className="logo" />
        <h2 className="title">Login</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="username@gmail.com" required />
          <label>Password</label>
          <input type="password" placeholder="Password" required />
          <a href="#" className="forgot-password">Forgot Password?</a>
          <button type="submit" className="login-btn">Sign in</button>
        </form>
        <p className="register-text">
          Don't have an account yet? <a href="#">Register for free</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
