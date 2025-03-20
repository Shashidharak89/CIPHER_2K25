import React, { useEffect, useState } from 'react';
import './styles/EventTitle.css';

const EventTitle = () => {
  const [introAnimationActive, setIntroAnimationActive] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [finalState, setFinalState] = useState(false);
  
  useEffect(() => {
    // Start the intro animation sequence
    setTimeout(() => setIntroAnimationActive(true), 100);
    
    // Show the title dramatically during the animation
    setTimeout(() => setTitleVisible(true), 1500);
    
    // End the full-screen animation
    setTimeout(() => {
      setIntroAnimationActive(false);
      // Ensure the title remains visible
      setTitleVisible(true);
      // Transition to final state
      setTimeout(() => setFinalState(true), 500);
    }, 4000);
    
    return () => {
      // Clean up any timers if component unmounts
    };
  }, []);

  return (
    <div className='adjust-margin'>
      {/* Fullscreen overlay for intro animation */}
      <div className={`sqg_events_overlay ${introAnimationActive ? 'sqg_events_active' : ''}`}>
        {/* Animated shapes */}
        <div className="sqg_events_shapes_container">
          <div className="sqg_events_circle"></div>
          <div className="sqg_events_triangle"></div>
          <div className="sqg_events_square"></div>
          <div className="sqg_events_honeycomb"></div>
        </div>
        
        {/* Pink line effect */}
        <div className="sqg_events_pink_line"></div>
        
        {/* Animated guard masks */}
        <div className="sqg_events_guard_mask sqg_events_mask_1"></div>
        <div className="sqg_events_guard_mask sqg_events_mask_2"></div>
        
        {/* Glowing title that appears during animation */}
        <div className={`sqg_events_intro_title ${titleVisible ? 'sqg_events_title_visible' : ''}`}>
          <span className="sqg_events_intro_letter">E</span>
          <span className="sqg_events_intro_letter">V</span>
          <span className="sqg_events_intro_letter">E</span>
          <span className="sqg_events_intro_letter">N</span>
          <span className="sqg_events_intro_letter">T</span>
          <span className="sqg_events_intro_letter">S</span>
        </div>
        
        {/* Particle effects */}
        <div className="sqg_events_particles">
          {Array(20).fill().map((_, i) => (
            <div key={i} className="sqg_events_particle"></div>
          ))}
        </div>
      </div>
      
      {/* Final state of the component */}
      <div className={`sqg_events_final_container ${finalState ? 'sqg_events_final_active' : ''}`}>
        <div className="sqg_events_final_title">
          <div className="sqg_events_final_letter">E</div>
          <div className="sqg_events_final_letter">V</div>
          <div className="sqg_events_final_letter">E</div>
          <div className="sqg_events_final_letter">N</div>
          <div className="sqg_events_final_letter">T</div>
          <div className="sqg_events_final_letter">S</div>
        </div>
        
        <div className="sqg_events_final_decorations">
          <div className="sqg_events_final_circle"></div>
          <div className="sqg_events_final_triangle"></div>
          <div className="sqg_events_final_square"></div>
        </div>
        
        <div className="sqg_events_final_glow"></div>
      </div>
    </div>
  );
};

export default EventTitle;