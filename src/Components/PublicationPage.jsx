import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import NoPublicationPage from './NoPublicationPage';
import PublicationCard from './PublicationCard';

const PublicationPage = () => {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEmail = localStorage.getItem('email');
    setIsLoading(true);
    
    axios.get(`http://localhost:8080/publication/accepted/${getEmail}`)
      .then((response) => {
        console.log(response.data);
        setPublications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching publications:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col p-0 w-full mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        Research Publications
      </h1>

      {/* Stats Cards */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-indigo-800 mb-2">
              {isLoading ? (
                <div className="h-8 w-16 mx-auto bg-indigo-200 animate-pulse rounded"></div>
              ) : (
                publications.length
              )}
            </h3>
            <p className="text-indigo-600 font-medium">Total Publications</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-blue-800 mb-2">0</h3>
            <p className="text-blue-600 font-medium">Total Downloads</p>
          </div>
        </div>
      </div>

      {/* Add Publication Button */}
      <div className="flex justify-end mb-8">
        <NavLink to="/addPublication">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Publication
          </button>
        </NavLink>
      </div>

      {/* Publications List */}
      <div className="min-h-[200px] mx-4 md:mx-6 my-8">
  {isLoading ? (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  ) : (
    <>
      {publications.length === 0 ? (
        <NoPublicationPage />
      ) : (
        <div className="mt-4 mb-8">
          <PublicationCard data={publications} />
        </div>
      )}
    </>
  )}
</div>
    </div>
  );
};

export default PublicationPage;