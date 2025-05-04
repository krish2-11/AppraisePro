import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const PublicationRequest = ({ data, refreshPublications }) => {
  const downloadPdf = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/publication/download/${id}`, {
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
      console.error("Error downloading the PDF:", error);
      toast.error("Failed to download PDF");
    }
  };

  const acceptPublication = async (id) => {
    try {
      await axios.get(`http://localhost:8080/publication/accept/${id}`);
      toast.success("Publication Accepted Successfully");
      refreshPublications();
    } catch (error) {
      toast.error("Publication doesn't get accepted");
    }
  };

  const rejectPublication = async (id) => {
    try {
      await axios.get(`http://localhost:8080/publication/reject/${id}`);
      toast.success("Publication Rejected Successfully");
      refreshPublications();
    } catch (error) {
      toast.error("Publication doesn't get rejected");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-sm">
      
      <div className="grid grid-cols-1 gap-6">
        {data.map((pub) => (
          <div 
            key={pub[0].id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{pub[0].publicationTitle}</h3>
              <p className="text-indigo-600 font-medium">By {pub[1]}</p>
            </div>
            
            <div className="flex flex-wrap p-4 gap-3 bg-gray-50">
              <button
                onClick={() => downloadPdf(pub[0].id)}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PDF
              </button>
              
              <button
                onClick={() => acceptPublication(pub[0].id)}
                className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Accept
              </button>
              
              <button
                onClick={() => rejectPublication(pub[0].id)}
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PublicationRequest;