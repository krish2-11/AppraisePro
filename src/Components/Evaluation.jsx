import React, { useState } from 'react';
import axios from 'axios';

const Evaluation = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const email = localStorage.getItem('adminEmail')
  const fetchFaculty = () => {
    setLoading(true);
    setError(null);
    
    // Simulating API call to server
    setTimeout(async () => {
      try {

        const response = await axios.get(`http://localhost:8080/evaluate/${email}`);
        console.log(response.data);
        setFaculty(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch faculty data. Please try again.");
        console.log(err)
        setLoading(false);
      }
    }, 1000);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "bg-blue-500";
    if (rating >= 50.0) return "bg-blue-400";
    return "bg-blue-300";
  };



  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Faculty Evaluation System</h1>
      
      <div className="flex justify-center mb-8">
        <button 
          onClick={fetchFaculty}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Evaluate Faculty
        </button>
      </div>
      
      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {faculty.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {faculty.map((prof , index) => (
                <tr key={prof.id} className="hover:bg-blue-50 transition duration-150">
                  <td className="px-6 py-4 text-blue-900">{prof.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`inline-block w-20 h-8 ${getRatingColor(prof.rating)} rounded-md text-white font-bold flex items-center justify-center mr-2`}>
                        {prof.rating}
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(prof.rating / 2) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {faculty.length === 0 && !loading && (
        <div className="text-center p-8 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-700">Click the "Evaluate Faculty" button to load faculty rankings.</p>
        </div>
      )}
    </div>
  );
};

export default Evaluation;