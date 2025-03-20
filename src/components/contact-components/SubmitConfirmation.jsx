import React, { useEffect } from 'react';
import './styles/SubmitConfirmation.css';

const SubmitConfirmation = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="cipher_confirmation_overlay">
      <div className="cipher_confirmation_container">
        <div className="cipher_confirmation_icon">
          <div className="cipher_checkmark"></div>
        </div>
        <h2 className="cipher_confirmation_title">Message Submitted</h2>
        <p className="cipher_confirmation_message">The Front Man will contact you soon</p>
        <div className="cipher_confirmation_decoration">
          <div className="cipher_confirmation_triangle"></div>
          <div className="cipher_confirmation_circle"></div>
          <div className="cipher_confirmation_square"></div>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmation;