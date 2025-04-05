import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SampleContext from './contexts/SampleContext';
import './styles/ImageDisplay.css';

const ImageDisplay = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { URL } = useContext(SampleContext);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(URL + "/api/bca2025/users");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Add background animation
    const container = document.querySelector('.sqdisplay__container');
    if (container) {
      for (let i = 0; i < 50; i++) {
        const shape = document.createElement('div');
        const randomShape = Math.floor(Math.random() * 3);
        
        if (randomShape === 0) {
          shape.className = 'sqdisplay__bg-circle';
        } else if (randomShape === 1) {
          shape.className = 'sqdisplay__bg-triangle';
        } else {
          shape.className = 'sqdisplay__bg-square';
        }
        
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.animationDuration = `${10 + Math.random() * 20}s`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        shape.style.opacity = `${0.03 + Math.random() * 0.05}`;
        shape.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
        
        container.appendChild(shape);
      }
    }
  }, [URL]);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="sqdisplay__loading-container">
        <div className="sqdisplay__loading-symbol">
          <div className="sqdisplay__loading-circle"></div>
          <div className="sqdisplay__loading-triangle"></div>
          <div className="sqdisplay__loading-square"></div>
        </div>
        <p className="sqdisplay__loading-text">Loading Players...</p>
      </div>
    );
  }

  return (
    <div className="sqdisplay__container">
      <div className="sqdisplay__header">
        <div className="sqdisplay__title-container">
          <div className="sqdisplay__symbol-group">
            <div className="sqdisplay__symbol-triangle"></div>
            <div className="sqdisplay__symbol-circle"></div>
            <div className="sqdisplay__symbol-square"></div>
          </div>
          <h1 className="sqdisplay__title">BCA 2025 <span className="sqdisplay__title-highlight">Players</span></h1>
          <div className="sqdisplay__title-separator"></div>
          <p className="sqdisplay__subtitle">The final journey of our class</p>
        </div>
      </div>

      <div className="sqdisplay__grid">
        {users.map((user) => (
          <div 
            key={user._id} 
            className="sqdisplay__card"
            onClick={() => openModal(user)}
          >
            <div className="sqdisplay__card-frame">
              <div className="sqdisplay__card-border"></div>
              <div className="sqdisplay__image-container">
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="sqdisplay__image"
                />
                <div className="sqdisplay__image-overlay">
                  <div className="sqdisplay__player-number">{Math.floor(Math.random() * 456) + 1}</div>
                </div>
              </div>
              <div className="sqdisplay__card-content">
                <h3 className="sqdisplay__player-name">{user.name}</h3>
                <p className="sqdisplay__player-date">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
                {user.profileLink && (
                  <div className="sqdisplay__social-link">
                    <span className="sqdisplay__social-icon">♦</span>
                    <a 
                      href={user.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="sqdisplay__profile-link"
                    >
                      Instagram Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Player Detail Modal */}
      {isModalOpen && selectedUser && (
        <div className="sqdisplay__modal-backdrop" onClick={closeModal}>
          <div className="sqdisplay__modal" onClick={(e) => e.stopPropagation()}>
            <button className="sqdisplay__modal-close" onClick={closeModal}>×</button>
            
            <div className="sqdisplay__modal-content">
              <div className="sqdisplay__modal-header">
                <div className="sqdisplay__modal-player-number">
                  {Math.floor(Math.random() * 456) + 1}
                </div>
                <h2 className="sqdisplay__modal-title">{selectedUser.name}</h2>
              </div>
              
              <div className="sqdisplay__modal-image-container">
                <img 
                  src={selectedUser.imageUrl} 
                  alt={selectedUser.name}
                  className="sqdisplay__modal-image" 
                />
              </div>
              
              <div className="sqdisplay__modal-info">
                <div className="sqdisplay__modal-detail">
                  <span className="sqdisplay__modal-label">Joined</span>
                  <span className="sqdisplay__modal-value">
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </span>
                </div>
                
                {selectedUser.profileLink && (
                  <div className="sqdisplay__modal-detail">
                    <span className="sqdisplay__modal-label">Connect</span>
                    <a 
                      href={selectedUser.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sqdisplay__modal-social-link"
                    >
                      View Instagram Profile
                    </a>
                  </div>
                )}
              </div>
              
              <div className="sqdisplay__modal-footer">
                <p className="sqdisplay__modal-message">
                  "Every player leaves a legacy. What will yours be?"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;