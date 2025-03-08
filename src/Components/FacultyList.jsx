import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import Faculty from './Faculty';
import '../Design/AdminPage.css'


const FacultyList = () => {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
      const fetchFaculty = async () => {
        try {
          const response = await axios.get("http://localhost:8080/faculty/getAll");
          setFaculty(response.data);
        } catch (e) {
          console.error("Error fetching data:", e);
        }
      };
      fetchFaculty();
    }, []);
    
    
    
        return (
            <>
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
            </>
          )
}

export default FacultyList
