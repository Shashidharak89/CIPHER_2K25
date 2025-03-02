import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/TeamSelection.css";

const TeamSelection = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/team/getusers")
      .then(response => setTeams(response.data))
      .catch(error => console.error("Error fetching teams:", error));
  }, []);

  const handleTeamChange = (event) => {
    const team = teams.find(t => t._id === event.target.value);
    setSelectedTeam(team);
    setSelectedParticipants({});
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
    setSelectedParticipants({});
  };

  const handleParticipantSelection = (member) => {
    setSelectedParticipants(prev => {
      const updated = { ...prev };
      if (updated[member._id]) {
        delete updated[member._id];
      } else {
        updated[member._id] = member;
      }
      return updated;
    });
  };

  const handleSubmit = () => {
    if (!selectedTeam || !selectedEvent) return alert("Please select a team and an event");
    
    const participants = Object.values(selectedParticipants);
    if (participants.length !== selectedTeam.numMembers) {
      return alert(`Please select exactly ${selectedTeam.numMembers} participants`);
    }

    axios.post("http://localhost:5000/api/team/adduser", {
      teamId: selectedTeam._id,
      eventName: selectedEvent,
      participants: participants.map(p => ({
        userName: p.name,
        imageUrl: p.photoUrl
      }))
    })
    .then(() => alert("Participants successfully added!"))
    .catch(error => console.error("Error submitting participants:", error));
  };

  return (
    <div className="team-selection-container">
      <h1 className="title">Team Selection</h1>
      <select onChange={handleTeamChange} className="dropdown">
        <option value="">Select a Team</option>
        {teams.map(team => (
          <option key={team._id} value={team._id}>{team.teamName}</option>
        ))}
      </select>

      {selectedTeam && (
        <div>
          <h2 className="subtitle">Select Event</h2>
          <select onChange={handleEventChange} className="dropdown">
            <option value="">Choose an Event</option>
            {Object.keys(selectedTeam.events || {}).map(event => (
              <option key={event} value={event}>{event}</option>
            ))}
          </select>
        </div>
      )}

      {selectedEvent && (
        <div className="participants-container">
          <h3 className="subtitle">Select Participants</h3>
          {selectedTeam.members.map(member => (
            <div key={member._id} className="participant-card">
              <img src={member.photoUrl} alt={member.name} className="participant-img" />
              <span>{member.name}</span>
              <input
                type="checkbox"
                checked={!!selectedParticipants[member._id]}
                onChange={() => handleParticipantSelection(member)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default TeamSelection;
