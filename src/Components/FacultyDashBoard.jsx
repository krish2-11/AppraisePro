import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For table formatting
import "../Design/FacultyDashBoard.css";
import "../Design/FacultyHomepage.css";
import logo from "../assets/uni.jpg";

const FacultyDashBoard = () => {
  const getEmail = sessionStorage.getItem("email");
  const [faculty, setFaculty] = useState({});

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        axios
          .post("http://localhost:8080/login/faculty/detail", {
            email: getEmail,
            password: "",
          })
          .then(() => {
            axios.get("http://localhost:8080/login/faculty/getfaculty").then((res) => {
              setFaculty(res.data);
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchFaculty();
  }, []);

  const imageSrc = faculty.photo
    ? `data:image/jpeg;base64,${faculty.photo}`
    : "/api/placeholder/800/400";

  // 🔹 Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add Logo (Replace with your actual logo URL)
    // const logoUrl = "https://unsplash.com/photos/a-room-filled-with-lots-of-books-on-shelves-3TOcMH5MY0Q"; // Replace with actual path
    doc.addImage(logo, "PNG", 10, 10, 40, 40); // Adjust position & size

    if (faculty.photo) {
    const imgData = `data:image/jpeg;base64,${faculty.photo}`; // Base64 encoded image
    doc.addImage(imgData, "JPEG", 150, 30, 40, 40); // Position (x, y) and size (width, height)
  }
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Faculty Profile Report", 80, 20);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Name: ${faculty.firstname} ${faculty.lastname}`, 10, 60);
    doc.text(`Short Name: ${faculty.shortname}`, 10, 70);
    doc.text(`Email: ${faculty.email}`, 10, 80);
    
    doc.setFont("helvetica", "bold"); // Set font to bold
doc.text("Basic Information", 10, 100);
doc.setFont("helvetica", "normal"); // Reset to normal if needed

    doc.setFontSize(10);
    doc.text(`Father's Name: ${faculty.fathersname}`, 10, 110);
    doc.text(`Mother's Name: ${faculty.mothersname}`, 10, 120);
    doc.text(`Spouse Name: ${faculty.spousename}`, 10, 130);


    doc.setFont("helvetica", "bold");
    doc.text("Personal Details", 10, 150);
    doc.setFont("helvetica", "normal");

    doc.text(`Religion: ${faculty.religion}`, 10, 160);
    doc.text(`Category: ${faculty.category}`, 10, 170);
    doc.text(`Gender: ${faculty.gender}`, 10, 180);
    doc.text(`Date of Birth: ${faculty.birthday}`, 10, 190);
    doc.text(`Blood Group: ${faculty.bloodgroup}`, 10, 200);
    doc.text(`Marital Status: ${faculty.maritalStatus}`, 10, 210);

    doc.setFont("helvetica", "bold");
    doc.text("Contact Information", 10, 230);
    doc.setFont("helvetica", "normal");


    doc.text(`Phone: ${faculty.phone}`, 10, 240);
    doc.text(`Secondary Phone: ${faculty.secondaryphone}`, 10, 250);
    doc.text(`Personal Email: ${faculty.personalemail}`, 10, 260);

    doc.save("Faculty_Profile.pdf");
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="profile-section">
          <div className="profile-photo">
            <img src={imageSrc} alt="Faculty Photo" />
          </div>
          <div className="profile-details">
            <h1>{faculty.firstname} {faculty.lastname}</h1>
            <p className="shortname">{faculty.shortname}</p>
            <p className="email">{faculty.email}</p>
          </div>
        </div>

        <div className="info-section">
          <h2>Basic Information</h2>
          <div className="profile-info">
            <p><strong>First Name:</strong> {faculty.firstname}</p>
            <p><strong>Last Name:</strong> {faculty.lastname}</p>
            <p><strong>Father's Name:</strong>{faculty.fathersname}</p>
            <p><strong>Mother's Name:</strong>{faculty.mothersname}</p>
            <p><strong>Spouse Name:</strong>{faculty.spousename}</p>
          </div>

          <h2>Personal Details</h2>
          <div className="profile-info">
            <p><strong>Religion:</strong> {faculty.religion}</p>
            <p><strong>Category:</strong> {faculty.category}</p>
            <p><strong>Gender:</strong> {faculty.gender}</p>
            <p><strong>Date of Birth:</strong>{faculty.birthday}</p>
            <p><strong>Blood Group:</strong>{faculty.bloodgroup}</p>
            <p><strong>Marital Status:</strong>{faculty.maritalStatus}</p>
          </div>

          <h2>Location Information</h2>
          <div className="profile-info">
            <p><strong>Country:</strong> {faculty.country}</p>
            <p><strong>Caste:</strong> {faculty.caste}</p>
            <p><strong>Hometown:</strong> {faculty.hometown}</p>
            <p><strong>Birthplace:</strong> {faculty.birthplace}</p>
          </div>

          <h2>Contact Information</h2>
          <div className="profile-info">
            <p><strong>Phone:</strong>{faculty.phone}</p>
            <p><strong>Secondary Phone:</strong>{faculty.secondaryphone}</p>
            <p><strong>Personal Email:</strong>{faculty.personalemail}</p>
          </div>

          <h2>Additional Information</h2>
          <div className="profile-info">
            <p><strong>Person with Disability:</strong>{faculty.disable ? "Yes" : "No"}</p>
          </div>

          {/* 📌 Download PDF Button */}
          <button onClick={generatePDF} className="download-button">Download Data as PDF</button>
        </div>
      </div>
    </>
  );
};

export default FacultyDashBoard;
