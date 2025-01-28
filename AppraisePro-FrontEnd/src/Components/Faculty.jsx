import React from 'react'
import '../Design/Faculty.css'

const Faculty = (props) => {
  return (
    <div className="faculty-card">
      <div className="faculty-avatar">
        <img 
          src={`https://ui-avatars.com/api/?name=${props.name}&background=random&size=128`} 
          alt={props.name} 
        />
      </div>
      <div className="faculty-details">
        <h3>{props.name}</h3>
        <p>{props.email}</p>
      </div>
    </div>
  )
}

export default Faculty