import React, { useState } from 'react'
import axios from 'axios'
import '../Design/PublicationRequest.css'
import { ToastContainer, toast } from 'react-toastify';

const PublicationRequest = ({data}) => {


    const downloadPdf =async (id) => {
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
          }
    }

    const acceptPublication =  async(id) => {
        try{
            await axios.get(`http://localhost:8080/publication/accept/${id}`)
            toast.success("Publication Accepted Successfully")
        }
        catch(error){
            toast.error("Publication doesn't get accepted")
        }
    }

    const rejectPublication = async (id) => {
        try{
            await axios.get(`http://localhost:8080/publication/reject/${id}`)
            toast.success("Publication Rejected Successfully")
        }
        catch(error){
            toast.error("Publication doesn't get rejected")
        }
    }

  return (
    <div className="publication-container">
      <h2 className="publication-title">Publication Request</h2>
      <div className="publication-list">
        {data.map((pub) => (
          <div key={pub[0].id} className="publication-item">
            <h3 className="publication-item-title">{pub[0].publicationTitle}</h3>
            <h2 className="publication-faculty-name">By {pub[1]}</h2>
            <button
              onClick={() => downloadPdf(pub[0].id)}
              className="download-button"
            >
              Download PDF
            </button>
            <button
              onClick={() => acceptPublication(pub[0].id)}
              className="accept-button"
            >
              Accept
            </button>
            <button
              onClick={() => rejectPublication(pub[0].id)}
              className="reject-button"
            >
              Reject
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default PublicationRequest