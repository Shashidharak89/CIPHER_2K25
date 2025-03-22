import React, { useEffect, useRef, useState } from 'react';
import './styles/AboutCL3.css';

const AboutCL3 = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const shapeRefs = useRef([]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      titleRef.current.classList.add('cipher_title_appear');
    }

    // Content fade in
    if (contentRef.current) {
      contentRef.current.classList.add('cipher_content_fade_in');
    }

    // Random movement for shapes
    const moveShapes = () => {
      shapeRefs.current.forEach((shape) => {
        if (shape) {
          const randomX = Math.random() * 10 - 5;
          const randomY = Math.random() * 10 - 5;
          const randomRotate = Math.random() * 20 - 10;
          
          shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }
      });
    };

    // Countdown timer
    const targetDate = new Date('April 9, 2025 00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    const interval = setInterval(moveShapes, 3000);
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Initial countdown update
    updateCountdown();
    
    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="cipher_main_container">
      <div className="cipher_background_overlay"></div>
      
      {/* Floating shapes for visual interest */}
      <div className="cipher_floating_shapes">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            ref={(el) => shapeRefs.current[index] = el}
            className={`cipher_shape cipher_shape_${index + 1}`}
          ></div>
        ))}
      </div>

      <div className="cipher_content_wrapper">
        <div className="cipher_title_container" ref={titleRef}>
          <div className="cipher_title_box">
            <h1 className="cipher_main_title">CIPHER <span className="cipher_year_accent">2K25</span></h1>
            <div className="cipher_subtitle">BCA DEPARTMENT FEST</div>
          </div>
          <div className="cipher_squid_mask">
            <div className="cipher_mask_circle"></div>
            <div className="cipher_mask_triangle"></div>
            <div className="cipher_mask_square"></div>
          </div>
        </div>

        <div className="cipher_content_container" ref={contentRef}>
          <div className="cipher_about_section">
            <h2 className="cipher_section_heading">WELCOME TO THE GAME</h2>
            <p className="cipher_description">
              Cipher 2K25 is not just a fest—it's a challenge. Inspired by the intense world of Squid Game, 
              we bring you a technical extravaganza where only the most skilled survive.
            </p>
            
            <p className="cipher_description">
              Our annual BCA department fest transforms the campus into a battleground of intellect, 
              coding Progress, and technical innovation. With high stakes competitions, mind-bending puzzles, 
              and cutting-edge showcases, Cipher 2K25 tests your limits while celebrating the digital revolution.
            </p>
            
            <div className="cipher_features_grid">
              <div className="cipher_feature_card">
                <div className="cipher_feature_icon cipher_icon_code"></div>
                <h3 className="cipher_feature_title">BINARY RIVALS</h3>
                <p className="cipher_feature_text">Algorithmic showdowns where only the fastest survive</p>
              </div>
              
              <div className="cipher_feature_card">
                <div className="cipher_feature_icon cipher_icon_hack"></div>
                <h3 className="cipher_feature_title">BYTE BLITZ</h3>
                <p className="cipher_feature_text">48-hour sprint to build revolutionary solutions</p>
              </div>
              
              <div className="cipher_feature_card">
                <div className="cipher_feature_icon cipher_icon_game"></div>
                <h3 className="cipher_feature_title">DIGITAL COLOSSEUM</h3>
                <p className="cipher_feature_text">Competitive gaming with tech-inspired twists</p>
              </div>
              
              <div className="cipher_feature_card">
                <div className="cipher_feature_icon cipher_icon_tech"></div>
                <h3 className="cipher_feature_title">INNOVATION NEXUS</h3>
                <p className="cipher_feature_text">Showcase of innovative projects and prototypes</p>
              </div>
            </div>
          </div>
          
          <div className="cipher_countdown_container">
            <div className="cipher_countdown_title">THE GAMES BEGIN IN</div>
            <div className="cipher_countdown_timer">
              <div className="cipher_time_unit">
                <div className="cipher_time_value">{countdown.days.toString().padStart(2, '0')}</div>
                <div className="cipher_time_label">DAYS</div>
              </div>
              <div className="cipher_time_separator"></div>
              <div className="cipher_time_unit">
                <div className="cipher_time_value">{countdown.hours.toString().padStart(2, '0')}</div>
                <div className="cipher_time_label">HOURS</div>
              </div>
              <div className="cipher_time_separator"></div>
              <div className="cipher_time_unit">
                <div className="cipher_time_value">{countdown.minutes.toString().padStart(2, '0')}</div>
                <div className="cipher_time_label">MINUTES</div>
              </div>
              <div className="cipher_time_separator"></div>
              <div className="cipher_time_unit">
                <div className="cipher_time_value">{countdown.seconds.toString().padStart(2, '0')}</div>
                <div className="cipher_time_label">SECONDS</div>
              </div>
            </div>
            
            <button className="cipher_join_button">
              <span className="cipher_button_text">JOIN THE GAME</span>
              <span className="cipher_button_highlight"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCL3;