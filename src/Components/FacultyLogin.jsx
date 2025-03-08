import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../Design/Login.css";

const FacultyLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("email", formData.email);

    try {
      // Step 1: Validate User Credentials
      await axios.post("http://localhost:8080/login/faculty", formData);

      // Step 2: Check Authentication Status
      const response = await axios.get("http://localhost:8080/login/faculty/valid");

      if (response.data === "Authenticated User") {
        setError(false);
        toast.success("Authentication Successful!");
        navigate("/faculty/home");
      } else if (response.data === "Authenticated User First") {
        setError(false);
        toast.success("First-time login detected! Please check your email for further instructions.");
        navigate("/faculty/first/changePassword");
      } else {
        setError(true);
        setErrorMessage(response.data);
      }
    } catch (error) {
      setError(true);
      setErrorMessage("Connection with server failed! Contact Admin!");
    }
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <form className="form-card" onSubmit={handleSubmit}>
          <h1 className="form-title">Faculty Sign In</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="email-input"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className="password-input"
            required
          />
          <div>
            {error && <p style={{ color: "red", padding: "5px", marginBottom: "5px" }}>{errorMessage}</p>}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FacultyLogin;
