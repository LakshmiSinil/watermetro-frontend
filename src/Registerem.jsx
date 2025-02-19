import  { useState } from 'react';
import './registerem.css'

const Registrationem = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    designation: '',
    gender: '',
    dob: '',
    address: ''
  });

  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim inputs before validation
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const employeeId = formData.employeeId.trim();
    const designation = formData.designation.trim();
    const dob = formData.dob.trim();
    const address = formData.address.trim();

    // Basic validation
    if (!employeeId || !formData.name || !phone || !email || !password || !designation || !formData.gender || !dob || !address) {
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

    setError("");
    alert("Registration Successful!");
    console.log("Registered User:", formData);

    // Reset form after successful registration
    setFormData({
      employeeId: '',
      name: '',
      phone: '',
      email: '',
      password: '',
      designation: '',
      gender: '',
      dob: '',
      address: ''
    });
  };

  return (
    <div className="rbackground">
      <div className="glass-container">
        <img src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png" alt="Water Metro" className="logo" />
        <h2 className="title">Register</h2>
        
        {error && <p className="error-message">{error}</p>} {/* Show error if any */}
        
        <form onSubmit={handleSubmit}>
          <label>Employee ID</label>
          <input type="text" name="employeeId" placeholder="Enter Employee ID" value={formData.employeeId} onChange={handleChange} required />

          <label>Name</label>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="1234567890" value={formData.phone} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="username@gmail.com" value={formData.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          <label>Designation</label>
          <input type="text" name="designation" placeholder="Your Designation" value={formData.designation} onChange={handleChange} required />

          <label>Gender</label>
          <div className="gender-options"><label>
              <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} required />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} required />
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleChange} required />
              Other
            </label>
          </div>

          <label>Date of Birth</label>
<input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <label>Address</label>
          <textarea name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} required></textarea>

          <button type="submit" className="login-btn">Register</button>
        </form>
      </div>
    </div>
  );
};



export default Registrationem;
