import React, { useEffect, useRef, useState } from 'react';
import './styles/DepInfoCL.css';

const DepInfoCL = () => {
  const componentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = componentRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="dep-info-container" ref={componentRef}>
      {/* Background Elements */}
      <div className={`bg-elements ${isVisible ? 'visible' : ''}`}>
        <div className="circle pink"></div>
        <div className="triangle green"></div>
        <div className="square blue"></div>
        <div className="circle pink delayed"></div>
        <div className="triangle green delayed"></div>
        <div className="square blue delayed"></div>
      </div>

      {/* Main Content */}
      <div className={`content-wrapper ${isVisible ? 'visible' : ''}`}>
        <div className="logo-section">
          <div className="squid-mask"></div>
          <h1 className="event-title">CIPHER <span>2K25</span></h1>
        </div>

        <div className="info-section">
          <h2>Department of BCA</h2>
          <h3>Sacred Heart College, Madanthyar</h3>
          
          <div className="event-details">
            <p className="tagline">Will you survive the game?</p>
            <p className="description">
              Join us for an exhilarating IT fest inspired by the Squid Game universe. 
              Test your technical skills, strategic thinking, and teamwork in a series 
              of challenging events designed to push your limits.
            </p>
            
            <div className="event-highlights">
              <div className="highlight-item">
                <div className="highlight-icon coding"></div>
                <span>Coding Challenges</span>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon hackathon"></div>
                <span>Hackathon</span>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon gaming"></div>
                <span>Gaming Arena</span>
              </div>
            </div>
          </div>
          
          <button className="register-btn">
            ENTER THE GAME
            <span className="btn-hover"></span>
          </button>
        </div>
      </div>

      {/* Front Man silhouette */}
      <div className={`front-man ${isVisible ? 'visible' : ''}`}></div>
      
      {/* Red Light, Green Light doll */}
      <div className={`doll ${isVisible ? 'visible' : ''}`}>
        <div className="doll-head"></div>
        <div className="doll-body"></div>
      </div>
    </div>
  );
};

export default DepInfoCL;