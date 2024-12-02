import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = () => {
    return ( 
        <header className='main-header'>
            <div className="container">
                <Link to='/'>
                    <h1 className='logo'>OT Resort</h1>
                </Link>
                <nav>
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
