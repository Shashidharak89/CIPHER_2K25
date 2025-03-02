import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./styles/TeamSelection.css";
import SampleContext from "../contexts/SampleContext";

const TeamSelection = () => {
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const { URL } = useContext(SampleContext);

  // Fetch Teams and Events
  useEffect(() => {
    axios.get(`${URL}/api/team/getusers`).then((response) => {
      setTeams(response.data);
    });

    axios.get(`${URL}/api/event/events`).then((response) => {
      setEvents(response.data);
    });
  }, []);

  // Verify password
  useEffect(() => {
    if (selectedTeam && password) {
      axios
        .get(`${URL}/api/team/${selectedTeam._id}/${password}`)
        .then((res) => {
          setIsPasswordValid(res.data.success);
          setErrorMessage(res.data.success ? "" : "Incorrect password");
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

  // Check if the selected team is already registered in the selected event
  useEffect(() => {
    if (selectedEvent && selectedTeam) {
      const isRegistered = selectedEvent.participants.some(
        (participant) => participant.teamid === selectedTeam._id
      );
      setIsAlreadyRegistered(isRegistered);
    } else {
      setIsAlreadyRegistered(false);
    }
  }, [selectedEvent, selectedTeam]);

  const handleSubmit = () => {
    if (!selectedTeam || !selectedEvent || isAlreadyRegistered) return;

    const payload = {
      teamname: selectedTeam.teamName,
      teamid: selectedTeam._id,
      members: selectedMembers.map(({ name, photoUrl }) => ({
        membername: name,
        imageUrl: photoUrl,
      })),
    };

    axios
      .post(`${URL}/api/event/events/${selectedEvent._id}/participants`, payload)
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
          <label>Select Members (Max: {selectedEvent.maxentry}):</label>
          <div className="members-container">
            {selectedTeam.members.map((member) => (
              <div key={member._id} className="member-item">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    disabled={
                      selectedMembers.length >= selectedEvent.maxentry &&
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
                  <span className="checkmark"></span>
                </label>
                <img src={member.photoUrl} alt={member.name} className="member-img" />
                <span>{member.name}</span>
              </div>
            ))}
          </div>

          <label>Enter Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error">{errorMessage}</p>}

          {isAlreadyRegistered && (
            <p className="error">This team is already registered for the selected event.</p>
          )}

          <button disabled={!isPasswordValid || isAlreadyRegistered} onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default TeamSelection;
