import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventRequest = ({ data, refreshEvents }) => {
  const downloadProof = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/event/download/proof/${id}`, {
        responseType: "blob",
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `proof_${id}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the Event:", error);
      toast.error("Failed to download proof");
    }
  };

  const downloadPresentation = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/event/download/presentation/${id}`, {
        responseType: "blob",
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `publication_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the Presentation Slides:", error);
      toast.error("Failed to download presentation");
    }
  };

  const acceptEvent = async (id) => {
    try {
      await axios.get(`http://localhost:8080/event/accept/${id}`);
      toast.success("Event Accepted Successfully");
      refreshEvents();
    } catch (error) {
      toast.error("Event doesn't get accepted");
    }
  };

  const rejectEvent = async (id) => {
    try {
      await axios.get(`http://localhost:8080/event/reject/${id}`);
      toast.success("Event Rejected Successfully");
      refreshEvents();
    } catch (error) {
      toast.error("Event doesn't get rejected");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="space-y-4">
        {data.map((event) => (
          <div key={event[0].id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700">{event[0].eventName}</h3>
            <p className="text-gray-600 mb-4">By {event[1]}</p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => downloadProof(event[0].id)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Proof
              </button>
              
              {event[0].presentationSlide && (
                <button
                  onClick={() => downloadPresentation(event[0].id)}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Presentation
                </button>
              )}
              
              <button
                onClick={() => acceptEvent(event[0].id)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Accept
              </button>
              
              <button
                onClick={() => rejectEvent(event[0].id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventRequest;