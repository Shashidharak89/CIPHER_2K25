import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AboutCL4.css';

const AboutCL4 = () => {
  const navigate = useNavigate();
  const circleRef = useRef(null);
  const triangleRef = useRef(null);
  const squareRef = useRef(null);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    // Animation for shapes
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cipher__shape-visible');
        }
      });
    }, { threshold: 0.1 });
    
    if (circleRef.current) observer.observe(circleRef.current);
    if (triangleRef.current) observer.observe(triangleRef.current);
    if (squareRef.current) observer.observe(squareRef.current);
    
    return () => {
      if (circleRef.current) observer.unobserve(circleRef.current);
      if (triangleRef.current) observer.unobserve(triangleRef.current);
      if (squareRef.current) observer.unobserve(squareRef.current);
    };
  }, []);
  
  useEffect(() => {
    // Set the target date - April 9, 2025
    const targetDate = new Date('April 9, 2025 00:00:00').getTime();
    
    // Update countdown every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference < 0) {
        // If the date has passed
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle registration button click
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="cipher__about-container">
      <div className="cipher__shape-container">
        <div className="cipher__circle" ref={circleRef}></div>
        <div className="cipher__triangle" ref={triangleRef}></div>
        <div className="cipher__square" ref={squareRef}></div>
      </div>
      
      <div className="cipher__content-wrapper">
        <h1 className="cipher__main-title">CIPHER <span className="cipher__highlight">2K25</span></h1>
        <h2 className="cipher__subtitle">BCA Department's Annual Tech Fest</h2>
        
        <div className="cipher__divider"></div>
        
        <div className="cipher__about-content">
          <p className="cipher__text-block">
            Welcome to <span className="cipher__highlight">CIPHER 2K25</span>, where technology meets the thrilling world of Squid Game! This year, our BCA department brings you a gaming-inspired tech fest that pushes boundaries and challenges participants like never before.
          </p>
          
          <p className="cipher__text-block">
            Each event is designed to test your technical prowess, problem-solving skills, and ability to perform under pressure – just like the contestants in the iconic series. But don't worry, the only elimination here is from the competition leaderboards!
          </p>
          
          <div className="cipher__card-container">
            <div className="cipher__info-card cipher__card-animate">
              <h3 className="cipher__card-title">Technical Challenges</h3>
              <p className="cipher__card-text">
                From coding battles to hackathons, experience the adrenaline of competing in high-stakes technical challenges.
              </p>
            </div>
            
            <div className="cipher__info-card cipher__card-animate" style={{ animationDelay: '0.2s' }}>
              <h3 className="cipher__card-title">Workshops & Seminars</h3>
              <p className="cipher__card-text">
                Learn from industry experts and gain insights into cutting-edge technologies that shape our digital future.
              </p>
            </div>
            
            <div className="cipher__info-card cipher__card-animate" style={{ animationDelay: '0.4s' }}>
              <h3 className="cipher__card-title">Gaming Arena</h3>
              <p className="cipher__card-text">
                Test your gaming skills in our specially themed arenas inspired by the challenges from the series.
              </p>
            </div>
          </div>
          
          <p className="cipher__text-block cipher__text-highlight">
            Join us for three days of innovation, competition, and technological marvels. Are you ready to play?
          </p>
          
          <div className="cipher__countdown-container">
            <h3 className="cipher__countdown-title">The Games Begin On April 9, 2025:</h3>
            <div className="cipher__timer">
              <div className="cipher__time-unit">
                <span className="cipher__time-number">{timeLeft.days}</span>
                <span className="cipher__time-label">DAYS</span>
              </div>
              <div className="cipher__time-unit">
                <span className="cipher__time-number">{timeLeft.hours}</span>
                <span className="cipher__time-label">HOURS</span>
              </div>
              <div className="cipher__time-unit">
                <span className="cipher__time-number">{timeLeft.minutes}</span>
                <span className="cipher__time-label">MINS</span>
              </div>
              <div className="cipher__time-unit">
                <span className="cipher__time-number">{timeLeft.seconds}</span>
                <span className="cipher__time-label">SECS</span>
              </div>
            </div>
          </div>
          
          <div className="cipher__cta-container">
            <button 
              className="cipher__register-button"
              onClick={handleRegisterClick}
            >
              REGISTER NOW
              <div className="cipher__button-glow"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCL4;