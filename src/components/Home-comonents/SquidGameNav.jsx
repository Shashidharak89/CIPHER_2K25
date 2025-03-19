import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './styles/SquidGameNav.css';

const SquidGameNav = () => {
  const navRef = useRef(null);
  const optionsRef = useRef([]);
  const maskRef = useRef(null);
  const circleRef = useRef(null);

  const navOptions = [
    { name: 'Events', path: '/events', color: '#ff2d55' },
    { name: 'About', path: '/about', color: '#28cdff' },
    { name: 'Contact', path: '/contact', color: '#ffd60a' },
    { name: 'Registration', path: '/registration', color: '#7c3aed' },
  ];

  useEffect(() => {
    // Initial mask animation
    gsap.set(maskRef.current, { scaleY: 1 });
    
    // Circle animation
    gsap.set(circleRef.current, { scale: 0 });
    
    // Timeline for entrance animation
    const tl = gsap.timeline();
    
    tl.to(maskRef.current, {
      scaleY: 0,
      duration: 1.5,
      ease: "power4.inOut",
      transformOrigin: "top"
    })
    .to(circleRef.current, {
      scale: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)"
    }, "-=0.5")
    .from(navRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.7");
    
    // Stagger the options entrance
    tl.fromTo(
      optionsRef.current,
      { 
        y: 40, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );
    
    // Add hover animations for each option
    optionsRef.current.forEach((option) => {
      option.addEventListener('mouseenter', () => {
        gsap.to(option, {
          scale: 1.1,
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          duration: 0.3
        });
        
        gsap.to(option.querySelector('.option-icon'), {
          rotate: 360,
          duration: 0.5
        });
      });
      
      option.addEventListener('mouseleave', () => {
        gsap.to(option, {
          scale: 1,
          boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
          duration: 0.3
        });
        
        gsap.to(option.querySelector('.option-icon'), {
          rotate: 0,
          duration: 0.5
        });
      });
    });
    
    return () => {
      // Clean up event listeners
      optionsRef.current.forEach((option) => {
        option?.removeEventListener('mouseenter', () => {});
        option?.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div className="squid-game-container">
      {/* Entrance mask */}
      <div ref={maskRef} className="entrance-mask"></div>
      
      {/* Squid Game circle */}
      <div ref={circleRef} className="squid-circle">
        <div className="triangle"></div>
        <div className="square"></div>
        <div className="circle"></div>
      </div>
      
      <nav ref={navRef} className="squid-game-nav">
        <div className="nav-title">Choose Your Game</div>
        <div className="nav-options">
          {navOptions.map((option, index) => (
            <Link 
              to={option.path} 
              key={index}
              ref={el => optionsRef.current[index] = el}
              className="nav-option"
              style={{ '--accent-color': option.color }}
            >
              <div className="option-content">
                <div className="option-icon">
                  {index === 0 && <div className="icon-events"></div>}
                  {index === 1 && <div className="icon-about"></div>}
                  {index === 2 && <div className="icon-contact"></div>}
                  {index === 3 && <div className="icon-registration"></div>}
                </div>
                <div className="option-text">{option.name}</div>
              </div>
              <div className="option-number">
                <span className="number-text">{index + 1}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SquidGameNav;