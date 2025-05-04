import React from 'react';

const EventCard = ({ event }) => {
  const imageSrc = event.proofOfAttendance
    ? `data:image/jpeg;base64,${event.proofOfAttendance}`
    : "/api/placeholder/800/400";
    
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt="Event cover" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{event.eventDate}</span>
          
          <span className="mx-2">•</span>
          
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{event.eventTime}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {event.eventName}
        </h3>
        
        <div className="flex items-center">
          {event.eventMode === 'Offline' ? (
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{event.eventLocation}</span>
            </div>
          ) : (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Online
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            event.eventType === 'Workshop' ? 'bg-blue-100 text-blue-800' :
            event.eventType === 'Seminar' ? 'bg-green-100 text-green-800' :
            event.eventType === 'Webinar' ? 'bg-amber-100 text-amber-800' :
            'bg-rose-100 text-rose-800'
          }`}>
            {event.eventType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;