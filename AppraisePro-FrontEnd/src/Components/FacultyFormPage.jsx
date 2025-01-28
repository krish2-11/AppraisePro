import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import '../Design/FacultyPage.css'
import axios from 'axios'

const FacultyFormPage = () => {

    const getEmail = sessionStorage.getItem('email')
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
    credentials: null
  });

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
    try {
      const response = await axios.post("http://localhost:8080/api/faculty/saveDetails", formData);
      console.log("Data submitted successfully:", response.data);
      alert("Faculty data saved successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to save faculty data!");
    }
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
                    <input type="text" className="form-input" name="shortname" onChange={handleChange} />
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">First Name</label>
                    <input type="text" className="form-input" name="firstname"  onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Last Name</label>
                    <input type="text" className="form-input" name="lastname" onChange={handleChange} />
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Family Information</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Father's Name</label>
                    <input type="text" className="form-input" name="fathersname" onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Mother's Name</label>
                    <input type="text" className="form-input" name="mothersname" onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label">Spouse Name</label>
                    <input type="text" className="form-input" name="spousename" onChange={handleChange}/>
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Personal Details</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Religion</label>
                    <select className="faculty-form-select" name="religion" onChange={handleChange}>
                        <option value="">Select Religion</option>
                        <option value="hindu">Hindu</option>
                        <option value="muslim">Muslim</option>
                        <option value="christian">Christian</option>
                        <option value="sikh">Sikh</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Category</label>
                    <select className="faculty-form-select" name="category" onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="general">General</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Gender</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input type="radio" name="gender" value="male" onChange={handleChange}/>
                            Male
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="gender" value="female"  onChange={handleChange} />
                            Female
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="gender" value="other" onChange={handleChange}/>
                            Other
                        </label>
                    </div>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Birth Date</label>
                    <input type="date" className="date-input" name="birthday" onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label">Blood Group</label>
                    <select className="faculty-form-select" name="bloodgroup" onChange={handleChange}>
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
                    <label className="faculty-form-label">Marital Status</label>
                    <select className="faculty-form-select" name="maritalStatus" onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Location Information</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Country</label>
                    <select className="faculty-form-select" name="country" onChange={handleChange}>
                        <option value="">Select Country</option>
                        <option value="india">India</option>
                    </select>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label">Caste</label>
                    <input type="text" className="form-input" name="caste" onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label">Home Town</label>
                    <input type="text" className="form-input" name="hometown" onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label">Birth Place</label>
                    <input type="text" className="form-input" name="birthplace" onChange={handleChange}/>
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Contact Information</h2>
            <div className="faculty-form-grid">
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Phone</label>
                    <input type="text" className="form-input" name="phone" onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label">Secondary phone</label>
                    <input type="text" className="form-input" name="secondaryphone" onChange={handleChange}/>
                </div>
                <div className="faculty-form-group">
                    <label className="faculty-form-label required">Personal Email</label>
                    <input type="text" className="form-input" name="personalemail" onChange={handleChange}/>
                </div>
            </div>
        </div>

        <div className="faculty-form-section">
            <h2 className="section-title">Additional Information</h2>
            <div className="faculty-form-group">
                <label className="checkbox-group">
                    <input type="checkbox" className="checkbox-input" name="isDisable" onChange={handleChange}/>
                    <span className="faculty-form-label">Person with Disability</span>
                </label>
            </div>
        </div>

        <button className="submit-btn">Submit</button>
    </form>
</div>
    <Footer />
    </>
  )
}

export default FacultyFormPage