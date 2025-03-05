import { useContext, useState } from "react";
import "./styles/EventsSection.css";
import { useNavigate } from "react-router-dom";
import SampleContext from "../contexts/SampleContext";
import { motion } from 'framer-motion';
import bug_slayer from './images/bug_slayer.jpg';

const eventsData = [
  {
    name: "BUG SLAYER",
    description: "Crack the code, rule the game.",
    img: "/eventimgs/coding.jpeg",
    rules: "Each team should make a team of two members.There will be 3 rounds.Participants should have knowledge of C,C++,java, Data Structure and general knowledge of Computer Science.They should be comfortable using Turbo C and Visual Studio Code.There is elimination in each round.Internet and smart phones are strictly prohibited.Judges decision is final.",
    ehead: "Shashidhara K",
    headno: "7760770725"
  },
  {
    name: "Design Maze",
    description: "Showcase your creativity in web design!",
    img: "/eventimgs/coding.jpeg",
    rules: "Each team must consist of 2 participants.HTML and CSS are mandatory for designingThe event consists of 2 rounds, with elimination in the 1st round. Only selected teams will proceed to the final round.Internet access will be provided only if necessary, as decided by the organizers.The design challenge for each round will be revealed at the beginning of the round.Time limits for each round will be announced before the competition starts.",
    ehead: "Hrithika",
    headno: "74838 35150"
  },
  {
    name: "Round And Round",
    description: "A thrilling dance competition awaits!",
    img: "/eventimgs/coding.jpeg",
    rules: "Filmy-style dance.Each team must have a min 5 - 9 max members.Performance duration should be between 4+1 minutes.Stage setup 2min.Remixes of filmy songs are allowed.The performance will be judged on creativity and the use of props. Team heads must submit their final tracks to the host at least 1 day before the fest.Any inappropriate behaviour or offensive content in performances will lead to disqualification.The judges decisions will be last and final.",
    ehead: "Thejadri",
    headno: "87625 68184"
  },
  {
    name: "Top To Survive",
    description: "Battle it out in the ultimate gaming challenge!",
    img: "/eventimgs/coding.jpeg",
    rules: "Participants: 3(2-Boys, 1-Girl).Games will be disclosed on the spot.Top 4 will be selected to final.Players can get their own requirements like Phone , earphone, Finger sleeve, powder(if nessasory ) etc.",
    ehead: "Lakshan m Shetty",
    headno: "89512 85746"
  },
  {
    name: "The Front man Challenge",
    description: "Game on: play to win, survive the game",
    img: "/eventimgs/coding.jpeg",
    rules: "Number of participants: 1.Number of rounds: 4.Qualification for the next round will be based on the performance of participants, in the previous round.Round 1, 2 & 3 will be conducted prior the fest.Topics will be disclosed on the same day.Top 4 teams will be selected for the final round.The Judges dicision will be final.There is elimination in every round.",
    ehead: "Vinita Viniyola Fernandes",
    headno: "76249 85619"
  },
  {
    name: "Trail Trivia",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "Each team will consist of 4 participants, with 2 participants coming from each class(minimum one boy or girl).There will be no eliminations during the first day's round.The top 4 teams will be selected for the finals.Points will be reset to zero for the finals.No mobile phones or smart watches are allowed during the event.GENERAL RULES and updates regarding rounds will be provided prior to the round.Participants cannot be involved in the treasure hunt, photography, or video events.Taking help from non-participants will lead to the immediate disqualification of the team.",
    ehead: "Sharath",
    headno: "82175 79389"
  },
  {
    name: "Squid Innovate",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "Each team must consist of 4 members.(2- I BCA , 2-II BCA). Ready-made models or commercially available models are strictly not permitted. If found, the team will be disqualified. Usage of laptops, mobile phones, and internet is allowed. Teams must prepare their models in advance and present them on the scheduled exhibition day. Each team will have 5-10 minutes for their presentation, followed by a Q&A session. Lots picking for exhibition will be done on the previous day of the event. All members are expected to maintain decorum and discipline throughout the event.",
    ehead: "Rashmitha",
    headno: "96112 94611"
  },
  {
    name: "The Survival hunt",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "Make a team of 2 memebers, Each team must include one participant from each year. Taking help from non-participants will lead to the immediate disqualification of the team. Participants cannot be involved in the IT Quiz, Photography & videography events. GENERAL RULES for each round will be updated prior to the start of the round.",
    ehead: "Sanath Shetty",
    headno: "97416 30689"

  },
  {
    name: "Risk It All",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "There will be two participants ( 1 Boy, 1 Girl) There will be 6 rounds. Event will be conducted on the spot. There is elimination in every round. Judge’s decision is final.",
    ehead: "Anusha Shetty",
    headno: "83102 21587"
  },
  {
    name: "Squilog",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "The competition duration is strictly 1 minute.Each team must consist of exactly 2 participants.Please ensure that no vulgarity is allowed Respect Privacy and GENERAL RULES avoid filming in restricted areas.Participants are allowed to shoot their vlogs between 8:00 am - 9:30 am and 3:45 pm - 4:30 pm.The topic and its corresponding guidelines for the vlog will be provided soon.The vlog must be presented in either Kannada or English.The decision of the judges and organisers shall be final and binding on all participants.",
    ehead: "Mahammad Razik",
    headno: "73376 16956"
  },
  {
    name: "Mimic Mania",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "There will be two participants.There will be multiple rounds. There must be two players on each team—one to play and the other to assist.Players have to finish the assignment in the allotted time for each round. The team receives a point if they properly estimate the task within the allotted time. Familiarity with web series and films(all language), as well as proficiency with IT and a few common expressions.Elimination is included.",
    ehead: "Kavya",
    headno: "87924 36605"
  },
  {
    name: "Run For Survival",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "Participants-1(anyone can participate).Event will be held on track (outdoor).There will be 2 rounds.Elimination will be done in each round.Properties will be provided by the event handlers.",
    ehead: "Shawn veigas",
    headno: "8050365040"
  },
  {
    name: "Sutter Bug",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "Two members from a team.  Topics will be given on the spot.  Only mobile phones are allowed for [photography videography] .For photography editing is not allowed. Video length must be 30s.  Participants of photography  & videography are not allowed to take part in Tresure Hunt, It Quiz, It manager.",
    ehead: "Vineeth Hv",
    headno: "99017 92801"
  },
  {
    name: "Squid Sketch",
    description: "Test your coding skills against the best!",
    img: "/eventimgs/coding.jpeg",
    rules: "Time allotted: 1 hour.Number of participants – 2The theme of the content is given on the spot.Laptops are provided by event handlers.No participants are allowed to bring mobile phones.Internet facility will be provided (If required).Participants are asked to gather before 10 min of the event.Each teams are allowed to create only one poster.Pre-edited posters are not allowed.Using templates in Canva are not allowed. If found the team will be disqualified.",
    ehead: "Ashwin Rodrigues",
    headno: "8317383882"
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
  const [selectedIndex, setSelectedIndex] = useState(null); // Store the selected index properly

  const navigate = useNavigate();
  const { setIndex } = useContext(SampleContext);

  const handleTeams = (g) => {
    console.log("Selected Event Index:", g);
    setIndex(g);
    navigate("/team");
  };

  return (
    <section className="events-section">
      {eventsData.map((event, index) => (
        <div key={index} className="event-box">
          <img src={event.img} alt="" className="eventimg" />
          <button
            className="view-more"
            onClick={() => {
              setSelectedEvent(event);
              setSelectedIndex(index); // Store the correct index
            }}
          >
            View More
          </button>
          <motion.h2
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
            className="event-name">{event.name}</motion.h2>
          <p className="event-description">{event.description}</p>

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
            {/* <button
              className="close-popup"
              onClick={() => handleTeams(selectedIndex)} 
            >
              Teams
            </button> */}
            <button className="close-popup" onClick={() => setSelectedEvent(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
