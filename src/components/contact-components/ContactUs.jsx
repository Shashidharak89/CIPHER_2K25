import React, { useState, useEffect } from 'react';
import './styles/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    event: 'coding'
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    // Generate random background shapes
    const shapeCount = 30;
    const newShapes = [];
    
    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        shape: Math.random() > 0.5 ? 'circle' : 'triangle',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 10 + Math.random() * 30,
        speed: 0.5 + Math.random() * 2,
        direction: Math.random() * 2 * Math.PI
      });
    }
    
    setShapes(newShapes);
    
    // Animation interval for shapes
    const interval = setInterval(() => {
      setShapes(prevShapes => 
        prevShapes.map(shape => {
          const xMovement = Math.cos(shape.direction) * shape.speed;
          const yMovement = Math.sin(shape.direction) * shape.speed;
          
          let newX = shape.x + xMovement * 0.1;
          let newY = shape.y + yMovement * 0.1;
          let newDirection = shape.direction;
          
          // Bounce off edges
          if (newX < 0 || newX > 100) {
            newDirection = Math.PI - newDirection;
            newX = Math.max(0, Math.min(100, newX));
          }
          
          if (newY < 0 || newY > 100) {
            newDirection = -newDirection;
            newY = Math.max(0, Math.min(100, newY));
          }
          
          return {
            ...shape,
            x: newX,
            y: newY,
            direction: newDirection
          };
        })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: '',
        event: 'coding'
      });
    }, 3000);
  };

  return (
    <div className="cipher_contact_container">
      {/* Background shapes */}
      <div className="cipher_background_shapes">
        {shapes.map(shape => (
          <div 
            key={shape.id}
            className={`cipher_shape ${shape.shape === 'circle' ? 'cipher_circle' : 'cipher_triangle'}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: shape.shape === 'circle' ? `${shape.size}px` : `${shape.size * 0.866}px`
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="cipher_content_wrapper">
        <div className="cipher_left_panel">
          <div className="cipher_logo_container">
            <div className="cipher_squid_mask"></div>
            <h1 className="cipher_title">CIPHER <span className="cipher_year">2K25</span></h1>
          </div>
          
          <div className="cipher_info_section">
            <div className="cipher_info_item">
              <div className="cipher_shape_indicator cipher_circle"></div>
              <p>Join the game at Example University</p>
            </div>
            <div className="cipher_info_item">
              <div className="cipher_shape_indicator cipher_triangle"></div>
              <p>cipher2k25@example.com</p>
            </div>
            <div className="cipher_info_item">
              <div className="cipher_shape_indicator cipher_square"></div>
              <p>+1 234 567 8901</p>
            </div>
          </div>
          
          <div className="cipher_social_links">
            <a href="#" className="cipher_social_icon cipher_instagram"></a>
            <a href="#" className="cipher_social_icon cipher_twitter"></a>
            <a href="#" className="cipher_social_icon cipher_facebook"></a>
          </div>
        </div>
        
        <div className="cipher_right_panel">
          <div className={`cipher_form_container ${isSubmitted ? 'cipher_submitted' : ''}`}>
            <h2 className="cipher_form_title">
              {isSubmitted ? 'Your number has been chosen!' : 'Enter the game'}
            </h2>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="cipher_contact_form">
                <div className="cipher_input_group">
                  <input 
                    type="text" 
                    name="name" 
                    id="cipher_name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="cipher_form_input"
                  />
                  <label htmlFor="cipher_name" className="cipher_form_label">Player Name</label>
                </div>
                
                <div className="cipher_input_group">
                  <input 
                    type="email" 
                    name="email" 
                    id="cipher_email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="cipher_form_input"
                  />
                  <label htmlFor="cipher_email" className="cipher_form_label">Player ID (Email)</label>
                </div>
                
                <div className="cipher_input_group">
                  <select 
                    name="event" 
                    id="cipher_event" 
                    value={formData.event}
                    onChange={handleChange}
                    className="cipher_form_input cipher_select"
                  >
                    <option value="coding">Coding Challenge</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="ctf">Capture The Flag</option>
                    <option value="quiz">Technical Quiz</option>
                    <option value="gaming">Gaming Tournament</option>
                  </select>
                  <label htmlFor="cipher_event" className="cipher_form_label cipher_select_label">Choose Your Game</label>
                </div>
                
                <div className="cipher_input_group">
                  <textarea 
                    name="message" 
                    id="cipher_message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="cipher_form_input cipher_textarea"
                  ></textarea>
                  <label htmlFor="cipher_message" className="cipher_form_label">Your Message</label>
                </div>
                
                <button type="submit" className="cipher_submit_btn">
                  <span className="cipher_btn_text">Submit</span>
                  <span className="cipher_btn_icon"></span>
                </button>
              </form>
            ) : (
              <div className="cipher_success_message">
                <div className="cipher_success_icon"></div>
                <p className="cipher_success_text">Thank you for joining CIPHER 2K25!</p>
                <p className="cipher_success_subtext">We'll contact you soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;