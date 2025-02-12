import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Design/AddFaculty.css'
import Header from './Header';
import Footer from './Footer';

const AddFaculty = () => {

    const [email , setEmail] = useState('')
    
      const handleChange = (e) => {
        setEmail(e.target.value)
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        const data = {email}
    
        axios.post('http://localhost:8080/faculty/add', data)
            .then((response) => {
              toast.success('Faculty successfully added!');
            })
            .catch((error) => {
              toast.error('Insertion Failed!!');
            });
      }

  return (
    <>
    <Header />
    <div className="form-container">
    
    <form className='form-card' onSubmit={handleSubmit}>
    <h1 className="form-title">Add Faculty</h1>
      <input 
      
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your Email"
        className='email-input'
        required
      />
    <button type="submit" className='submit-button'>Submit</button>
    <ToastContainer />
</form>
</div>
<Footer />
</>
  )
}

export default AddFaculty