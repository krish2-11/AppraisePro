import React, { useState , useEffect} from 'react'
import '../Design/PublicationPage.css'
import { NavLink } from 'react-router-dom';

import axios from 'axios';
import NoPublicationPage from './NoPublicationPage';
import PublicationCard from './PublicationCard';

const PublicationPage = () => {

    const [publications , setPublications] = useState([])

    useEffect(() => {
        const getEmail = sessionStorage.getItem('email')
        axios.get(`http://localhost:8080/publication/accepted/${getEmail}`)
          .then((response) => {
            console.log(response.data)
            setPublications(response.data);
          })
          .catch((error) => {
            console.error("Error fetching PDFs:", error);
          });
      }, []);
    

  return (
    <>
      <div className="container">
        <h1 className="page-title">Research Publications</h1>
        
        <div className="stats-card">
            <div className="stats-grid">
                <div className="stat-item">
                    <h3>{publications.length}</h3>
                    <p>Total Publications</p>
                </div>
                <div className="stat-item">
                    <h3>0</h3>
                    <p>Journal Articles</p>
                </div>
                <div className="stat-item">
                    <h3>0</h3>
                    <p>Conference Papers</p>
                </div>
            </div>
        </div>

        <div className='addPublication'>
            <NavLink to="/addPublication">
              <button className="action-button">Add Publication</button>
            </NavLink>
        </div>

        <div className='publication-flex'>
        {publications.length == 0 ? <NoPublicationPage key='1' />:<PublicationCard key='1' data={publications}/>}
        </div>
    </div>
    </>
  )
}

export default PublicationPage