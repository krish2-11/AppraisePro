import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 shadow-lg">
    <div className="text-2xl font-bold text-white ml-4">AppraisePro</div>
    <nav className="mr-4">
      <ul className="flex space-x-6">
        <li>
          <NavLink 
            to="/" 
            className="text-blue-100 hover:text-white transition-colors duration-300 font-medium"
            style={{ textDecoration: 'none' }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className="text-blue-100 hover:text-white transition-colors duration-300 font-medium"
            style={{ textDecoration: 'none' }}
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
  )
}

export default Header