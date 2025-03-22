import React, { useEffect, useRef } from 'react';
import './styles/FooterCL3.css';

const FooterCL3 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize animation sequence
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.classList.add('cipher__footer-video-active');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="cipher__footer-container">
      {/* Initial animation that looks like a video */}
      <div ref={videoRef} className="cipher__footer-video-animation">
        <div className="cipher__footer-shapes-container">
          <div className="cipher__footer-circle"></div>
          <div className="cipher__footer-triangle"></div>
          <div className="cipher__footer-square"></div>
        </div>
        <div className="cipher__footer-mask-overlay">
          <span className="cipher__footer-text-appear">CIPHER 2K25</span>
        </div>
      </div>

      <div className="cipher__footer-content">
        <div className="cipher__footer-logo-section">
          <div className="cipher__footer-logo">
            <span className="cipher__footer-logo-text">CIPHER</span>
            <span className="cipher__footer-logo-year">2K25</span>
          </div>
          <p className="cipher__footer-tagline">Survive the Code. Win the Game.</p>
        </div>

        <div className="cipher__footer-sections">
          <div className="cipher__footer-section">
            {/* <h3 className="cipher__footer-section-title">Events</h3>
            <ul className="cipher__footer-list">
              <li className="cipher__footer-list-item">Code Wars</li>
              <li className="cipher__footer-list-item">Hackathon</li>
              <li className="cipher__footer-list-item">UI Dalgona</li>
              <li className="cipher__footer-list-item">Debug or Die</li>
            </ul> */}
          </div>

          <div className="cipher__footer-section">
            {/* <h3 className="cipher__footer-section-title">Connect</h3>
            <ul className="cipher__footer-list">
              <li className="cipher__footer-list-item">Instagram</li>
              <li className="cipher__footer-list-item">Twitter</li>
              <li className="cipher__footer-list-item">Discord</li>
              <li className="cipher__footer-list-item">LinkedIn</li>
            </ul> */}
          </div>

          <div className="cipher__footer-section">
            <h3 className="cipher__footer-section-title">Contact</h3>
            <ul className="cipher__footer-list">
              <li className="cipher__footer-list-item">Email: cipher2k25shc@gmail.con</li>
              <li className="cipher__footer-list-item">Phone: +91 7259450386</li>
              <li className="cipher__footer-list-item">BCA Department</li>
              <li className="cipher__footer-list-item">Sacred Heart College, Madanthyar</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cipher__footer-bottom">
        <div className="cipher__footer-countdown">
          <span className="cipher__footer-countdown-text">Game Begins On: </span>
          <div className="cipher__footer-timer">9 April,2025</div>
        </div>
        <div className="cipher__footer-copyright">
          © CIPHER-2K25 IT Fest. All rights reserved.
        </div>
      </div>

      {/* Animated elements */}
      <div className="cipher__footer-floating-elements">
        <div className="cipher__footer-floater cipher__footer-floater-circle"></div>
        <div className="cipher__footer-floater cipher__footer-floater-triangle"></div>
        <div className="cipher__footer-floater cipher__footer-floater-square"></div>
        <div className="cipher__footer-floater cipher__footer-floater-circle"></div>
        <div className="cipher__footer-floater cipher__footer-floater-triangle"></div>
      </div>
    </footer>
  );
};

export default FooterCL3;