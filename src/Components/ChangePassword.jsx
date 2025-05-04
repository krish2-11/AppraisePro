import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom";
import { Lock, Check, X } from 'lucide-react';

const ChangePassword = () => {
  const getEmail = localStorage.getItem('email')
  const [formData , setFormData] = useState({
    password:'',
    confirmPassword:''
  })
  const [isButtonDisabled, setButtonDisabled] = useState(true);
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
  }

  useEffect(() => {
    setSendData((prev) => ({ ...prev, password: formData.password }));

    if (formData.password === formData.confirmPassword) {
        setError(false);
          setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
        setErrorMessage("Password and Confirm Password do not match!!");
        setError(true);
    }
}, [formData]);

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-200 transform transition-all duration-300 hover:shadow-3xl"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <Lock className="w-8 h-8 text-blue-600" />
              Change Password
            </h1>
            <p className="text-gray-500 mt-2">Set up a strong password for first-time login</p>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your Password"
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4">
              <p className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errorMessage}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              disabled={isButtonDisabled}
              className={`w-full flex items-center justify-center font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
                isButtonDisabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <Lock className="mr-2 w-5 h-5" />
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
        <Footer />
    </div>
  )
}

export default ChangePassword