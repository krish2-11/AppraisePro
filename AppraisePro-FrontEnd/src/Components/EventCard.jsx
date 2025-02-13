import React from 'react';
import '../Design/EventCard.css'

const EventCard = ({event}) => {
    const imageSrc = event.proofOfAttendance 
    ? `data:image/jpeg;base64,${event.proofOfAttendance}` 
    : "/api/placeholder/800/400";
  return (
    <div className="event-card">
        <div className="event-image">
            <img src={imageSrc} alt="Event cover" />
        </div>
        <div className="event-content">
            <div className="event-meta">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{event.eventDate}</span>
                <span className="event-meta-divider">•</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{event.eventTime}</span>
            </div>
            
            <h3 className="event-title">{event.eventName}</h3>
            
            <p className="event-description">
                {event.eventDescription}
            </p>
            
            <div className="event-location">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{event.eventLocation}</span>
            </div>
        </div>
    </div>
  );
};

export default EventCard;