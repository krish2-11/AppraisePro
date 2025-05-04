import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import PublicationList from './PublicationList';

const Resource = () => {
    const [publication, setPublication] = useState([]);
    const [filteredPublications , setFilteredPublications] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/publication/approved")
          .then((response) => {
            setPublication(response.data)
            setFilteredPublications(response.data)
          })
          .catch((error) => {
            console.error("Error fetching PDFs:", error);
          });
      }, []);

      
      const handleSearch = (e) => {
        setFilteredPublications(publication.filter(pub => 
          (pub[0].tags || []).some(tag => 
            tag.toLowerCase().includes(e.target.value.toLowerCase())
          )
        ))
      }

      

  return (
    <div>
  <div className="flex flex-col p-0 w-full mx-auto">
  <div className="mb-6 px-4">
  <div className="relative">
    <input
      type="text"
      placeholder="Search By Tags"
      onChange={handleSearch}
      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</div>

    {filteredPublications.length === 0 ? (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              >
              </path>
            </svg>
          </div>
          <h1 className="text-xl font-medium text-gray-700">No Publications Available</h1>
        </div>
      </div>
    ) : (
      <PublicationList key={1} data={filteredPublications} />
    )}
  </div>
</div>
)
}

export default Resource