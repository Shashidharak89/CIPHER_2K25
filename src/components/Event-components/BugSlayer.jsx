import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import "./styles/BugSlayer.css";
import SampleContext from "../contexts/SampleContext";

const BugSlayer = () => {
  const [eventData, setEventData] = useState(null);
  

  const {URL,index}=useContext(SampleContext);

  useEffect(() => {
    axios.get(URL+"/api/event/events")
      .then(response => {
        if (response.data.length > 0) {
          setEventData(response.data[index]);
        }
      })
      .catch(error => console.error("Error fetching event data:", error));
  }, []);

  return (
    <div className="bug-slayer-container">
      <header className="header">
        <h1 className="event-title">{eventData ? eventData.eventname : "Loading..."}</h1>
        <p className="host-info">Hosted by Shashidhara K | Ph: 7760770725</p>
      </header>
      
      {eventData && eventData.participants.map((team, index) => (
        <TeamSection key={index} team={team} />
      ))}
    </div>
  );
};

// ✅ Move useInView to a separate component (Fixes the Hook order issue)
const TeamSection = ({ team }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className={`team-section ${inView ? "visible" : "hidden"}`}>
      <h2 className="team-name">{team.teamname}</h2>
      <div className="image-container">
        {team.members.map((member, idx) => (
          <motion.img
            key={member._id}
            src={member.imageUrl}
            alt={member.membername}
            className={`participant-image ${idx % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.3 }}
          />
        ))}
      </div>
      <div className="name-container">
        {team.members.map(member => (
          <motion.h2
            key={member._id}
            className="name"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {member.membername}
          </motion.h2>
        ))}
      </div>
    </div>
  );
};

export default BugSlayer;
