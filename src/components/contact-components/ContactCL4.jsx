import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import './styles/ContactCL4.css';
import SubmitConfirmation from './SubmitConfirmation';
import SampleContext from '../contexts/SampleContext';

const ContactCL4 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    contact: '' // Changed from 'phone' to 'contact' to match API format
  });

  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const contactRef = useRef(null);

  const {URL}=useContext(SampleContext);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setIsIntroPlaying(false);
    }, 4000);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL+'/api/contact/contact', formData);
      console.log('Response:', response.data);

      // Show confirmation message
      setShowConfirmation(true);

      // Reset form fields
      setFormData({ name: '', email: '', message: '', contact: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }
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
                  <p>Location:Department of BCA, SHC</p>
                  <p>Date: April 09, 2025</p>
                  <p>Email: cipher2k25shc@gmail.com</p>
                  <p>Phone ( TECHNICAL SUPPORT ): <br />
                    +91 7760770725 <br />
                    +91 9481437620 <br />
                    </p>
                    
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
                    name="contact"  // Updated name to match API request format
                    value={formData.contact}
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

      {/* Confirmation Popup */}
      <SubmitConfirmation isVisible={showConfirmation} onClose={handleCloseConfirmation} />
    </div>
  );
};

export default ContactCL4;
