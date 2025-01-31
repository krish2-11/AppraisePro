import React, { useState } from 'react';
import '../Design/FacultyParticipation.css';
import { NavLink } from 'react-router-dom';

const FacultyParticipation = () => {


  return (
    <div className="container">
        <h1 className="page-title">Faculty Participation Dashboard</h1>
        
        <div className="stats-card">
            <div className="stats-grid">
                <div className="stat-item">
                    <h3>0</h3>
                    <p>Total Events</p>
                </div>
                <div className="stat-item">
                    <h3>0</h3>
                    <p>Workshops Attended</p>
                </div>
                <div className="stat-item">
                    <h3>0</h3>
                    <p>Certifications</p>
                </div>
            </div>
        </div>

        <div className='addDocument'>
            <NavLink to="/addDocument">
              <button className="action-button">Add Document</button>
            </NavLink>
        </div>

        <div className='document-flex'>

        </div>
    </div>
  );
  
};

export default FacultyParticipation;