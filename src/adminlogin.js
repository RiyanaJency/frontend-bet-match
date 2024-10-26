import React, { useState } from "react";
import axios from "axios";
import "./adminlogin.css";
const AdminLogin = () => {
  // State for form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for feedback messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous messages
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Make POST request to the FastAPI admin login endpoint
      const response = await axios.post("http://localhost:8000/adminlogin/", {
        email,
        password,
      });

      // Show success message if login is successful
      setSuccessMessage(response.data.message);
      alert("Login successful!"); // Add alert here

      // You can redirect the user or store the admin data in local storage
      console.log("Admin ID:", response.data.admin.id);
      console.log("Admin Email:", response.data.admin.email);
    } catch (error) {
      // Handle errors, such as invalid credentials
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("Invalid email or password.");
      }

      alert("Login failed."); // Add alert here
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default AdminLogin;
