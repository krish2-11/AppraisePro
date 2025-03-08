import React from 'react'
import { NavLink } from 'react-router-dom';
import '../Design/Header.css'

const Header = () => {
  return (
    <header>
        <div className="logo">AppraisePro</div>
        <nav>
            <ul className="nav-links">
                <li>
                  <NavLink to="/"  style={{ textDecoration: 'none' , color: 'inherit' }}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/"  style={{ textDecoration: 'none' , color: 'inherit' }}>
                    About Us
                  </NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header