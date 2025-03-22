import React, { useEffect, useRef, useState } from 'react';
import './styles/HeroCL.css';
import SquidGameNavigation from './SquidGameNavigation';

const HeroCL = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const nextSectionRef = useRef(null);

  useEffect(() => {
    // Initialize animations
    const letters = textRef.current.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });

    // Handle scroll animation
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const container = containerRef.current;
      const text = textRef.current;
      
      if (container && text) {
        // Parallax effect for background
        container.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        
        // Text animation based on scroll
        const opacity = Math.max(0, Math.min(1, 1 - scrollPosition / 500));
        const scale = Math.max(0.8, Math.min(1, 1 - scrollPosition / 1000));
        const blur = Math.min(10, scrollPosition / 100);
        
        text.style.opacity = opacity;
        text.style.transform = `scale(${scale}) translateY(${scrollPosition * 0.2}px)`;
        text.style.filter = `blur(${blur}px)`;
        
        // Change text color based on scroll
        const hue = (scrollPosition / 10) % 360;
        text.style.textShadow = `0 0 10px hsla(${hue}, 100%, 50%, 0.8)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEnterClick = () => {
    const nextSection = document.querySelector('.navigation-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="hero-container" ref={containerRef}>
        <div className="overlay"></div>
        
        {/* Squid Game themed elements */}
        <div className="squid-elements">
          <div className="pink-soldier left"></div>
          <div className="pink-soldier right"></div>
        </div>
        
        <div className="content">
          <h1 className="hero-text" ref={textRef}>
            {Array.from("Would you like to play a game?").map((letter, index) => (
              <span key={index} className="letter">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
          <div className="glowing-btn" onClick={handleEnterClick}>
            <span>ENTER</span>
          </div>
        </div>
      </div>

      {/* Navigation section */}
      <div className="navigation-section" ref={nextSectionRef}>
        <SquidGameNavigation />
      </div>
    </>
  );
};

export default HeroCL;
