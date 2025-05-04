import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import { CalendarDays, Clock, MapPin, FileImage } from 'lucide-react';

const AddEvent = () => {
    const getEmail = localStorage.getItem('email')
    const credential = {
        email: getEmail,
        password: ''
    }
    const [eventData, setEventData] = useState({
        eventName: '',
        eventDescription: '',
        eventType: '',
        eventRole: '',
        eventDate: '',
        eventMode: '',
        eventLocation: '',
        eventTime: ''
    })
    const [proof, setProof] = useState(null);
    const [slides, setSlides] = useState(null);
    const navigate = useNavigate();

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
            proof: proof,
            slides: slides
        }
        
        try {
            await axios.post(`http://localhost:8080/event/addFaculty`, credential);
            await axios.post("http://localhost:8080/event/add", eventData);
            await axios.post("http://localhost:8080/event/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Event Request Sent successfully!")
            navigate('/faculty/home')
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add event. Please try again.");
        }
    }

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="bg-indigo-600 py-4 px-6">
                        <h1 className="text-2xl font-bold text-white">Add New Event</h1>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Event Information</h2>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="eventName">
                                    Event Name <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="eventName"
                                    name="eventName" 
                                    required 
                                    onChange={handleChange}
                                    placeholder="Enter event name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="eventDescription">
                                    Event Description <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    id="eventDescription"
                                    name="eventDescription" 
                                    rows="4" 
                                    required 
                                    onChange={handleChange}
                                    placeholder="Enter event description"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="eventType">
                                    Type of Event <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    id="eventType"
                                    name="eventType" 
                                    required 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Select event type</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Webinar">Webinar</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Workshop">Workshop</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="eventRole">
                                    Mode of Participation <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    id="eventRole"
                                    name="eventRole" 
                                    required 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Select participation mode</option>
                                    <option value="Organiser">Organiser</option>
                                    <option value="Speaker">Speaker</option>
                                    <option value="Presenter">Presenter</option>
                                    <option value="Attendee">Attendee</option>
                                    <option value="Participant">Participant</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="flex items-center text-gray-700 text-sm font-medium mb-2" htmlFor="eventDate">
                                    <CalendarDays className="w-4 h-4 mr-2 text-indigo-500" />
                                    Event Date <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="date" 
                                    id="eventDate"
                                    name="eventDate" 
                                    required 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="flex items-center text-gray-700 text-sm font-medium mb-2" htmlFor="eventTime">
                                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                                    Event Time <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="time" 
                                    id="eventTime"
                                    name="eventTime" 
                                    required 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="eventMode">
                                    Mode of Conduct <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    id="eventMode"
                                    name="eventMode" 
                                    required 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Select mode of conduct</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>
                            
                            {eventData.eventMode === 'Offline' && (
                                <div>
                                    <label className="flex items-center text-gray-700 text-sm font-medium mb-2" htmlFor="eventLocation">
                                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                                        Event Location <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="eventLocation"
                                        name="eventLocation" 
                                        required 
                                        onChange={handleChange}
                                        placeholder="Enter location"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            )}
                            
                            {eventData.eventRole === 'Presenter' && (
                                <div>
                                    <label className="flex items-center text-gray-700 text-sm font-medium mb-2" htmlFor="slides">
                                        Presentation Slides <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <FilePresentation className="w-8 h-8 mb-3 text-gray-500" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PPT/PPTX files only</p>
                                            </div>
                                            <input 
                                                type="file"
                                                id="slides"
                                                accept=".ppt,.pptx"
                                                name="slides"
                                                onChange={handleSlidesChange}
                                                required
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {slides && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Selected file: {slides.name}
                                        </p>
                                    )}
                                </div>
                            )}
                            
                            <div className={eventData.eventRole === 'Presenter' ? 'col-span-2' : ''}>
                                <label className="flex items-center text-gray-700 text-sm font-medium mb-2" htmlFor="proof">
                                    <FileImage className="w-4 h-4 mr-2 text-indigo-500" />
                                    Proof of Attendance <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FileImage className="w-8 h-8 mb-3 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">Image files only</p>
                                        </div>
                                        <input 
                                            type="file"
                                            id="proof" 
                                            accept="image/*"
                                            name="proof"
                                            onChange={handleProofChange}
                                            required
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {proof && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected file: {proof.name}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex justify-center mt-8">
                            <button 
                                type="submit" 
                                className="w-full md:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                            >
                                Submit Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default AddEvent