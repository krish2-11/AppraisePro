import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import '../Design/NoPublicationPage.css';
import '../Design/AdminPage.css'
import axios from 'axios'
import PublicationRequest from './PublicationRequest';
import EventRequest from './EventRequest';

const Request = () => {
    const [publication, setPublication] = useState([]);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/publication/unapproved")
          .then((response) => {
            setPublication(response.data);
          })
          .catch((error) => {
            console.error("Error fetching PDFs:", error);
          });
      }, []);

      useEffect(() => {
        axios.get("http://localhost:8080/event/unapproved")
          .then((response) => {
            setEvent(response.data);
          })
          .catch((error) => {
            console.error("Error fetching PDFs:", error);
          });
      }, []);

  return (
    <div>
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
                     <PublicationRequest data={publication} />
        }
        {
                  event.length==0 ? 
                  <div className='empty-body'>
                  <div className="empty-state">
                      <div className="icon-container">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="4" width="18" height="17" rx="2" stroke-width="2"/>
  <path d="M3 8h18" stroke-width="2"/>
  <path d="M7 2v4M17 2v4" stroke-width="2"/>
  
  <circle cx="9" cy="14" r="2"/>
  <path d="M9 16c-2 2-4 2.5-4 4"/>
  
  <circle cx="15" cy="14" r="2"/>
  <path d="M15 16c2 2 4 2.5 4 4"/>
  
  <path d="M12 11l2 2 3-3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      </div>
                      <h1>No Event Participation Request</h1>
                  </div>
                  </div>
                    :
                     <EventRequest data={event} />
        }
    </div>
  )
}

export default Request