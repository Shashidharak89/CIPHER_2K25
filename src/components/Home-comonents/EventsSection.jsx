import { useState } from "react";
import "./styles/EventsSection.css";

const eventsData = [
  { name: "BUG SLAYER", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:""
  },
  { name: "Design Maze", 
    description: "Showcase your creativity in web design!",
    img:"/eventimgs/coding.jpeg",
    rules:"Each team should make a team of two members.There will be 3 rounds.Participants should have knowledge of C,C++,java, Data Structure and general knowledge of Computer Science.They should be comfortable using Turbo C and Visual Studio Code.There is elimination in each round.Internet and smart phones are strictly prohibited.Judges decision is final.",
    ehead:"Hrithika",
    headno:"9481437620"  
  },
  { name: "Round And Round", 
    description: "A thrilling dance competition awaits!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Top To Survive", 
    description: "Battle it out in the ultimate gaming challenge!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:""  
  },
  { name: "The Front man Challenge", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Trail Trivia", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Squid Innovate", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "The Survival hunt", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Risk It All", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Squilog", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Mimic Mania", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Run For Survival", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Sutter Bug", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  },
  { name: "Squid Sketch", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"",
    ehead:"",
    headno:"" 
  }

];

const CustomIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: "8px", verticalAlign: "middle" }}
  >
    <circle cx="12" cy="12" r="10" stroke="blue" strokeWidth="2" fill="none" />
    <path d="M8 12l2 2 4-4" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <section className="events-section">
      {eventsData.map((event, index) => (
        <div key={index} className="event-box">
          <img src={event.img} alt="" className="eventimg"/>
          <h2 className="event-title">{event.name}</h2>
          <p className="event-description">{event.description}</p>
          <button className="view-more" onClick={() => setSelectedEvent(event)}>View More</button>
        </div>
      ))}
      {selectedEvent && (
        <div className="popup-overlay show">
          <div className="popup-content">
            <h2>{selectedEvent.name}</h2>
            <ul>
              {selectedEvent.rules.split(".").map((rule, index) =>
                rule.trim() ? (
                  <li key={index}>
                    <CustomIcon />
                    {rule}.
                  </li>
                ) : null
              )}
            </ul>
            <h3>{selectedEvent.ehead}</h3>
            <h3>{selectedEvent.headno}</h3>
            <button className="close-popup" onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
