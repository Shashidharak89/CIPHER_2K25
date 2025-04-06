import React, { useContext, useState } from 'react';
import axios from 'axios';
import SampleContext from './contexts/SampleContext';
import './styles/ImageUpload.css';

const ImageUpload = () => {
  const [name, setName] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const[upload,setUpload]=useState();
  const[isUploaded,setIsUploaded]=useState();
  
  const { URL } = useContext(SampleContext);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpload("Uploading");
    if (!name || !image) {
      setMessage("Name and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("profileLink", profileLink);
    formData.append("image", image);

    try {
      const res = await axios.post(URL + "/api/bca2025/upload", formData);

      setMessage("Uploaded successfully!");
      setName('');
      setProfileLink('');
      setImage(null);
      setPreviewUrl(null);
      setIsUploaded(true);
      
      // Animation for success
      const uploadForm = document.querySelector('.squid__form');
      uploadForm.classList.add('squid__form--success');
      setTimeout(() => {
        uploadForm.classList.remove('squid__form--success');
      }, 2000);
    } catch (error) {
      setMessage("Upload failed. Try again.");
      console.error(error);
      
      // Animation for error
      const uploadForm = document.querySelector('.squid__form');
      uploadForm.classList.add('squid__form--error');
      setTimeout(() => {
        uploadForm.classList.remove('squid__form--error');
      }, 2000);
    }
  };

  return (
    <div className="squid__container">
      <div className="squid__overlay"></div>
      <div className="squid__shapes">
        <div className="squid__triangle"></div>
        <div className="squid__circle"></div>
        <div className="squid__square"></div>
      </div>
      
      <div className="squid__content">
        <h1 className="squid__title">3rd BCA 2025 <span className="squid__title--highlight"></span></h1>
        <p className="squid__subtitle">Our last 2 months together. Make it count.</p>
        
        <form onSubmit={handleSubmit} className="squid__form">
          <div className="squid__symbol">
            <div className="squid__symbol--circle"></div>
            <div className="squid__symbol--triangle"></div>
            <div className="squid__symbol--square"></div>
          </div>
          
          <h2 className="squid__form-title">Upload Your Profle</h2>
          
          <div className="squid__input-group">
            <label className="squid__label">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="squid__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="squid__input-border"></div>
          </div>

          <div className="squid__input-group">
            <label className="squid__label">Instagram Link <span className="squid__optional">(optional)</span></label>
            <input
              type="text"
              placeholder="https://instagram.com/yourprofile"
              className="squid__input"
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
            />
            <div className="squid__input-border"></div>
          </div>

          <div className="squid__upload-section">
            <label className="squid__upload-label">
              <div className="squid__upload-icon">
                <span className="squid__upload-plus">+</span>
              </div>
              <span className="squid__upload-text">Choose Your Image</span>
              <input
                type="file"
                accept="image/*"
                className="squid__upload-input"
                onChange={handleImageChange}
                required
              />
            </label>
            
            {previewUrl && (
              <div className="squid__preview-container">
                <div className="squid__preview-frame">
                  <div className="squid__preview-image-container">
                    <img src={previewUrl} alt="Preview" className="squid__preview-image" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="squid__submit-button"
            disabled={upload}
          >
            <span className="squid__button-text">
              {upload?isUploaded?"Upload Completed":upload:"Upload"}
              
              
              </span>
            <span className="squid__button-glow"></span>
          </button>

          {message && (
            <p className={`squid__message ${message.includes("success") ? "squid__message--success" : "squid__message--error"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;