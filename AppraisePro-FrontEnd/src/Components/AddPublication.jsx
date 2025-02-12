import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Design/AddPublication.css'
import Header from './Header';
import Footer from './Footer';
import researchTags from '../data/researchtags'

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
  
      const formData = new FormData();
      formData.append("file", file);

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
              toast.success("File Upload successfully!")
            } catch (error) {
              toast.error("Upload failed!");
            }
          })
          .catch((error) => {
            toast.error('Publication Fail to add!!');
          });
        })
        .catch((e) => {
            toast.error('Server connection failed!!')
        })
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
   <label>Tag</label>
      <select className="participation-form-select" name="type" required onChange={handleChange} multiple>
      <option value="">Select tag type</option>
        {
          researchTags.map((rt) => (<option value={rt}>{rt}</option>))
        }
      </select>                 
  <button type="submit" className='submit-button'>Submit</button>
  <ToastContainer />
</form>
</div>
<Footer />
</>
)
}

export default AddPublication