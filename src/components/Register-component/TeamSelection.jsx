import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/TeamSelection.css";

const TeamSelection = () => {
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch Teams and Events
  useEffect(() => {
    axios.get("http://localhost:5000/api/team/getusers").then((response) => {
      setTeams(response.data);
    });

    axios.get("http://localhost:5000/api/event/events").then((response) => {
      setEvents(response.data);
    });
  }, []);

  // Verify password when team & password are selected
  useEffect(() => {
    if (selectedTeam && password) {
      axios
        .get(`http://localhost:5000/api/team/${selectedTeam._id}/${password}`)
        .then((res) => {
          if (res.data.success) {
            setIsPasswordValid(true);
            setErrorMessage("");
          } else {
            setIsPasswordValid(false);
            setErrorMessage("Incorrect password");
          }
        })
        .catch(() => {
          setIsPasswordValid(false);
          setErrorMessage("Error verifying password");
        });
    } else {
      setIsPasswordValid(false);
      setErrorMessage("");
    }
  }, [selectedTeam, password]);

  const handleSubmit = () => {
    if (!selectedTeam || !selectedEvent) return;

    const payload = {
      teamname: selectedTeam.teamName,
      teamid: selectedTeam._id,
      members: selectedMembers.map(({ name, photoUrl }) => ({
        membername: name,
        imageUrl: photoUrl,
      })),
    };

    axios
      .post(`http://localhost:5000/api/event/events/${selectedEvent._id}/participants`, payload)
      .then(() => alert("Team Registered Successfully"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="team-selection">
      <h1>Team Registration</h1>

      <label>Select Your Team:</label>
      <select onChange={(e) => setSelectedTeam(teams.find((t) => t._id === e.target.value))}>
        <option value="">-- Select Team --</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.teamName}
          </option>
        ))}
      </select>

      <label>Select Event:</label>
      <select onChange={(e) => setSelectedEvent(events.find((ev) => ev._id === e.target.value))}>
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.eventname} ({event.event})
          </option>
        ))}
      </select>

      {selectedTeam && selectedEvent && (
        <>
          <label>Select Members (Max: {selectedEvent.maxparticipants}):</label>
          {selectedTeam.members.map((member) => (
            <div key={member._id} className="member-item">
              <input
                type="checkbox"
                disabled={
                  selectedMembers.length >= selectedEvent.maxparticipants &&
                  !selectedMembers.find((m) => m._id === member._id)
                }
                checked={selectedMembers.some((m) => m._id === member._id)}
                onChange={(e) => {
                  setSelectedMembers((prev) =>
                    e.target.checked
                      ? [...prev, member]
                      : prev.filter((m) => m._id !== member._id)
                  );
                }}
              />
              <img src={member.photoUrl} alt={member.name} className="member-img" />
              <span>{member.name}</span>
            </div>
          ))}

          <label>Enter Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error">{errorMessage}</p>}

          <button disabled={!isPasswordValid} onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default TeamSelection;
