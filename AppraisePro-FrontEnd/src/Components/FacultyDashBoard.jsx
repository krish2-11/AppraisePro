import React from 'react'
import { useState , useEffect} from 'react';
import '../Design/FacultyDashBoard.css'
import axios from 'axios'

const FacultyDashBoard = () => {
    const getEmail =sessionStorage.getItem('email')
    const [faculty, setFaculty] = useState({});

    useEffect(() => {
      const fetchFaculty = async () => {
        try {
            console.log(`==${getEmail}==`)
            axios.post('http://localhost:8080/api/faculty/detail', getEmail)
            .then((response) => {
                axios.get("http://localhost:8080/api/faculty/getfaculty").then((res) =>{
                    console.log(res.data)
                    setFaculty(res.data);
                })
            })
            .catch((e) => {
                console.log(e)
            })
          
        } catch (e) {
          console.error("Error fetching data:", e);
        }
      };
      fetchFaculty();
    }, []);
  return (
    <div className="dashboard-container">
    <div className="profile-section">
      <div className="profile-photo">
        <img src="profile-photo.jpg" alt="Faculty Photo" />
      </div>
      <div className="profile-details">
        <h1>John Doe</h1>
        <p className="shortname">Prof. J. Doe</p>
        <p className="email">johndoe@example.com</p>
      </div>
    </div>

    <div className="info-section">
      <h2>Basic Information</h2>
      <div className="info">
        <p><strong>First Name:</strong> John</p>
        <p><strong>Last Name:</strong> Doe</p>
        <p><strong>Father's Name:</strong> Richard Doe</p>
        <p><strong>Mother's Name:</strong> Mary Doe</p>
        <p><strong>Spouse Name:</strong> Jane Doe</p>
      </div>

      <h2>Personal Details</h2>
      <div className="info">
        <p><strong>Religion:</strong> Hindu</p>
        <p><strong>Category:</strong> General</p>
        <p><strong>Gender:</strong> Male</p>
        <p><strong>Date of Birth:</strong> 1985-10-15</p>
        <p><strong>Blood Group:</strong> O+</p>
        <p><strong>Marital Status:</strong> Married</p>
      </div>

      <h2>Location Information</h2>
      <div className="info">
        <p><strong>Country:</strong> India</p>
        <p><strong>Caste:</strong> General</p>
        <p><strong>Hometown:</strong> Mumbai</p>
        <p><strong>Birthplace:</strong> Mumbai</p>
      </div>

      <h2>Contact Information</h2>
      <div className="info">
        <p><strong>Phone:</strong> 123-456-7890</p>
        <p><strong>Secondary Phone:</strong> 098-765-4321</p>
        <p><strong>Personal Email:</strong> johndoe@gmail.com</p>
      </div>

      <h2>Additional Information</h2>
      <div className="info">
        <p><strong>Person with Disability:</strong> No</p>
      </div>
    </div>
  </div>
  )
}

export default FacultyDashBoard