import React from 'react';
import './Footer.styles.scss';  // Make sure to add the SCSS file

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <p>&copy; 2024 OT Resort. All Rights Reserved.</p>
                <div className='social-icons'>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                        <i className="fab fa-instagram"></i> {/* Font Awesome Instagram icon */}
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                        <i className="fab fa-twitter"></i> {/* Font Awesome Twitter icon */}
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                        <i className="fab fa-facebook"></i> {/* Font Awesome Facebook icon */}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
