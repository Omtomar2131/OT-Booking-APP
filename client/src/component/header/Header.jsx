import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu on/off
  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className='main-header'>
      <div className="container">
        <Link to='/'>
          <h1 className='logo'>OT Resort</h1>
        </Link>
        
        {/* Hamburger Icon */}
        <div className="hamburger-icon" onClick={handleMenuToggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        
        {/* Navigation Links */}
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to='/' className="spa-button">Home</Link>
          <Link to='/dining' className="spa-button">Dining</Link>
          <Link to='/spa' className="spa-button">Spa & Wellness</Link>
          <Link to='/rooms' className="rooms-button">Rooms</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
