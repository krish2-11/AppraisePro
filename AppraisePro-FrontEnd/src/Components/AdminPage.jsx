import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import Header from './Header';
import Faculty from './Faculty';
import '../Design/AdminPage.css'
import Footer from './Footer';
import PublicationDetail from './PublicationDetail';
import '../Design/NoPublicationPage.css';

const AdminPage = () => {
    const [faculty, setFaculty] = useState([]);
    const [publication, setPublication] = useState([]);
    useEffect(() => {
      const fetchFaculty = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/faculty/getAll");
          setFaculty(response.data);
        } catch (e) {
          console.error("Error fetching data:", e);
        }
      };
      fetchFaculty();
    }, []);
    
    useEffect(() => {
      axios.get("http://localhost:8080/publication/unapproved")
        .then((response) => {
          console.log(response.data)
          setPublication(response.data);
        })
        .catch((error) => {
          console.error("Error fetching PDFs:", error);
        });
    }, []);
    
        return (
            <>
              <Header />
              <div className='faculty-wrap'>
                {
                  faculty.length == 0 ? 
                  <div className='faculty-info'>
                    <h1>No data available</h1>
                </div>
                  :
                  <div className="faculty-info">
                    <div className='faculty-list'>
                     {
                      faculty.map((obj) => ( <Faculty key={obj.email} name={obj.firstname} email={obj.email} />))
                     }
                    </div>
                  </div>
                }
                
                <div className="add-delete">
                  <NavLink to="/add">
                    <button className="action-button">Add Faculty</button>
                  </NavLink>
                </div>
                </div>
                {
                  publication.length==0 ? 
                  <div className='empty-body'>
                  <div className="empty-state">
                      <div className="icon-container">
                          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                              </path>
                          </svg>
                      </div>
                      <h1>No Publications Request</h1>
                  </div>
                  </div>
                    :
                     <PublicationDetail data={publication} />
                }
                <Footer />
            </>
          )
}

export default AdminPage
