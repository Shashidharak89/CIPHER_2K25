import React, { useEffect, useRef, useState } from 'react';
import './styles/HeroCL.css';

const HeroCL = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const particlesRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const nextSectionRef = useRef(null);

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const heroHeight = containerRef.current.offsetHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    });
  };

  // Create particle animation similar to Three.js effects
  useEffect(() => {
    const createParticles = () => {
      const particleCount = 50;
      const newParticles = [];

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.5 + 0.2
        });
      }

      setParticles(newParticles);
    };

    createParticles();

    // Animation loop for particles
    let animationId;
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update particle position
          let x = particle.x + particle.speedX;
          let y = particle.y + particle.speedY;
          
          // Bounce off edges
          if (x > window.innerWidth || x < 0) {
            particle.speedX *= -1;
            x = particle.x + particle.speedX;
          }
          
          if (y > window.innerHeight || y < 0) {
            particle.speedY *= -1;
            y = particle.y + particle.speedY;
          }
          
          return {
            ...particle,
            x,
            y
          };
        })
      );
      
      animationId = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    // Clean up animation
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
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
    
    // Initialize animations
    const letters = textRef.current.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="hero-container" ref={containerRef}>
        <div className="particles-container" ref={particlesRef}>
          {particles.map(particle => (
            <div 
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity
              }}
            />
          ))}
        </div>
        <div className="overlay"></div>
        <div className="content">
          <h1 className="hero-text" ref={textRef}>
            {Array.from("Would you like to play a game?").map((letter, index) => (
              <span key={index} className="letter">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
          <div className="glowing-btn" onClick={scrollToNextSection}>
            <span>ENTER</span>
          </div>
        </div>
        <div className="cube-container">
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      </div>
      <div className="next-section" ref={nextSectionRef}>
        {/* This is where your next section content would go */}
        <h2>Next Section Content</h2>
        <p>This is the section that appears after the hero.</p>
      </div>
    </>
  );
};

export default HeroCL;