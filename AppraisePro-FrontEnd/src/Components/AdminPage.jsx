import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import Header from './Header';
import Faculty from './Faculty';
import '../Design/AdminPage.css'
import Footer from './Footer';

const AdminPage = () => {
    const [faculty, setFaculty] = useState([]);

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
    
    if(faculty.length == 0){
        return (
            <>
              <Header />
              <div className='faculty-wrap'>
                <div className='faculty-info'>
                    <h1>No data available</h1>
                </div>
                <div className="add-delete">
                  <NavLink to="/add">
                    <button className="action-button">Add Faculty</button>
                  </NavLink>
                </div>
                </div>
                <Footer />
            </>
          )
    }

  return (
    <>
    <Header />
    <div className='faculty-wrap'>
    <div className="faculty-info">
      
      <div className='faculty-list'>
  {
  faculty.map((obj) => (
    <Faculty key={obj.email} name={obj.firstname} email={obj.email} />
  ))
  }
  </div>
   <div className="add-delete">
    <NavLink to="/add">
      <button className="action-button">Add Faculty</button>
    </NavLink>
  </div>
</div>
</div>
<Footer />
</>
  )
}

export default AdminPage
