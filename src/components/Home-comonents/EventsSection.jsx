import { useState } from "react";
import "./styles/EventsSection.css";

const eventsData = [
  { name: "Coding Competition", description: "Test your coding skills against the best!" },
  { name: "Web Design Battle", description: "Showcase your creativity in web design!" },
  { name: "Dance Showdown", description: "A thrilling dance competition awaits!" },
  { name: "Gaming Tournament", description: "Battle it out in the ultimate gaming challenge!" }
];

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <section className="events-section">
      {eventsData.map((event, index) => (
        <div key={index} className="event-box">
          <h2 className="event-title">{event.name}</h2>
          <p className="event-description">{event.description}</p>
          <button className="view-more" onClick={() => setSelectedEvent(event)}>View More</button>
        </div>
      ))}
      {selectedEvent && (
        <div className="popup-overlay show">
          <div className="popup-content">
            <h2>{selectedEvent.name}</h2>
            <p>{selectedEvent.description}</p>
            <button className="close-popup" onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
