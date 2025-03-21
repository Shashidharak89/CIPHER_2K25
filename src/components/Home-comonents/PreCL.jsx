// PreCL.jsx
import React, { useEffect, useState, useRef } from 'react';
import './styles/PreCL.css';

const PreCL = () => {
  const [active, setActive] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const preloaderRef = useRef(null);
  const triangleRef = useRef(null);
  const circleRef = useRef(null);
  const squareRef = useRef(null);
  
  useEffect(() => {
    // Show preloader for 3 seconds
    setShowContent(true);
    
    const timer = setTimeout(() => {
      setActive(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Add scroll listener
    const handleScroll = () => {
      if (preloaderRef.current && isElementInViewport(preloaderRef.current)) {
        setShowContent(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  if (!active) return null;
  
  return (
    <div ref={preloaderRef} className={`cipher_preloader_container ${showContent ? 'cipher_show' : ''}`}>
      <div className="cipher_content_wrapper">
        <div className="cipher_logo_container">
          <div ref={triangleRef} className="cipher_shape cipher_triangle"></div>
          <div ref={circleRef} className="cipher_shape cipher_circle"></div>
          <div ref={squareRef} className="cipher_shape cipher_square"></div>
        </div>
        
        <div className="cipher_text_container">
          <h1 className="cipher_title">CIPHER <span className="cipher_year">2K25</span></h1>
          <p className="cipher_slogan">Decrypt the Code, Survive the Game</p>
          
          <div className="cipher_masked_players">
            <div className="cipher_player cipher_player_1"></div>
            <div className="cipher_player cipher_player_2"></div>
            <div className="cipher_player cipher_player_3"></div>
          </div>
        </div>
        
        <div className="cipher_countdown">
          <div className="cipher_counter">3</div>
          <div className="cipher_counter">2</div>
          <div className="cipher_counter">1</div>
          <div className="cipher_begin">BEGIN</div>
        </div>
        
        <div className="cipher_department">
          <span>BCA Department Presents</span>
        </div>
      </div>
    </div>
  );
};

export default PreCL;