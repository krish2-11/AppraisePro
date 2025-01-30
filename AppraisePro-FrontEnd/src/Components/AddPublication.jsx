import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Design/AddPublication.css'
import Header from './Header';
import Footer from './Footer';

const AddPublication = () => {
    const [publicationData , setpublicationData] = useState({
      status:'Pending',
      publicationTitle:'',
      publicationDescription:'',
    })
    const getEmail = sessionStorage.getItem('email')
    const [file, setFile] = useState(null);
    
    const handleChange = (e) => {
      const {name , value} = e.target
      setpublicationData({...publicationData , [name] : value})
    }
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    }

    const handleSubmit =async (e) => {
      e.preventDefault()

      if (!file) {
        alert("Please select a file first.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post('http://localhost:8080/publication/addfaculty', {
          email:getEmail,
          password:""
        })
        .then(async (response) => {
          await axios.post('http://localhost:8080/publication/add', publicationData)
          .then(async (response) => {
            try {
              const res = await axios.post("http://localhost:8080/publication/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              alert("File uploaded successfully: " + res.data);
            } catch (error) {
              alert("Upload failed!");
            }
          })
          .catch((error) => {
            toast.error('Publication Fail to add!!');
          });
        })
        .catch((e) => {
            console.log(e)
        })
      
    } catch (e) {
      console.error("Error fetching data:", e);
    }

      
    }

return (
  <>
  <Header />
  <div className="form-container">
  
  <form className='form-card' onSubmit={handleSubmit}>
  <h1 className="form-title">Add Publication</h1>
    <input 
      type="text"
      name="publicationTitle"
      onChange={handleChange}
      placeholder="Enter your Title"
      className='title-input'
      required
    />
    <input 
      type="text"
      name="publicationDescription"
      onChange={handleChange}
      placeholder="Enter your Description"
      className='description-input'
      required
    />
    <input 
      type="file"
      accept='application/pdf'
      name="publicationTitle"
      onChange={handleFileChange}
      className='pdf-input'
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

export default AddPublication