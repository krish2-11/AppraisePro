import React from 'react'
import { useState , useEffect} from 'react';
import '../Design/FacultyDashBoard.css'
import axios from 'axios'
import '../Design/FacultyHomepage.css'
const FacultyDashBoard = () => {
    const getEmail =sessionStorage.getItem('email')
    const [faculty, setFaculty] = useState({});

    useEffect(() => {
      const fetchFaculty = async () => {
        try {
            axios.post('http://localhost:8080/login/faculty/detail', {
              email:getEmail,
              password:""
            })
            .then((response) => {
                axios.get("http://localhost:8080/login/faculty/getfaculty").then((res) =>{
                  setFaculty(res.data)
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

    const imageSrc = faculty.photo 
    ? `data:image/jpeg;base64,${faculty.photo}` 
    : "/api/placeholder/800/400";

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
    </div>
  </div></>
  )
}

export default FacultyDashBoard