import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar
import "./styles/Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  // Function to check screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Open sidebar only when in mobile mode
  const openSidebar = () => {
    if (isMobile) setIsSidebarOpen(true);
  };

  return (
    <>
      <nav className="squid-navbar">
        <div className="logo">CIPHER-2K25</div>

        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/events" className="nav-item">Events</Link>
          <Link to="/register" className="nav-item">Register</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </div>

        {/* 3-dot menu icon (only visible below 500px) */}
        {isMobile && (
          <div className="three-dot-menu" onClick={openSidebar}>
            &#8942; {/* Vertical ellipsis (⋮) */}
          </div>
        )}
      </nav>

      {/* Sidebar Component (Only appears when open) */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
