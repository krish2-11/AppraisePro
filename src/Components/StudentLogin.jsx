import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom";
import '../Design/Login.css'

const StudentLogin = () => {

  const [formData , setFormData] = useState({
    email:''
  })
  const [errorMessage , setErrorMessage] = useState('')
  const [error , setError] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name , value} = e.target
    setFormData({...formData , [name] : value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('email' , formData.email)
    axios.get(`http://localhost:8080/student/login/${formData.email}`)
        .then((response) => {
          const message = response.data
          if(message === "Authenticated"){
            navigate("/student/home")
          }
          else{
            toast.error("Student Not Registered!!")
          }
        })
        .catch((error) => {
          setError(true)
          setErrorMessage('Connection with server failed! Contact Admin!')
        });
  }

  return (
    <>
        <Header />
        <div className="form-container">
    
    <form className='form-card' onSubmit={handleSubmit}>
    <h1 className="form-title">Student Sign In</h1>
      <input 
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your Email"
        className='email-input'
        required
      />
      <div>
      { error && <p style={{color:'red' , padding:'5px' ,marginBottom:'5px'}}>{errorMessage}</p>}
      </div>
    <button type="submit" className='submit-button'>Submit</button>
    <ToastContainer />
    </form>
  </div>
        <Footer />
    </>
  )
}

export default StudentLogin