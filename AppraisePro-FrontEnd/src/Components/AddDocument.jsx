import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Design/AddDocument.css'
import Header from './Header';
import Footer from './Footer';

const AddDocument = () => {

    const getEmail = sessionStorage.getItem('email')
    const credential = {
        email :  getEmail,
        password : ''
    }
    const [eventData,setEventData] = useState({
        eventName: '',
     eventDescription: '',
     eventType: '',
     eventRole: '',
     eventDate: '',
     eventMode: '',
     eventLocation :'',
     eventTime:''
    })
    const [proof, setProof] = useState(null);
    const [slides, setSlides] = useState(null);

    const handleProofChange = (e) => {
        setProof(e.target.files[0]);
    }
    const handleSlidesChange = (e) => {
        setSlides(e.target.files[0]);
    }
 const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setEventData({
      ...eventData,
      [name]: type === "checkbox" ? checked : value,
    });
 }
 const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
        proof : proof,
        slides : slides
    }
        await axios.post(`http://localhost:8080/event/addFaculty`,credential)
        .then(async (response) => {
            try {
                await axios.post("http://localhost:8080/event/add", eventData)
                .then(async (res) => {
                    try{
                    await axios.post("http://localhost:8080/event/upload", formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      })
                      toast.success("Files Upload successfully!")
                    }
                    catch(error){
                        toast.error("Upload failed!");
                    }
                })
            } catch (error) {
              toast.error("Event Fail to add!!");
            }
          })
          .catch((error) => {
            toast.error('Connection with server failed !! Contact Admin!!');
          });
        }
  return (
    <>
    <Header />
    <div className="participation-form-container">
    <form onSubmit={handleSubmit}>
        <div className="participation-form-section">
            <h2 className="section-title">Event Information</h2>
            <div className="participation-form-grid">
                <div className="participation-form-group">
                    <label className="participation-form-label required">Event Name</label>
                    <input type="text" className="form-input" name="eventName" required onChange={handleChange} />
                </div>
            </div>
            <div className='participation-form-grid'>
            <div className="participation-form-group">
                    <label className="participation-form-label required">Event Description</label>
                    <textarea  className='form-input-textarea' name='eventDescription' required onChange={handleChange} rows="4" cols="10" />
                </div>
            </div>
        </div>
            <div className="participation-form-grid">
                <div className="participation-form-group">
                    <label className="participation-form-label required">Type of event</label>
                    <select className="participation-form-select" name="eventType" required onChange={handleChange}>
                        <option value="">Select event type</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Webinar">Webinar</option>
                        <option value="Conference">Conference</option>
                        <option value="Conference">Workshop</option>
                    </select>
                </div>
                <div className="participation-form-group">
                    <label className="participation-form-label required">Mode of participation</label>
                    <select className="participation-form-select" name="eventRole" required onChange={handleChange}>
                        <option value="">Select participation mode</option>
                        <option value="Organiser">Organiser</option>
                        <option value="Speaker">Speaker</option>
                        <option value="Presenter">Presenter</option>
                        <option value="Attendee">Attendee</option>
                        <option value="Participant">Participant</option>
                    </select>
                </div>
                {
                    eventData.eventRole == 'Presenter' && (
                    <div className="participation-form-group">
                <label className="participation-form-label required">Presentation-slide</label>
                    <input 
                    type="file"
                    accept='.ppt,.pptx'
                    name="slides"
                    onChange={handleSlidesChange}
                    className='form-input'
                    required
                    />
                </div>
                    )
                    
                }
                <div className="participation-form-group">
                    <label className="participation-form-label required">Event Date</label>
                    <input type="date" className="date-input" name="eventDate" required onChange={handleChange}/>
                </div>
                <div className="participation-form-group">
                    <label className="participation-form-label required">Event Time</label>
                    <input type="time" className="date-input" name="eventTime" required onChange={handleChange}/>
                </div>
                <div className="participation-form-group">
                    <label className="participation-form-label required">Mode of conduct</label>
                    <select className="participation-form-select" name="eventMode" required onChange={handleChange}>
                        <option value="">Select mode of conduct</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>
                {
                    eventData.eventMode == 'Offline' && (
                    <div className="participation-form-group">
                    <label className="participation-form-label required">Event Location</label>
                    <input type="text" className="form-input" name="eventLocation" onChange={handleChange} required/>
                    </div>
                    )
                }
                <div className="participation-form-group">
                <label className="participation-form-label required">Proof of attendence</label>
                    <input 
                    type="file"
                    accept='image/*'
                    name="proof"
                    onChange={handleProofChange}
                    className='form-input'
                    required
                    />
                </div>
                
            </div>

                
        <button className="submit-btn" >Submit</button>
        <ToastContainer />
    </form>
</div>
    <Footer />
</>
  )
}

export default AddDocument