import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/DepInfoCL2.css';

const DepInfoCL2 = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add('cipher-section-visible');
          } else {
            entry.target.classList.remove('cipher-section-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleRegisterClick = () => {
    setIsButtonAnimating(true);
    
    // Create particles effect
    const button = document.querySelector('.cipher-button');
    const buttonRect = button.getBoundingClientRect();
    const particles = 20;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('cipher-particle');
      
      // Random position around button
      const x = buttonRect.left + buttonRect.width / 2;
      const y = buttonRect.top + buttonRect.height / 2;
      
      // Random size
      const size = Math.random() * 10 + 5;
      
      // Random color
      const colors = ['#ff0080', '#00ff85', '#476eff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Set styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      // Add to DOM
      document.body.appendChild(particle);
      
      // Animate
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const xVelocity = Math.cos(angle) * velocity;
      const yVelocity = Math.sin(angle) * velocity;
      
      setTimeout(() => {
        particle.style.transform = `translate(${xVelocity}px, ${yVelocity}px) scale(0)`;
        particle.style.opacity = '0';
      }, 0);
      
      // Remove after animation
      setTimeout(() => {
        document.body.removeChild(particle);
      }, 1000);
    }
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate('/register');
    }, 800);
  };
  
  return (
    <section ref={sectionRef} className="cipher-section">
      <div className="cipher-bg-elements">
        {/* Squid Game inspired moving objects */}
        <div className="cipher-circle"></div>
        <div className="cipher-triangle"></div>
        <div className="cipher-square"></div>
        <div className="cipher-diamond"></div>
        <div className="cipher-masked-guard">
          <div className="cipher-guard-mask"></div>
          <div className="cipher-guard-body"></div>
        </div>
        <div className="cipher-masked-guard cipher-guard-alt">
          <div className="cipher-guard-mask"></div>
          <div className="cipher-guard-body"></div>
        </div>
        {/* Background particles */}
        {isVisible && Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index} 
            className="cipher-bg-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="cipher-content-container">
        <div className="cipher-logo">
          <span className="cipher-logo-text">CIPHER</span>
          <span className="cipher-logo-year">2K25</span>
          <div className="cipher-logo-decoration"></div>
        </div>
        
        <div className="cipher-info">
          <h2 className="cipher-title">Welcome to the Games</h2>
          <div className="cipher-description">
            <p className="cipher-text">An electrifying IT fest hosted by the Department of BCA</p>
            <p className="cipher-text">Sacred Heart College, Madanthyar</p>
            <p className="cipher-tagline">Are you ready to play?</p>
          </div>
          
          <div className="cipher-details">
            <div className="cipher-detail-item">
              <div className="cipher-detail-icon cipher-icon-calendar"></div>
              <span className="cipher-detail-text">09-04-2025</span>
            </div>
            <div className="cipher-detail-item">
              <div className="cipher-detail-icon cipher-icon-location"></div>
              <span className="cipher-detail-text">SHC Campus</span>
            </div>
            <div className="cipher-detail-item">
              <div className="cipher-detail-icon cipher-icon-ticket"></div>
              <span className="cipher-detail-text">Limited Entries</span>
            </div>
          </div>
          
          <button 
            className={`cipher-button ${isButtonAnimating ? 'cipher-button-animating' : ''}`}
            onClick={handleRegisterClick}
            disabled={isButtonAnimating}
          >
            <span className="cipher-button-text">Register Now</span>
            <span className="cipher-button-hover"></span>
            <span className="cipher-button-glow"></span>
          </button>
        </div>
        
        <div className="cipher-shapes-container">
          <div className="cipher-shape cipher-shape-circle"></div>
          <div className="cipher-shape cipher-shape-triangle"></div>
          <div className="cipher-shape cipher-shape-square"></div>
        </div>
      </div>
    </section>
  );
};

export default DepInfoCL2;