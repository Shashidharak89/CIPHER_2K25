import { useState } from "react";
import "./styles/EventsSection.css";

const eventsData = [
  { name: "BUG SLAYER", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"Each team should make a team of two members.There will be 3 rounds.Participants should have knowledge of C,C++,java, Data Structure and general knowledge of Computer Science.They should be comfortable using Turbo C and Visual Studio Code.There is elimination in each round.Internet and smart phones are strictly prohibited.Judges decision is final.",
    ehead:"Shashidhara K",
    headno:"7760770725"
  },
  { name: "Design Maze", 
    description: "Showcase your creativity in web design!",
    img:"/eventimgs/coding.jpeg",
    rules:"Each team must consist of 2 participants.HTML and CSS are mandatory for designingThe event consists of 2 rounds, with elimination in the 1st round. Only selected teams will proceed to the final round.Internet access will be provided only if necessary, as decided by the organizers.The design challenge for each round will be revealed at the beginning of the round.Time limits for each round will be announced before the competition starts.",
    ehead:"Hrithika",
    headno:"74838 35150"  
  },
  { name: "Round And Round", 
    description: "A thrilling dance competition awaits!",
    img:"/eventimgs/coding.jpeg",
    rules:"Filmy-style dance.Each team must have a min 5 - 9 max members.Performance duration should be between 4+1 minutes.Stage setup 2min.Remixes of filmy songs are allowed.The performance will be judged on creativity and the use of props. Team heads must submit their final tracks to the host at least 1 day before the fest.Any inappropriate behaviour or offensive content in performances will lead to disqualification.The judges decisions will be last and final.",
    ehead:"Thejadri",
    headno:"87625 68184" 
  },
  { name: "Top To Survive", 
    description: "Battle it out in the ultimate gaming challenge!",
    img:"/eventimgs/coding.jpeg",
    rules:"Participants: 3(2-Boys, 1-Girl).Games will be disclosed on the spot.Top 4 will be selected to final.Players can get their own requirements like Phone , earphone, Finger sleeve, powder(if nessasory ) etc.",
    ehead:"Lakshan m Shetty",
    headno:"89512 85746"  
  },
  { name: "The Front man Challenge", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"Number of participants: 1.Number of rounds: 4.Qualification for the next round will be based on the performance of participants, in the previous round.Round 1, 2 & 3 will be conducted prior the fest.Topics will be disclosed on the same day.Top 4 teams will be selected for the final round.The Judges dicision will be final.There is elimination in every round.",
    ehead:"Vinita Viniyola Fernandes",
    headno:"76249 85619" 
  },
  { name: "Trail Trivia", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"Each team will consist of 4 participants, with 2 participants coming from each class(minimum one boy or girl).There will be no eliminations during the first day's round.The top 4 teams will be selected for the finals.Points will be reset to zero for the finals.No mobile phones or smart watches are allowed during the event.GENERAL RULES and updates regarding rounds will be provided prior to the round.Participants cannot be involved in the treasure hunt, photography, or video events.Taking help from non-participants will lead to the immediate disqualification of the team.",
    ehead:"Sharath",
    headno:"82175 79389" 
  },
  { name: "Squid Innovate", 
    description: "Test your coding skills against the best!",
    img:"/eventimgs/coding.jpeg",
    rules:"Each team must consist of 4 members.(2- I BCA , 2-II BCA). Ready-made models or commercially available models are strictly not permitted. If found, the team will be disqualified. Usage of laptops, mobile phones, and internet is allowed. Teams must prepare their models in advance and present them on the scheduled exhibition day. Each team will have 5-10 minutes for their presentation, followed by a Q&A session. Lots picking for exhibition will be done on the previous day of the event. All members are expected to maintain decorum and discipline throughout the event.",
    ehead:"Rashmitha",
    headno:"96112 94611" 
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
    rules:"Make a team of 2 memebers, Each team must include one participant from each year. Taking help from non-participants will lead to the immediate disqualification of the team. Participants cannot be involved in the IT Quiz, Photography & videography events. GENERAL RULES for each round will be updated prior to the start of the round.",
    ehead:"Sanath Shetty",
    headno:"97416 30689" 
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
