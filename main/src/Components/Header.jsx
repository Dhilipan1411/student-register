
// NavBar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
import './Header.css'; // Optional: for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
        <a href='/student'>Student</a>
        </li>
        <li>
        <a href='/mark'>Mark</a>
        </li>
        <li>
        <a href='/subject'>Subject</a>
        </li>
        <li>
        <a href='/about'>About</a>
        </li>
        
        
      </ul>
    </nav>
  );
};

export default NavBar;

