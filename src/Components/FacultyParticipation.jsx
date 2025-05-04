import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import EventCard from './EventCard';

const FacultyParticipation = () => {
  const [event, setEvent] = useState([])
  const [workshop, setWorkshop] = useState([])
  const [seminar, setSeminar] = useState([])
  const [webinar, setWebinar] = useState([])
  const [conference, SetConference] = useState([])
  
  const getEmail = localStorage.getItem('email')
  
  useEffect(() => {
    axios.get(`http://localhost:8080/event/accepted/${getEmail}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setEvent(response.data);
        setWebinar(response.data.filter(e => e.eventType === "Webinar"));
        setSeminar(response.data.filter(e => e.eventType === "Seminar"));
        setWorkshop(response.data.filter(e => e.eventType === "Workshop"));
        SetConference(response.data.filter(e => e.eventType === "Conference"));
      })
      .catch((error) => {
        console.error("Error fetching Events:", error);
      });
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        Faculty Participation Dashboard
      </h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-purple-800 mb-2">{event.length}</h3>
            <p className="text-purple-600 font-medium">Total Events</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-blue-800 mb-2">{workshop.length}</h3>
            <p className="text-blue-600 font-medium">Workshops</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-green-800 mb-2">{seminar.length}</h3>
            <p className="text-green-600 font-medium">Seminars</p>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-amber-800 mb-2">{webinar.length}</h3>
            <p className="text-amber-600 font-medium">Webinars</p>
          </div>
          
          <div className="bg-rose-50 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-rose-800 mb-2">{conference.length}</h3>
            <p className="text-rose-600 font-medium">Conferences</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mb-8">
        <NavLink to="/AddEvent">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Event
          </button>
        </NavLink>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {event.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
};

export default FacultyParticipation;