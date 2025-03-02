import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./styles/BugSlayer.css";
import SampleContext from "../contexts/SampleContext";

const BugSlayer = () => {
  const [eventData, setEventData] = useState(null);
  const {URL}=useContext(SampleContext);

  useEffect(() => {
    axios.get(URL+"/api/event/events")
      .then(response => {
        if (response.data.length > 0) {
          setEventData(response.data[0]);
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
        <div key={index} className="team-section">
          <h2 className="team-name">{team.teamname}</h2>
          <div className="image-container">
            {team.members.map((member, idx) => (
              <motion.img
                key={member._id}
                src={member.imageUrl}
                alt={member.membername}
                className={`participant-image ${idx % 2 === 0 ? "left" : "right"}`}
                initial={{ x: idx % 2 === 0 ? "-100vw" : "100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 80 }}
              />
            ))}
          </div>
          <div className="name-container">
            {team.members.map(member => (
              <motion.h2
                key={member._id}
                className="name"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
              >
                {member.membername}
              </motion.h2>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BugSlayer;