import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import '../Design/FacultyPage.css'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const FacultyFormPage = () => {

    const getEmail = localStorage.getItem('email')
  const [formData, setFormData] = useState({
    email: getEmail,
    shortname: "",
    firstname: "",
    lastname: "",
    fathersname: "",
    mothersname: "",
    spousename: "",
    religion: "",
    category: "",
    gender: "",
    birthday: "",
    bloodgroup: "",
    maritalStatus: "",
    country: "",
    caste: "",
    hometown: "",
    birthplace: "",
    phone: "",
    secodaryphone: "",
    personalemail: "",
    isDisable: false,
    first: false,
    googleScholarUrl:""
  });
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const image = {
        photo : photo
    }
      await axios.patch("http://localhost:8080/faculty/saveDetails", formData)
      .then(async (res) => {
        await axios.post("http://localhost:8080/faculty/savePhoto" , image , {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((res) => {
                toast.success("Data submitted successfully!!");
                navigate("/faculty/home")
          }).catch((error) => {
                toast.error("Photo saving failed!!")
          })
      }).catch( (error) => {
      toast.error("Failed to save faculty data!");
    })
  };

  return (
    <>
    <Header />
    <div className="faculty-form-container">
    <form onSubmit={handleSubmit}>
        <div className="faculty-form-section">
            <h2 className="section-title">Basic Information</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Short Name</label>
                    <input type="text" className="form-input" name="shortname" required onChange={handleChange} />
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">First Name</label>
                    <input type="text" className="form-input" name="firstname" required onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Last Name</label>
                    <input type="text" className="form-input" name="lastname" required onChange={handleChange} />
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Profile Photo</label>
                    <input type="file" accept='image/*' className="form-input" name="photo" required onChange={handlePhotoChange} />
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Personal Details</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Religion</label>
                    <select className="faculty-form-select" name="religion" required onChange={handleChange}>
                        <option value="">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Category</label>
                    <select className="faculty-form-select" name="category" required onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Gender</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input type="radio" name="gender" value="Male" onChange={handleChange}/>
                            Male
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="gender" value="Female"  onChange={handleChange} />
                            Female
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="gender" value="Other" onChange={handleChange}/>
                            Other
                        </label>
                    </div>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Birth Date</label>
                    <input type="date" className="date-input" name="birthday" required onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required" >Blood Group</label>
                    <select className="faculty-form-select" name="bloodgroup" onChange={handleChange} required>
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required" >Marital Status</label>
                    <select className="faculty-form-select" name="maritalStatus" onChange={handleChange} required>
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Family Information</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Father's Name</label>
                    <input type="text" className="form-input" name="fathersname" required onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Mother's Name</label>
                    <input type="text" className="form-input" name="mothersname" required onChange={handleChange}/>
                </div>
                {
                    formData.maritalStatus === 'Married' && (
                        <div className="faculty-form-group">
                    <label className="faculty-form-label" required>Spouse Name</label>
                    <input type="text" className="form-input" name="spousename" required onChange={handleChange}/>
                </div>
                    )
                }
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Location Information</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Country</label>
                    <select className="faculty-form-select" name="country" required onChange={handleChange}>
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="Outside India">Outside India</option>
                    </select>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Caste</label>
                    <input type="text" className="form-input" name="caste"required onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Home Town</label>
                    <input type="text" className="form-input" name="hometown"required onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Birth Place</label>
                    <input type="text" className="form-input" name="birthplace"required onChange={handleChange}/>
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Contact Information</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Phone</label>
                    <input type="text" className="form-input" name="phone" required onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Secondary phone</label>
                    <input type="text" className="form-input" name="secondaryphone" required onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Personal Email</label>
                    <input type="text" className="form-input" name="personalemail" required onChange={handleChange}/>
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Additional Information</h2>
            <div className="faculty-form-group">
                <label className="checkbox-group" >
                    <input type="checkbox" className="checkbox-input" name="isDisable" onChange={handleChange}/>
                    <span className="faculty-form-label required">Person with Disability</span>
                </label>
            </div>
        </div>
        <div className="faculty-form-section">
            <h2 className="section-title">Google Scholar Information</h2>
            <div className="faculty-form-group">
            <div className="faculty-form-group">
                    <label className="faculty-form-label required">Google Scholar Url</label>
                    <input type="text" className="form-input" name="googleScholarUrl" required onChange={handleChange}/>
                </div>
            </div>
        </div>
        <button className="submit-btn">Submit</button>
        <ToastContainer />
    </form>
</div>
    <Footer />
    </>
  )
}

export default FacultyFormPage