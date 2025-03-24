import React, { useState, useEffect, useContext } from 'react';
import './styles/ContRetCL.css';
import SampleContext from '../components/contexts/SampleContext';

const ContRetCL = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  const {URL}=useContext(SampleContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(URL+'/api/contact/contact');
        const result = await response.json();
        setContacts(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setIsLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(selectedContact?._id === contact._id ? null : contact);
  };

  const handleReplyClick = (e, email) => {
    e.stopPropagation(); // Prevent the card from collapsing when clicking the button
    window.location.href = `mailto:${email}`;
  };

  if (isLoading) {
    return (
      <div className="contact-loader-container">
        <div className="contact-loader"></div>
        <p className="contact-loading-text">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact Requests</h1>
        <div className="contact-counter">
          <span className="contact-counter-number">{contacts.length}</span>
          <span className="contact-counter-text">Total Requests</span>
        </div>
      </div>
      
      <div className="contact-list">
        {contacts.map((contact) => (
          <div 
            key={contact._id} 
            className={`contact-card ${selectedContact?._id === contact._id ? 'contact-card-expanded' : ''}`}
            onClick={() => handleContactClick(contact)}
          >
            <div className="contact-card-header">
              <div className="contact-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="contact-info-preview">
                <h3 className="contact-name">{contact.name}</h3>
                <p className="contact-email">{contact.email}</p>
              </div>
              <div className="contact-date">{formatDate(contact.createdAt)}</div>
            </div>
            
            {selectedContact?._id === contact._id && (
              <div className="contact-details">
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Phone:</span>
                  <span className="contact-detail-value">{contact.contact}</span>
                </div>
                <div className="contact-detail-item contact-message">
                  <span className="contact-detail-label">Message:</span>
                  <p className="contact-detail-value">{contact.message}</p>
                </div>
                <div className="contact-actions">
                  <button 
                    className="contact-action-btn contact-reply-btn"
                    onClick={(e) => handleReplyClick(e, contact.email)}
                  >
                    Reply
                  </button>
                  <button className="contact-action-btn contact-mark-btn">
                    Mark as Handled
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="contact-graphic-decoration">
        <div className="contact-graphic-circle contact-graphic-circle-1"></div>
        <div className="contact-graphic-circle contact-graphic-circle-2"></div>
        <div className="contact-graphic-circle contact-graphic-circle-3"></div>
      </div>
    </div>
  );
};

export default ContRetCL;