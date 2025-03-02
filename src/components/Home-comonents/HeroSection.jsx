import { motion } from "framer-motion";
import "./styles/HeroSection.css";

const textVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const boxVariants = {
  hidden: { y: "100%" },
  visible: (i) => ({
    y: "-100%",
    transition: {
      delay: i * 0.3,
      duration: 0.7,
      ease: "easeInOut",
    },
  }),
};

const texts = [
  "SACRED HEART COLLEGE MADANTHYAR",
  "Department of BCA",
  "IT FORUM PRESENTS",
  "CIPHER 2K25",
  '"Would You Like to Play a Game?"',
];

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="Herotexts">
        {texts.map((text, index) => (
          <div key={index} className="text-wrapper">
            <motion.div
              className="reveal-box"
              custom={index}
              initial="hidden"
             animate="visible"
              variants={boxVariants}
            />
            <motion.h2
              className={`text line-${index + 1}`} // Unique class for each line
              custom={index}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {text}
            </motion.h2>
          </div>
        ))}
      </div>
      <div className="overlay"></div>
    </section>
  );
};

export default HeroSection;
