import React, { useEffect, useRef } from 'react';
import './styles/DevCL.css';

const DevCL = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0'];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.02;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      // Connect particles with lines if they're close enough
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particles[a].color;
            ctx.globalAlpha = 1 - distance / 100;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="devcl-container">
      <canvas ref={canvasRef} className="devcl-canvas"></canvas>
      
      <div className="devcl-content">
        <h1 className="devcl-title">Cipher 2k25 Developers</h1>
        
        <div className="devcl-cards-wrapper">
          {/* Shashidhara's Profile */}
          <div className="devcl-profile-card devcl-card-shashi">
            <div className="devcl-card-inner">
              <div className="devcl-profile-header">
                <div className="devcl-avatar-container">
                  <div className="devcl-avatar devcl-avatar-shashi"></div>
                </div>
                <h2 className="devcl-name">Shashidhara</h2>
                <p className="devcl-role">Full Stack Developer</p>
              </div>
              
              <div className="devcl-profile-body">
                <p className="devcl-bio">Passionate developer with expertise in React, Node.js and modern web technologies. Creating elegant solutions for complex problems.</p>
                
                <div className="devcl-skills">
                  <span className="devcl-skill-tag">React</span>
                  <span className="devcl-skill-tag">Node.js</span>
                  <span className="devcl-skill-tag">MongoDB</span>
                  <span className="devcl-skill-tag">UI/UX</span>
                </div>
                
                <div className="devcl-social-links">
                  <a href="https://github.com/shashidhara" className="devcl-social-link devcl-github" target="_blank" rel="noopener noreferrer">
                    <span className="devcl-social-icon">GitHub</span>
                  </a>
                  <a href="https://linkedin.com/in/shashidhara" className="devcl-social-link devcl-linkedin" target="_blank" rel="noopener noreferrer">
                    <span className="devcl-social-icon">LinkedIn</span>
                  </a>
                  <a href="https://shashidhara-portfolio.dev" className="devcl-social-link devcl-portfolio" target="_blank" rel="noopener noreferrer">
                    <span className="devcl-social-icon">Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wilson's Profile */}
          <div className="devcl-profile-card devcl-card-wilson">
            <div className="devcl-card-inner">
              <div className="devcl-profile-header">
                <div className="devcl-avatar-container">
                  <div className="devcl-avatar devcl-avatar-wilson"></div>
                </div>
                <h2 className="devcl-name">Wilson</h2>
                <p className="devcl-role">Frontend Developer</p>
              </div>
              
              <div className="devcl-profile-body">
                <p className="devcl-bio">Creative developer focused on crafting beautiful user interfaces with cutting-edge animations and interactions.</p>
                
                <div className="devcl-skills">
                  <span className="devcl-skill-tag">React</span>
                  <span className="devcl-skill-tag">CSS/SCSS</span>
                  <span className="devcl-skill-tag">Three.js</span>
                  <span className="devcl-skill-tag">Animation</span>
                </div>
                
                <div className="devcl-social-links">
                  <a href="https://github.com/wilson" className="devcl-social-link devcl-github" target="_blank" rel="noopener noreferrer">
                    <span className="devcl-social-icon">GitHub</span>
                  </a>
                  <a href="https://linkedin.com/in/wilson" className="devcl-social-link devcl-linkedin" target="_blank" rel="noopener noreferrer">
                    <span className="devcl-social-icon">LinkedIn</span>
                  </a>
                  <a href="https://wilson-portfolio.dev" className="devcl-social-link devcl-portfolio" target="_blank" rel="noopener noreferrer">
                    <span className="devcl-social-icon">Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevCL;