import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/FaqCompo.css';

const FaqCompo = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaq, setFilteredFaq] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const faqData = [
    {
      question: "What is Cipher 2k25?",
      answer: "Cipher 2k25 is the annual technical fest organized by the BCA Department. This year's theme is inspired by Squid Game, featuring exciting technical competitions, workshops, and fun events for all BCA students!"
    },
    {
      question: "When and where will Cipher 2k25 be held?",
      answer: "Cipher 2k25 will be held on April 9, 2025, at the Main Auditorium and BCA Block. The inaugural ceremony starts at 9:30 AM."
    },
    {
      question: "How can I register for Cipher 2k25?",
      answer: "Registration is open until April 7, 2025. You can register online through the register page or visit the registration desk at the BCA Department. Don't miss out on this exciting inter-class event!"
    },
    {
      question: "What events are planned for Cipher 2k25?",
      answer: "We have coding challenges, hackathons, gaming tournaments, technical quiz, project exhibition, and special Squid Game-inspired survival challenges. Check the Events section on our website for a complete list and schedule."
    },
    {
      question: "Are there any participation certificates?",
      answer: "Yes! All participants will receive digital participation certificates. Winners of various competitions will receive special merit certificates and recognition during the closing ceremony."
    },
    {
      question: "Can students from other departments participate?",
      answer: "Cipher 2k25 is primarily an inter-class fest for BCA students. However, select events might be open to all students based on availability. Keep an eye on announcements for more details."
    }
  ];

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFaq(faqData);
    } else {
      const filtered = faqData.filter(
        item => 
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaq(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Initialize filtered FAQ
    setFilteredFaq(faqData);
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="cipher_faq_container">
      <div className="cipher_faq_overlay"></div>
      <div className="cipher_faq_triangle_decoration"></div>
      <div className="cipher_faq_circle_decoration"></div>
      <div className="cipher_faq_square_decoration"></div>
      
      <div className="cipher_faq_content">
        <div className="cipher_faq_header">
          <div className="cipher_faq_logo">
            <div className="cipher_faq_triangle"></div>
            <div className="cipher_faq_circle"></div>
            <div className="cipher_faq_square"></div>
          </div>
          <h1 className="cipher_faq_title">CIPHER <span className="cipher_faq_title_highlight">2k25</span></h1>
          <p className="cipher_faq_subtitle">Frequently Asked Questions</p>
          
          <div className={`cipher_faq_search_container ${isSearchFocused ? 'cipher_faq_search_focused' : ''}`}>
            <div className="cipher_faq_search_icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input 
              type="text" 
              className="cipher_faq_search_input" 
              placeholder="Search questions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchTerm && (
              <button 
                className="cipher_faq_search_clear" 
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        <div className="cipher_faq_image_container">
          <img 
            src="https://th.bing.com/th/id/OIP.K5xDUA8g_sXv4uOAeJYCBAHaEK?rs=1&pid=ImgDetMain" 
            alt="Squid Game" 
            className="cipher_faq_image" 
          />
          <div className="cipher_faq_image_overlay">
            <p className="cipher_faq_image_text">Will you survive the games?</p>
            <div className="cipher_faq_countdown">
              <div className="cipher_faq_countdown_item">
                <span className="cipher_faq_countdown_number">9</span>
                <span className="cipher_faq_countdown_label">APRIL 2025</span>
              </div>
              {/* <div className="cipher_faq_countdown_shape"></div> */}
            </div>
          </div>
        </div>

        <div className="cipher_faq_accordion">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item, index) => (
              <div 
                key={index} 
                className={`cipher_faq_item ${activeIndex === index ? 'cipher_faq_active' : ''}`}
              >
                <div 
                  className="cipher_faq_question" 
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="cipher_faq_number">{index + 1}</span>
                  <p>{item.question}</p>
                  <span className="cipher_faq_icon">
                    {activeIndex === index ? '×' : '+'}
                  </span>
                </div>
                <div className="cipher_faq_answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="cipher_faq_no_results">
              <div className="cipher_faq_no_results_icon">?</div>
              <p>No matching questions found</p>
              <button className="cipher_faq_reset_search" onClick={() => setSearchTerm('')}>
                Clear Search
              </button>
            </div>
          )}
        </div>
        
        <div className="cipher_faq_footer">
          <p className="cipher_faq_footer_text">Ready to play? Join us at Cipher 2k25</p>
          <Link to="/register" className="cipher_faq_register_btn">
            Register Now
            <span className="cipher_faq_btn_highlight"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqCompo;