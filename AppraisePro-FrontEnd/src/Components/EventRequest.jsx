import React, { useState } from 'react'
import axios from 'axios'
import '../Design/PublicationRequest.css'
import { ToastContainer, toast } from 'react-toastify';

const EventRequest = ({data}) => {
    const downloadProof =async (id) => {
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
          }
    }
    const downloadPresentation =async (id) => {
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
          }
    }

    const acceptEvent =  async(id) => {
        try{
            await axios.get(`http://localhost:8080/event/accept/${id}`)
            toast.success("Event Accepted Successfully")
        }
        catch(error){
            toast.error("Event doesn't get accepted")
        }
    }

    const rejectEvent = async (id) => {
        try{
            await axios.get(`http://localhost:8080/event/reject/${id}`)
            toast.success("Event Rejected Successfully")
        }
        catch(error){
            toast.error("Event doesn't get rejected")
        }
    }

  return (
    <div className="publication-container">
      <h2 className="publication-title">Event Participation Request</h2>
      <div className="publication-list">
        {data.map((event) => (
          <div key={event[0].id} className="publication-item">
            <h3 className="publication-item-title">{event[0].eventName}</h3>
            <h2 className="publication-faculty-name">By {event[1]}</h2>
            <button
              onClick={() => downloadProof(event[0].id)}
              className="download-button"
            >
              Download Proof
            </button>
            {
                event[0].presentationSlide && <button
                onClick={() => downloadPresentation(event[0].id)}
                className="download-button"
                >
                Download Presentation
              </button>
            }
            
            <button
              onClick={() => acceptEvent(event[0].id)}
              className="accept-button"
            >
              Accept
            </button>
            <button
              onClick={() => rejectEvent(event[0].id)}
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

export default EventRequest