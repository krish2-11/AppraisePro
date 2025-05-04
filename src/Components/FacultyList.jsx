import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Faculty from './Faculty';

const FacultyList = () => {
  const email = localStorage.getItem('adminEmail')
  const [faculty, setFaculty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchFaculty = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8080/faculty/getAll/${email}`);
        console.log(response.data);
        setFaculty(response.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="p-6 max-w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Faculty Directory</h1>
        <NavLink to="/add">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Faculty
          </button>
        </NavLink>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : faculty.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Faculty Found</h2>
          <p className="text-gray-500">There are no faculty members available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((obj) => (
            <Faculty key={obj.email} data={obj} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyList;