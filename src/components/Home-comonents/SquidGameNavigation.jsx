import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles/SquidGameNavigation.css';

const SquidGameNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showMask, setShowMask] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const navigationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the navigation component enters the viewport
        if (entry.isIntersecting && !animationTriggered) {
          setAnimationTriggered(true);
          setShowMask(true);
          
          // Delay the visibility of navigation items
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, 1500);
          
          // Show mask animation first, then hide it
          const maskTimer = setTimeout(() => {
            setShowMask(false);
          }, 3000);
          
          return () => {
            clearTimeout(timer);
            clearTimeout(maskTimer);
          };
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );
    
    if (navigationRef.current) {
      observer.observe(navigationRef.current);
    }
    
    return () => {
      if (navigationRef.current) {
        observer.unobserve(navigationRef.current);
      }
    };
  }, [animationTriggered]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Reset after animation completes
    setTimeout(() => {
      setSelectedOption(null);
    }, 500);
  };

  const navOptions = [
    { name: 'Events', path: '/events', shape: 'circle' },
    { name: 'About', path: '/about', shape: 'triangle' },
    { name: 'Contact', path: '/contact', shape: 'square' },
    { name: 'Registration', path: '/register', shape: 'umbrella' }
  ];

  // Generate background elements
  const renderBackgroundElements = () => {
    const elements = [];
    const shapes = ['circle', 'triangle', 'square', 'umbrella'];
    
    // Create 15 random elements
    for (let i = 0; i < 15; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.floor(Math.random() * 30) + 20; // 20px to 50px
      const left = Math.floor(Math.random() * 90) + 5; // 5% to 95%
      const delay = Math.random() * 5; // 0 to 5s delay
      const duration = Math.random() * 15 + 10; // 10s to 25s duration
      
      elements.push(
        <div 
          key={i}
          className={`background-element bg-${shape}`}
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    }
    
    return elements;
  };

  return (
    <div className="squid-game-navigation" ref={navigationRef}>
      {/* Animated background elements */}
      <div className="squid-game-background">
        {renderBackgroundElements()}
        <div className="spotlight spotlight-1"></div>
        <div className="spotlight spotlight-2"></div>
      </div>
      
      {showMask && (
        <div className="squid-game-mask">
          <div className="squid-game-mask-circle"></div>
          <div className="squid-game-mask-triangle"></div>
          <div className="squid-game-mask-square"></div>
        </div>
      )}
      
      <div className={`squid-game-navigation-container ${isVisible ? 'visible' : ''}`}>
        {navOptions.map((option, index) => (
          <Link
            to={option.path}
            key={option.name}
            className={`squid-game-navigation-item ${option.shape} ${selectedOption === option.name ? 'clicked' : ''}`}
            onClick={() => handleOptionClick(option.name)}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="squid-game-navigation-icon">
              {option.shape === 'circle' && <div className="shape-circle"></div>}
              {option.shape === 'triangle' && <div className="shape-triangle"></div>}
              {option.shape === 'square' && <div className="shape-square"></div>}
              {option.shape === 'umbrella' && <div className="shape-umbrella"></div>}
            </div>
            <span className="squid-game-navigation-text">{option.name}</span>
          </Link>
        ))}
      </div>
      
      <div className="squid-game-doll">
        <div className="squid-game-doll-head"></div>
        <div className="squid-game-doll-body"></div>
      </div>
      
      {/* Falling money particles */}
      <div className="money-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="money-particle" style={{ 
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 5 + 8}s`
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default SquidGameNavigation;