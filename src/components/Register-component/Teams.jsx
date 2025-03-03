import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import "./styles/Teams.css";
import SampleContext from "../contexts/SampleContext";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);
  const {URL}=useContext(SampleContext);
  useEffect(() => {
    axios
      .get(URL+"/api/team/getusers")
      .then((response) => setTeams(response.data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const toggleTeam = (teamId) => {
    setActiveTeam(activeTeam === teamId ? null : teamId);
  };

  return (
    <div className="teams-container">
      {teams.map((team) => (
        <motion.div
          key={team._id}
          className="team-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="team-header"
            onClick={() => toggleTeam(team._id)}
            onMouseEnter={() => setActiveTeam(team._id)}
            onMouseLeave={() => setActiveTeam(null)}
          >
            <FaUsers className="team-icon" />
            <h2>{team.teamName}</h2>
          </div>
          <motion.div
            className={`team-members ${activeTeam === team._id ? "show" : ""}`}
            initial={{ opacity: 0, y: -10 }}
            animate={activeTeam === team._id ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {team.members.map((member) => (
              <motion.div
                key={member._id}
                className="member-card"
                whileHover={{ scale: 1.1 }}
              >
                <img src={member.photoUrl} alt={member.name} />
                <p>{member.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Teams;
