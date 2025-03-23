import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './Home-comonents/images/logocipher.png';
import './styles/NavbarCL.css';

const NavbarCL = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo-container">
          <img src={logo} alt="CIPHER Logo" className="navbar-logo" />
          <div className="navbar-title-container">
            <h1 className="navbar-title">CIPHER-2K25</h1>
            <div className="navbar-subtitle">IT FEST</div>
          </div>
        </div>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/events" className="navbar-link">Events</Link></li>
            <li><Link to="/about" className="navbar-link">About</Link></li>
            <li><Link to="/Developers" className="navbar-link">Developers</Link></li>
            <li><Link to="/contact" className="navbar-link">Contact</Link></li>
            <li><Link to="/faq" className="navbar-link">FAQ</Link></li>
            <li><Link to="/register" className="navbar-link register-button">Register</Link></li>
          </ul>
        </div>

        <div className={`navbar-hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="navbar-hamburger-line"></span>
          <span className="navbar-hamburger-line"></span>
          <span className="navbar-hamburger-line"></span>
        </div>
      </div>

      <div className={`navbar-sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/home" className="navbar-sidebar-link" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/events" className="navbar-sidebar-link" onClick={toggleMenu}>Events</Link></li>
          <li><Link to="/about" className="navbar-sidebar-link" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/developers" className="navbar-sidebar-link" onClick={toggleMenu}>Developers</Link></li>
          <li><Link to="/contact" className="navbar-sidebar-link" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/faq" className="navbar-sidebar-link" onClick={toggleMenu}>FAQ</Link></li>
          <li><Link to="/register" className="navbar-sidebar-link register-button-mobile" onClick={toggleMenu}>Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarCL;
