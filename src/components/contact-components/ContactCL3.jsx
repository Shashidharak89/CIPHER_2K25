import React, { useState, useEffect } from 'react';
import './styles/ContactCL3.css';

const ContactCL3 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    department: 'BCA'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [trianglePosition, setTrianglePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTrianglePosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="cipher_contact_container">
      <div className="cipher_squid_shapes">
        <div className="cipher_triangle" style={{ left: `${trianglePosition.x}%`, top: `${trianglePosition.y}%` }}></div>
        <div className="cipher_circle"></div>
        <div className="cipher_square"></div>
      </div>
      
      <div className="cipher_contact_content">
        <div className="cipher_contact_header">
          <h1 className="cipher_title">CONTACT <span className="cipher_highlight">US</span></h1>
          <p className="cipher_subtitle">Cipher 2k25 • BCA Department</p>
          <div className="cipher_divider">
            <div className="cipher_circle_divider"></div>
            <div className="cipher_triangle_divider"></div>
            <div className="cipher_square_divider"></div>
          </div>
        </div>
        
        {!isSubmitted ? (
          <form className="cipher_contact_form" onSubmit={handleSubmit}>
            <div className="cipher_form_group">
              <input
                type="text"
                name="name"
                className="cipher_input"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <div className="cipher_input_line"></div>
            </div>
            
            <div className="cipher_form_group">
              <input
                type="email"
                name="email"
                className="cipher_input"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="cipher_input_line"></div>
            </div>
            
            <div className="cipher_form_group">
              <input
                type="tel"
                name="phone"
                className="cipher_input"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="cipher_input_line"></div>
            </div>
            
            <div className="cipher_form_group">
              <textarea
                name="message"
                className="cipher_textarea"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <div className="cipher_input_line"></div>
            </div>
            
            <button 
              type="submit" 
              className="cipher_submit_btn"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="cipher_button_text">SUBMIT</span>
              <span className={`cipher_button_mask ${isHovered ? 'cipher_button_mask_hover' : ''}`}></span>
            </button>
          </form>
        ) : (
          <div className="cipher_success_message">
            <div className="cipher_success_icon">
              <div className="cipher_checkmark"></div>
            </div>
            <h2 className="cipher_success_text">Message Sent!</h2>
            <p className="cipher_success_subtext">We'll respond to you shortly</p>
          </div>
        )}
      </div>
      
      <div className="cipher_contact_info">
        <div className="cipher_info_card">
          <div className="cipher_info_icon cipher_location_icon"></div>
          <h3 className="cipher_info_title">Location</h3>
          <p className="cipher_info_text">BCA Department, College Campus</p>
        </div>
        
        <div className="cipher_info_card">
          <div className="cipher_info_icon cipher_email_icon"></div>
          <h3 className="cipher_info_title">Email</h3>
          <p className="cipher_info_text">cipher2k25@bcadept.edu</p>
        </div>
        
        <div className="cipher_info_card">
          <div className="cipher_info_icon cipher_phone_icon"></div>
          <h3 className="cipher_info_title">Phone</h3>
          <p className="cipher_info_text">+91 9876543210</p>
        </div>
      </div>
      
      <div className="cipher_footer">
        <p className="cipher_footer_text">© Cipher 2k25 - BCA Department</p>
        <p className="cipher_footer_tagline">"Play the game. Decode the cipher."</p>
      </div>
    </div>
  );
};

export default ContactCL3;