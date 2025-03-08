import React from 'react'
import { NavLink } from 'react-router-dom'

const Card = (props) => {
  return (
    <div className='card'>
        <img src={props.url} />
        <p>{props.name}</p>
        <NavLink to={props.link}>
            <button className='sign-in'>Sign In</button>
        </NavLink>
    </div>
  )
}

export default Card