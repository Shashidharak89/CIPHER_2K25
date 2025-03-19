import React, { useEffect, useRef } from 'react';
import './styles/AboutUs.css';

const AboutUs = () => {
  const triangleRef = useRef(null);
  const circleRef = useRef(null);
  const squareRef = useRef(null);

  useEffect(() => {
    // Animation for shapes
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 50;
      const moveY = (clientY - window.innerHeight / 2) / 50;

      if (triangleRef.current) {
        triangleRef.current.style.transform = `translate(${moveX * -3}px, ${moveY * -3}px) rotate(${moveX}deg)`;
      }
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
      }
      if (squareRef.current) {
        squareRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveY}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="about-us-container">
      {/* Background Elements */}
      <div className="shape-container">
        <div className="shape-triangle" ref={triangleRef}></div>
        <div className="shape-circle" ref={circleRef}></div>
        <div className="shape-square" ref={squareRef}></div>
      </div>

      <div className="about-us-content">
        <div className="about-us-header">
          <h1 className="about-us-title">
            <span className="title-cipher">CIPHER</span> 
            <span className="title-year">2K25</span>
          </h1>
          <div className="subtitle-container">
            <div className="subtitle-line"></div>
            <p className="about-us-subtitle">SQUID GAME EDITION</p>
            <div className="subtitle-line"></div>
          </div>
        </div>

        <div className="about-us-card">
          <div className="card-inner">
            <div className="card-front">
              <div className="card-logo">
                <div className="squid-logo">
                  <div className="squid-triangle"></div>
                  <div className="squid-circle"></div>
                  <div className="squid-square"></div>
                </div>
              </div>
              <h2 className="card-title">About Us</h2>
              <p className="card-text">Click to learn more about CIPHER 2K25</p>
              <button className="card-button">View Details</button>
            </div>
            <div className="card-back">
              <h2 className="card-title">CIPHER 2K25</h2>
              <p className="card-description">
                Welcome to CIPHER 2K25, the premier IT fest hosted by the Department of Computer Applications at Sacred Heart College, Madanthyar. This year, we bring you an immersive Squid Game themed experience filled with technical challenges, coding competitions, and innovative events.
              </p>
              <p className="card-description">
                Join us for a thrilling journey where your technical skills will be put to the ultimate test. Will you survive the games and emerge victorious?
              </p>
              <div className="card-footer">
                <div className="college-info">
                  <h3 className="college-name">Sacred Heart College, Madanthyar</h3>
                  <p className="department-name">Department of Computer Applications</p>
                </div>
                <button className="card-button return-button">Return</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Masked Players */}
      <div className="masked-player player-left"></div>
      <div className="masked-player player-right"></div>

      {/* Countdown Timer */}
      <div className="countdown-timer">
        <div className="timer-container">
          <span className="timer-label">COUNTDOWN</span>
          <div className="timer-digits">
            <div className="timer-value">00:00:00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;