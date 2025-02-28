import { useEffect, useState } from "react";
import "./styles/HeroSection.css";

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
      <div className="overlay"></div>
      <h1 className={`hero-text ${textAnimation ? "animate" : ""}`}>
        "Would You Like to Play a Game?"
      </h1>
    </section>
  );
};

export default HeroSection;
