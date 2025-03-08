import React, { useEffect, useState } from 'react';
import '../Design/FacultyParticipation.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import EventCard from './EventCard';

const FacultyParticipation = () => {

    const [event , setEvent] = useState([])
    const [workshop , setWorkshop] = useState([])
    const [seminar , setSeminar] = useState([])
    const [webinar , setWebinar] = useState([])
    const [conference , SetConference] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:8080/event/getAll")
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
    <div className="container">
        <h1 className="page-title">Faculty Participation Dashboard</h1>
        
        <div className="stats-card">
            <div className="stats-grid">
                <div className="stat-item">
                    <h3>{event.length}</h3>
                    <p>Total Events</p>
                </div>
                <div className="stat-item">
                    <h3>{workshop.length}</h3>
                    <p>Workshops Attended</p>
                </div>
                <div className="stat-item">
                    <h3>{seminar.length}</h3>
                    <p>Seminar Attended</p>
                </div>
                <div className="stat-item">
                    <h3>{webinar.length}</h3>
                    <p>Webinar Attended</p>
                </div>
                <div className="stat-item">
                    <h3>{conference.length}</h3>
                    <p>Conerence Attended</p>
                </div>
            </div>
        </div>

        <div className='addDocument'>
            <NavLink to="/addDocument">
              <button className="action-button">Add Document</button>
            </NavLink>
        </div>

        <div className='document-flex'>
            {
                event.map((e) => (
                    <EventCard key={e.id} event={e}/>
                ))
            }
        </div>
    </div>
  );
  
};

export default FacultyParticipation;