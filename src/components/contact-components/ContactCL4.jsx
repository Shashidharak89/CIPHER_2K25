import React, { useState, useEffect, useRef } from 'react';
import './styles/ContactCL4.css';
import SubmitConfirmation from './SubmitConfirmation';

const ContactCL4 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const contactRef = useRef(null);
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);

  useEffect(() => {
    // Animation intro timer
    const introTimer = setTimeout(() => {
      setIsIntroPlaying(false);
    }, 4000);

    // Intersection observer for scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      clearTimeout(introTimer);
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Show confirmation instead of alert
    setShowConfirmation(true);
    // Reset form
    setFormData({ name: '', email: '', message: '', phone: '' });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="cipher_contact_wrapper" ref={contactRef}>
      {isIntroPlaying && (
        <div className="cipher_intro_animation">
          <div className="cipher_triangle"></div>
          <div className="cipher_circle"></div>
          <div className="cipher_square"></div>
          <div className="cipher_text_reveal">CIPHER 2K25</div>
          <div className="cipher_subtitle_reveal">GAME ON</div>
        </div>
      )}

      <div className={`cipher_contact_container ${isVisible ? 'cipher_visible' : ''} ${isIntroPlaying ? 'cipher_hidden' : ''}`}>
        <div className="cipher_contact_mask">
          <div className="cipher_mask_design"></div>
        </div>
        
        <div className="cipher_content_section">
          <div className="cipher_heading_container">
            <h2 className="cipher_contact_title">Contact The Front Man</h2>
            <div className="cipher_red_light"></div>
          </div>
          
          <div className="cipher_contact_content">
            <div className="cipher_info_section">
              <p className="cipher_event_info">
                Join Cipher 2K25 - Where Code Meets Game
              </p>
              <div className="cipher_card">
                <div className="cipher_card_symbol"></div>
                <div className="cipher_card_details">
                  <p>Location: BCA Department</p>
                  <p>Date: March 25-27, 2025</p>
                  <p>Email: frontman@cipher2k25.edu</p>
                  <p>Phone: +91 9876543210</p>
                </div>
              </div>

              <div className="cipher_pink_soldiers">
                <div className="cipher_soldier cipher_soldier1"></div>
                <div className="cipher_soldier cipher_soldier2"></div>
              </div>
            </div>

            <div className="cipher_form_section">
              <form onSubmit={handleSubmit} className="cipher_contact_form">
                <div className="cipher_form_group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="cipher_input"
                    placeholder="Player Name"
                    required
                  />
                </div>
                
                <div className="cipher_form_group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="cipher_input"
                    placeholder="Player Number (Email)"
                    required
                  />
                </div>
                
                <div className="cipher_form_group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="cipher_input"
                    placeholder="Contact Number"
                  />
                </div>
                
                <div className="cipher_form_group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="cipher_textarea"
                    placeholder="Your Message to The Front Man"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="cipher_submit_btn">
                  <span className="cipher_btn_text">Send Message</span>
                  <span className="cipher_btn_icon"></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the confirmation component */}
      <SubmitConfirmation 
        isVisible={showConfirmation} 
        onClose={handleCloseConfirmation} 
      />
    </div>
  );
};

export default ContactCL4;