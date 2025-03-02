import { useEffect, useState } from "react";
import "./styles/HeroSection.css";
import { HiH3 } from "react-icons/hi2";

const HeroSection = () => {
  const [textAnimation, setTextAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setTextAnimation(true);
      } else {
        setTextAnimation(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-section">
      
      <div className="Herotexts">
      <h2 className="clgtext">SACRED HEART COLLEGE MADANTHYAR</h2>
      <h2 className="departtext">Departmet of Bca</h2>
      <h2 className="forumtext">IT FORUM <br />PRESENTS</h2>
      
      <h1 className="festtext">CIPHER 2K25</h1>
      <h3 className="slogan-text">
        "Would You Like to Play a Game?"
      </h3>
      </div>
      {/* <h3 className={`hero-text ${textAnimation ? "animate" : ""}`}>
        "Would You Like to Play a Game?"
      </h3> */}
      <div className="overlay"></div>
    </section>
  );
};

export default HeroSection;
