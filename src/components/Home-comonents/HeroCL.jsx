import React, { useEffect, useRef, useState } from 'react';
import './styles/HeroCL.css';
// import SquidGameNav from './SquidGameNav';
import SquidGameNavigation from './SquidGameNavigation';

const HeroCL = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const nextSectionRef = useRef(null);
  const [showMasks, setShowMasks] = useState(false);

  useEffect(() => {
    // Initialize animations
    const letters = textRef.current.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });

    // Create floating shapes for background animation
    createFloatingShapes();

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

    // Create floating shapes for background animation
    function createFloatingShapes() {
      const container = containerRef.current;
      const shapesCount = 5;
      
      // Remove any existing shapes
      const existingShapes = container.querySelectorAll('.floating-shape');
      existingShapes.forEach(shape => shape.remove());
      
      for (let i = 0; i < shapesCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.animationDuration = `${10 + Math.random() * 20}s`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        
        // Randomly create circle or triangle or square
        const shapeType = Math.floor(Math.random() * 3);
        if (shapeType === 0) {
          shape.classList.add('circle');
        } else if (shapeType === 1) {
          shape.classList.add('triangle');
        } else {
          shape.classList.add('square');
        }
        
        container.appendChild(shape);
      }
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEnterClick = () => {
    setShowMasks(true);
    
    // After showing masks, scroll to next section
    setTimeout(() => {
      const nextSection = document.querySelector('.navigation-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
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
        
        {/* Squid Game masks animation */}
        <div className={`mask-container ${showMasks ? 'show' : ''}`}>
          <div className="front-man-mask"></div>
          <div className="circle-mask"></div>
          <div className="triangle-mask"></div>
          <div className="square-mask"></div>
        </div>
      </div>
      

      {/* <SquidGameNav/> */}
      {/* Navigation section */}
      <div className="navigation-section" ref={nextSectionRef}>
      <SquidGameNavigation/>

        {/* <div className="nav-container">
        
          <div className="nav-item">Games</div>
          <div className="nav-item">Players</div>
          <div className="nav-item">Rules</div>
          <div className="nav-item">Prizes</div>
          <div className="nav-item">Join</div>
        </div> */}
      </div>
    </>
  );
};

export default HeroCL;