import React from 'react';
import '../Design/Footer.css'; 

const Footer = () => {

  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We are dedicated to providing the best faculty management system to ensure smooth administration and excellent user experience.
          </p>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@facultymanagement.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Faculty Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
