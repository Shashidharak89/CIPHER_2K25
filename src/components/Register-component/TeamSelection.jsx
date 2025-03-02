import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./styles/TeamSelection.css";
import SampleContext from "../contexts/SampleContext";

const TeamSelection = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState({});

  const {URL}=useContext(SampleContext);

  useEffect(() => {
    axios.get(URL+"/api/team/getusers")
      .then(response => setTeams(response.data))
      .catch(error => console.error("Error fetching teams:", error));
  }, []);

  const handleTeamSelect = (teamId) => {
    const team = teams.find(team => team._id === teamId);
    setSelectedTeam(team);
    setSelectedMembers({});
  };

  const handleMemberSelect = (eventName, member) => {
    const eventLimit = selectedTeam.events[eventName]?.numParticipants || 0;
    const currentMembers = selectedMembers[eventName] || [];

    if (currentMembers.includes(member)) {
      // Remove member if already selected
      setSelectedMembers({
        ...selectedMembers,
        [eventName]: currentMembers.filter(m => m !== member),
      });
    } else if (currentMembers.length < eventLimit) {
      // Add member if limit is not exceeded
      setSelectedMembers({
        ...selectedMembers,
        [eventName]: [...currentMembers, member],
      });
    }
  };

  const handleSubmit = () => {
    const requests = [];

    Object.entries(selectedMembers).forEach(([eventName, members]) => {
      members.forEach(member => {
        requests.push(
          axios.post(URL+"/api/team/adduser", {
            teamId: selectedTeam._id,
            eventName,
            userName: member.name,
            imageUrl: member.photoUrl
          })
        );
      });
    });

    Promise.all(requests)
      .then(() => alert("Users added to all selected events successfully!"))
      .catch(error => console.error("Error adding users:", error));
  };

  // Check if all events have the exact required number of participants
  const isSubmitDisabled = !selectedTeam || 
    Object.keys(selectedTeam.events).some(event =>
      (selectedMembers[event]?.length || 0) !== selectedTeam.events[event]?.numParticipants
    );

  return (
    <div className="team-selection-container">
      <h1 className="title">Select Team & Event Members</h1>
      <select className="dropdown" onChange={(e) => handleTeamSelect(e.target.value)}>
        <option value="">Select a Team</option>
        {teams.map(team => <option key={team._id} value={team._id}>{team.teamName}</option>)}
      </select>

      {selectedTeam && (
        <>
          {Object.keys(selectedTeam.events).map(event => (
            <div key={event} className="event-section">
              <h2 className="subtitle">
                {event} - Select {selectedTeam.events[event]?.numParticipants} Participants
              </h2>
              <div className="members-list">
                {selectedTeam.members.map(member => (
                  <div 
                    key={member._id} 
                    className={`member-item ${selectedMembers[event]?.includes(member) ? "selected" : ""}`}
                    onClick={() => handleMemberSelect(event, member)}
                  >
                    <img src={member.photoUrl} alt={member.name} className="member-photo" />
                    <span className="member-name">{member.name}</span>
                    {selectedMembers[event]?.includes(member) && <span className="tick-mark">✔</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button 
            className="submit-btn" 
            onClick={handleSubmit} 
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default TeamSelection;
