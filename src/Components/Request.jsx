import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublicationRequest from './PublicationRequest';
import EventRequest from './EventRequest';

const Request = () => {
  const [publication, setPublication] = useState([]);
  const [event, setEvent] = useState([]);
  const [isLoadingPub, setIsLoadingPub] = useState(true);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);

  const fetchPublication = () => {
    setIsLoadingPub(true);
    axios.get("http://localhost:8080/publication/unapproved")
      .then((response) => {
        setPublication(response.data);
      })
      .catch((error) => {
        console.error("Error fetching publications:", error);
      })
      .finally(() => {
        setIsLoadingPub(false);
      });
  };

  const fetchEvent = () => {
    setIsLoadingEvent(true);
    axios.get("http://localhost:8080/event/unapproved")
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      })
      .finally(() => {
        setIsLoadingEvent(false);
      });
  };

  useEffect(() => {
    fetchPublication();
    fetchEvent();
  }, []);

  const EmptyState = ({ icon, message }) => (
    <div className="bg-white rounded-lg shadow-md p-8 my-6 border border-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-b from-teal-50 to-teal-100 mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-500 text-center">
          When new requests come in, they will appear here for your approval.
        </p>
      </div>
    </div>
  );

  const LoadingState = () => (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
    </div>
  );

  const publicationIcon = (
    <svg className="w-10 h-10 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
      </path>
    </svg>
  );

  const eventIcon = (
    <svg className="w-10 h-10 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth="2"/>
      <path d="M3 8h18" strokeWidth="2"/>
      <path d="M7 2v4M17 2v4" strokeWidth="2"/>
      <circle cx="9" cy="14" r="2"/>
      <path d="M9 16c-2 2-4 2.5-4 4"/>
      <circle cx="15" cy="14" r="2"/>
      <path d="M15 16c2 2 4 2.5 4 4"/>
      <path d="M12 11l2 2 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Approval Requests</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Publications Section */}
        <div className="bg-gradient-to-b from-teal-50 to-white rounded-xl overflow-hidden shadow-md border border-teal-100">
          <div className="px-6 py-4 bg-gradient-to-b from-teal-800 via-teal-900 to-slate-900 text-white">
            <div className="flex items-center">
              {publicationIcon}
              <h2 className="text-xl font-semibold ml-3">Publication Requests</h2>
            </div>
          </div>
          
          <div className="px-6 py-4">
            {isLoadingPub ? (
              <LoadingState />
            ) : publication.length === 0 ? (
              <EmptyState 
                icon={publicationIcon} 
                message="No Publication Requests" 
              />
            ) : (
              <PublicationRequest 
                data={publication} 
                refreshPublications={fetchPublication} 
              />
            )}
          </div>
        </div>

        {/* Events Section */}
        <div className="bg-gradient-to-b from-teal-50 to-white rounded-xl overflow-hidden shadow-md border border-teal-100">
          <div className="px-6 py-4 bg-gradient-to-b from-teal-800 via-teal-900 to-slate-900 text-white">
            <div className="flex items-center">
              {eventIcon}
              <h2 className="text-xl font-semibold ml-3">Event Participation Requests</h2>
            </div>
          </div>
          
          <div className="px-6 py-4">
            {isLoadingEvent ? (
              <LoadingState />
            ) : event.length === 0 ? (
              <EmptyState 
                icon={eventIcon} 
                message="No Event Participation Requests" 
              />
            ) : (
              <EventRequest 
                data={event} 
                refreshEvents={fetchEvent} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;