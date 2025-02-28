import { Link } from "react-router-dom";
import "./styles/Sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-close"}`}>
      <div className="close-btn" onClick={closeSidebar}>&times;</div> {/* Close button */}
      <Link to="/" className="sidebar-item" onClick={closeSidebar}>Home</Link>
      <Link to="/events" className="sidebar-item" onClick={closeSidebar}>Events</Link>
      <Link to="/register" className="sidebar-item" onClick={closeSidebar}>Register</Link>
      <Link to="/about" className="sidebar-item" onClick={closeSidebar}>About</Link>
      <Link to="/contact" className="sidebar-item" onClick={closeSidebar}>Contact</Link>
    </div>
  );
};

export default Sidebar;
