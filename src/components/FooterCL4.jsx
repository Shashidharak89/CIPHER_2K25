import React, { useEffect, useRef } from 'react';
import './styles/FooterCL4.css';

const FooterCL4 = () => {
  const introAnimationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cipher_intro_animation_active');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (introAnimationRef.current) {
      observer.observe(introAnimationRef.current);
    }

    return () => {
      if (introAnimationRef.current) {
        observer.unobserve(introAnimationRef.current);
      }
    };
  }, []);

  return (
    <footer className="cipher_footer_container">
      {/* Intro Animation */}
      <div className="cipher_intro_animation" ref={introAnimationRef}>
        <div className="cipher_mask_outline">
          <div className="cipher_triangle"></div>
          <div className="cipher_circle"></div>
          <div className="cipher_square"></div>
        </div>
        <div className="cipher_title_reveal">
          <h1 className="cipher_title_text">CIPHER 2K25</h1>
          <p className="cipher_slogan_text">Decode. Compete. Survive.</p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="cipher_footer_content">
        <div className="cipher_footer_section cipher_footer_branding">
          <h2 className="cipher_footer_heading">CIPHER 2K25</h2>
          <p className="cipher_footer_tagline">The Ultimate BCA Techfest</p>
          <p className="cipher_footer_dates">March 25-27, 2025</p>
        </div>

        <div className="cipher_footer_section cipher_footer_links">
          <h3 className="cipher_footer_subheading">Quick Links</h3>
          <ul className="cipher_footer_links_list">
            <li className="cipher_footer_link_item">
              <a href="#events" className="cipher_footer_link cipher_footer_link_hover">Events</a>
            </li>
            <li className="cipher_footer_link_item">
              <a href="#schedule" className="cipher_footer_link cipher_footer_link_hover">Schedule</a>
            </li>
            <li className="cipher_footer_link_item">
              <a href="#register" className="cipher_footer_link cipher_footer_link_hover">Register</a>
            </li>
            <li className="cipher_footer_link_item">
              <a href="#sponsors" className="cipher_footer_link cipher_footer_link_hover">Sponsors</a>
            </li>
          </ul>
        </div>

        <div className="cipher_footer_section cipher_footer_contact">
          <h3 className="cipher_footer_subheading">Contact Us</h3>
          <p className="cipher_footer_contact_info">
            <span className="cipher_footer_contact_label">Email:</span> 
            <a href="mailto:cipher2k25@bca.edu" className="cipher_footer_contact_link">cipher2k25@bca.edu</a>
          </p>
          <p className="cipher_footer_contact_info">
            <span className="cipher_footer_contact_label">Phone:</span> +91 9876543210
          </p>
          <div className="cipher_footer_social">
            <a href="#" className="cipher_social_icon cipher_social_icon_instagram">
              <span className="cipher_social_icon_inner"></span>
            </a>
            <a href="#" className="cipher_social_icon cipher_social_icon_twitter">
              <span className="cipher_social_icon_inner"></span>
            </a>
            <a href="#" className="cipher_social_icon cipher_social_icon_facebook">
              <span className="cipher_social_icon_inner"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="cipher_footer_bottom">
        <div className="cipher_footer_shapes">
          <div className="cipher_shape cipher_shape_circle"></div>
          <div className="cipher_shape cipher_shape_triangle"></div>
          <div className="cipher_shape cipher_shape_square"></div>
        </div>
        <p className="cipher_copyright_text">
          &copy; 2025 BCA Department | Cipher 2K25 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default FooterCL4;