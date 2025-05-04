import React from 'react'
import axios from 'axios'
import { useState , useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {

    const email = localStorage.getItem('adminEmail')
    const [formData , setFormData] = useState({
      email:'',
      facultyid:'',
      department:'',
      designation:''
    })
    const [designation , setDesignation] = useState([])
    const [department , setDepartment] = useState('')
    const navigate = useNavigate();

      useEffect(() => {
        const fetchDesignation = () => {
          axios.get('http://localhost:8080/designation/getAll')
            .then((response) => {
              setDesignation(response.data)
            })
            .catch((error) => {
              console.log(error)
              toast.error('Server connection Failed!!');
            });
        }
        const fetchDepartment = () => {
          axios.get(`http://localhost:8080/admin/department/${email}`)
            .then((response) => {
              setDepartment(response.data)
              setFormData((prev) => ({
                ...prev,
                department:response.data
              }))
            })
            .catch((error) => {
              console.log(error)
              toast.error('Server connection Failed!!');
            });
        }
        fetchDepartment()
        fetchDesignation()
      } , [])

      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        axios.post('http://localhost:8080/faculty/add', formData)
            .then((response) => {
              toast.success('Faculty successfully added!');
              navigate('/admin')
            })
            .catch((error) => {
              toast.error('Insertion Failed!!');
            });
      }
      const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
    };
    

  return (
    <>
    <Header />
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <form className="bg-white rounded-lg shadow-md p-6 w-full max-w-md" onSubmit={handleSubmit}>
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Faculty</h1>
    
    <div className="space-y-4">
      <input
        type="text"
        name="email"
        onChange={handleChange}
        placeholder="Enter Email"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
      
      <input
        type="text"
        name="facultyid"
        onChange={handleChange}
        placeholder="Enter Id"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
      
      <input
        type="text"
        name="department"
        readOnly
        value={department}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      <select
        name="designation"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
        required
      >
        <option value="">Select a Designation</option>
        {designation.length !== 0 &&
          designation.map((des) => (
            <option value={des.designation} key={des.id}>
              {des.designation}
            </option>
          ))}
      </select>
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Submit
      </button>
    </div>
    
    <ToastContainer />
  </form>
</div>
<Footer />
</>
  )
}

export default AddFaculty