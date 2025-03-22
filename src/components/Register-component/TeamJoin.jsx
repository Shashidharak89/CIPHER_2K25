import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./styles/TeamSelection.css";
import SampleContext from "../contexts/SampleContext";

const TeamJoin = () => {
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [status, setStatus] = useState("Submit");

  const { URL } = useContext(SampleContext);

  // Fetch Teams and Events
  useEffect(() => {
    axios.get(`${URL}/api/teamlatest/getusers`).then((response) => {
      setTeams(response.data);
    });

    axios.get(`${URL}/api/eventlatest/events`).then((response) => {
      setEvents(response.data);
    });
  }, [URL]);

  // Verify password
  useEffect(() => {
    if (selectedTeam && password) {
      axios
        .get(`${URL}/api/teamlatest/${selectedTeam._id}/${password}`)
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
  }, [selectedTeam, password, URL]);

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
    setStatus("Registering..");

    const payload = {
      teamname: selectedTeam.teamName,
      teamid: selectedTeam._id,
      members: selectedMembers.map(({ name }) => ({ membername: name }))
    };

    axios
      .post(`${URL}/api/eventlatest/events/${selectedEvent._id}/participants`, payload)
      .then(() => {
        setIsAlreadyRegistered(true);
        setStatus("Registered");
        console.log("event registered successfully..")
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="team-selection">
        <h1>Event Registration</h1>

        <label>Select Your Team:</label>
        <select
          onChange={(e) => {
            const team = teams.find((t) => t._id === e.target.value);
            setSelectedTeam(team || null);
          }}
        >
          <option value="">-- Select Team --</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.teamName}
            </option>
          ))}
        </select>

        <label>Select Event:</label>
        <select
          onChange={(e) => {
            const event = events.find((ev) => ev._id === e.target.value);
            setSelectedEvent(event || null);
          }}
        >
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
              {status}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamJoin;
