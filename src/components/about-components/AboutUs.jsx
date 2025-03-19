import React, { useEffect, useState } from 'react';
import './styles/AboutUs.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      const shapes = document.querySelectorAll('.cipher-floating-shape');
      shapes.forEach(shape => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`cipher-about-container ${isVisible ? 'cipher-visible' : ''}`}>
      <div className="cipher-floating-objects">
        {[...Array(20)].map((_, index) => (
          <div 
            key={index} 
            className="cipher-floating-shape"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              backgroundColor: index % 3 === 0 ? '#FF0067' : index % 3 === 1 ? '#00FF94' : '#ffffff'
            }}
          />
        ))}
      </div>
      
      <div className="cipher-mask-overlay"></div>
      
      <div className="cipher-card">
        <div className="cipher-card-triangle"></div>
        <div className="cipher-card-circle"></div>
        <div className="cipher-card-square"></div>
        
        <div className="cipher-content">
          <h1 className="cipher-title">CIPHER <span className="cipher-year">2K25</span></h1>
          <div className="cipher-divider"></div>
          
          <div className="cipher-squid-container">
            <div className="cipher-squid-shapes">
              <div className="cipher-triangle"></div>
              <div className="cipher-circle"></div>
              <div className="cipher-square"></div>
            </div>
          </div>
          
          <h2 className="cipher-subtitle">About Us</h2>
          
          <p className="cipher-description">
            Welcome to CIPHER 2K25, the ultimate IT fest inspired by the thrilling world of Squid Game!
            Join us for an exhilarating competition where your technical skills will be put to the test.
          </p>
          
          <p className="cipher-description">
            Hosted by the Department of Computer Applications at Sacred Heart College, Madanthyar, 
            CIPHER promises to be a game-changing experience filled with challenges, innovation, and excitement.
          </p>
          
          <div className="cipher-college-info">
            <h3 className="cipher-college-name">Sacred Heart College, Madanthyar</h3>
            <p className="cipher-department">Presented by Department of Computer Applications</p>
          </div>
          
          <div className="cipher-button-container">
            <button className="cipher-button">
              <span className="cipher-button-text">Join the Game</span>
              <span className="cipher-button-hover"></span>
            </button>
            <button className="cipher-button cipher-button-secondary">
              <span className="cipher-button-text">Learn More</span>
              <span className="cipher-button-hover"></span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="cipher-frontman">
        <div className="cipher-frontman-mask"></div>
      </div>
      
      <div className="cipher-players">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="cipher-player" style={{
            left: `${index * 20}%`,
            animationDelay: `${index * 0.3}s`
          }}>
            <div className="cipher-player-body"></div>
            <div className="cipher-player-number">{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;