import React, { useState, useRef, useEffect } from 'react';
import './styles/FaqCompo.css';
import { useNavigate } from 'react-router-dom';

const FaqCompo = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);
  const navigate = useNavigate();
  
  // Calculate time remaining until April 9, 2025
  const calculateTimeRemaining = () => {
    const eventDate = new Date('April 9, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };
  
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  
  useEffect(() => {
    setIsVisible(true);
    
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    const handleScroll = () => {
      const faqElements = document.querySelectorAll('.cipher__faq__item');
      faqElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          element.classList.add('cipher__faq__item--visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const faqData = [
    {
      question: "What is Cipher 2k25?",
      answer: "Cipher 2k25 is the annual technical and cultural fest organized by the BCA department. This year it features a thrilling Squid Game theme with various competitive events, workshops, and exciting prizes."
    },
    {
      question: "When and where will Cipher 2k25 be held?",
      answer: "Cipher 2k25 will be held on April 9, 2025, at the Main Campus Auditorium and surrounding areas. All events will be clearly marked with Squid Game-inspired signage."
    },
    {
      question: "How can I register for Cipher 2k25?",
      answer: "Registration is open online through our website cipher2k25.edu/register or you can visit the BCA department office. Early bird registration ends March 30, 2025. Each participant will receive a unique player number and mask upon registration."
    },
    {
      question: "What events will be featured in Cipher 2k25?",
      answer: "Events include Coding Death Match, Tech Red Light Green Light, Glass Bridge Debugging Challenge, AI Marbles, Cyber Security Tug of War, Hackathons, Gaming tournaments, Technical paper presentations, and many more Squid Game-inspired challenges."
    },
    {
      question: "Is Cipher 2k25 open to students from other colleges?",
      answer: "Yes! We welcome participants from all colleges. Inter-college teams can register for most events. Some specialized tournaments may have specific eligibility criteria, so please check the event details."
    },
    {
      question: "Are there any participation certificates?",
      answer: "All participants will receive digital certificates, and top performers will get exclusive Cipher 2k25 merchandise featuring Squid Game elements. Winners of major competitions will receive printed certificates during the closing ceremony."
    },
    {
      question: "Do I need prior technical knowledge to participate?",
      answer: "Events range from beginner to advanced levels. We have events suitable for all skill levels, and some non-technical events as well. Check the difficulty rating for each event on our website."
    },
    {
      question: "Will there be food available during the fest?",
      answer: "Yes, we'll have food stalls serving themed refreshments including the famous Dalgona cookies! Food coupons are included in your registration kit."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaq = faqData.filter((item) => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  return (
    <div className={`cipher__faq__container ${isVisible ? 'cipher__faq__container--visible' : ''}`} ref={faqRef}>
      <div className="cipher__faq__header">
        <div className="cipher__faq__logo">
          <div className="cipher__faq__circle"></div>
          <div className="cipher__faq__triangle"></div>
          <div className="cipher__faq__square"></div>
        </div>
        <h1 className="cipher__faq__title">CIPHER 2K25</h1>
        <h2 className="cipher__faq__subtitle">Frequently Asked Questions</h2>
      </div>
      
      <div className="cipher__faq__image__container cipher__faq__desktop__image">
        <div className="cipher__faq__mask__image">
          <img 
            src="https://th.bing.com/th/id/OIP.g22cZTnYodwLl5jsM125rQHaEK?rs=1&pid=ImgDetMain" 
            alt="Squid Game" 
            className="cipher__faq__main__image" 
          />
          <div className="cipher__faq__image__overlay"></div>
        </div>
      </div>
      
      <div className="cipher__faq__content">
        <div className="cipher__faq__left">
          <div className="cipher__faq__image__container cipher__faq__mobile__image">
            <div className="cipher__faq__mask__image">
              <img 
                src="https://th.bing.com/th/id/OIP.g22cZTnYodwLl5jsM125rQHaEK?rs=1&pid=ImgDetMain" 
                alt="Squid Game" 
                className="cipher__faq__main__image" 
              />
              <div className="cipher__faq__image__overlay"></div>
            </div>
          </div>
          
          <div className="cipher__faq__counter">
            <div className="cipher__faq__timer">
              <div className="cipher__faq__timer__digits">456</div>
              <div className="cipher__faq__timer__label">PLAYERS REGISTERED</div>
            </div>
          </div>
        </div>
        
        <div className="cipher__faq__right">
          <div className="cipher__faq__search__wrapper">
            <input 
              type="text" 
              className="cipher__faq__search"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="cipher__faq__search__icon">⌕</div>
          </div>
          
          <div className="cipher__faq__list">
            {filteredFaq.map((faq, index) => (
              <div 
                key={index} 
                className={`cipher__faq__item ${activeIndex === index ? 'cipher__faq__item--active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="cipher__faq__question">
                  <span className="cipher__faq__question__number">{index + 1}</span>
                  <span className="cipher__faq__question__text">{faq.question}</span>
                  <span className="cipher__faq__icon">{activeIndex === index ? '−' : '+'}</span>
                </div>
                <div className={`cipher__faq__answer ${activeIndex === index ? 'cipher__faq__answer--visible' : ''}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="cipher__faq__footer">
        <div className="cipher__faq__shapes">
          <div className="cipher__faq__circle cipher__faq__shape--animate"></div>
          <div className="cipher__faq__triangle cipher__faq__shape--animate"></div>
          <div className="cipher__faq__square cipher__faq__shape--animate"></div>
        </div>
        <div className="cipher__faq__footer__text">
          <p>Join us for the ultimate challenge at Cipher 2k25!</p>
          <button className="cipher__faq__register__button" onClick={handleRegisterClick}>REGISTER NOW</button>
        </div>
        <div className="cipher__faq__countdown">
          <span className="cipher__faq__countdown__label">COUNTDOWN TO APRIL 9:</span>
          <span className="cipher__faq__countdown__time">
            {formatTimeUnit(timeRemaining.days)}d : {formatTimeUnit(timeRemaining.hours)}h : {formatTimeUnit(timeRemaining.minutes)}m : {formatTimeUnit(timeRemaining.seconds)}s
          </span>
        </div>
      </div>
    </div>
  );
};

export default FaqCompo;