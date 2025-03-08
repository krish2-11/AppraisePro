import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom";
import '../Design/ChangePassword.css'

const ChangePassword = () => {
  const getEmail = sessionStorage.getItem('email')
  const [formData , setFormData] = useState({
    password:'',
    confirmPassword:''
  })
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [sendData , setSendData] = useState({
    email:getEmail,
    password:''
  })
  const [errorMessage , setErrorMessage] = useState('')
  const [error , setError] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name , value} = e.target
    setFormData({...formData , [name] : value})
    setSendData({
      ...sendData , password : formData.password
    })
    // console.log(formData.password)
    // console.log(formData.confirmPassword)
    // if(formData.password === formData.confirmPassword){
    //   setError(false)
    //   setButtonDisabled(false)
    // }
    // else{
    //   setButtonDisabled(true)
    //   setErrorMessage('Password and Confirm Password do not match!!')
    //   setError(true)
    // }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8080/login/faculty/changepassword', sendData)
        .then((response) => {
          setError(false)
          navigate('/faculty')
        })
        .catch((error) => {
          setError(true)
          setErrorMessage('Connection with server failed! Contact Admin!')
        });
  }

  return (
    <div>
        <Header />
        <div className="form-container">
    
    <form className='form-card' onSubmit={handleSubmit}>
    <h1 className="form-title">Change Password for first time</h1>
      <input 
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your Password"
        className='password-input'
        required
      />
      <input 
        type="text"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your Password"
        className='confirm-password-input'
        required
      />
      <div>
      { error && <p style={{color:'red' , padding:'5px' ,marginBottom:'5px'}}>{errorMessage}</p>}
      </div>
    <button type="submit" className='submit-button' disabled={isButtonDisabled}>Submit</button>
    </form>
  </div>
        <Footer />
    </div>
  )
}

export default ChangePassword