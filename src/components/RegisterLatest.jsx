import { useContext, useState } from "react";
import axios from "axios";
import "./styles/Register.css";
import SampleContext from "./contexts/SampleContext";

const RegisterLatest = () => {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [numMembers, setNumMembers] = useState(1);
  const [members, setMembers] = useState([{ name: "" }]);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const { URL } = useContext(SampleContext);

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index].name = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus(true);

    const requestBody = {
      teamName,
      leaderName,
      numMembers,
      password,
      members: JSON.stringify(members.map(({ name }) => ({ name })))
    };

    try {
      const res = await axios.post(`${URL}/api/teamlatest/register`, requestBody, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(res.data.message);
      console.log("Data submitted successfully");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register Your Team</h2>
      {message && <p className="message">{message}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="team-name"
          placeholder="Team Name"
          required
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          type="text"
          className="leader-name"
          placeholder="Team Leader Name"
          required
          value={leaderName}
          onChange={(e) => setLeaderName(e.target.value)}
        />
        <input
          type="number"
          className="num-of-members"
          min="1"
          max="10"
          placeholder="Number of Members"
          required
          value={numMembers}
          onChange={(e) => {
            const count = parseInt(e.target.value, 10);
            setNumMembers(count);
            setMembers(Array.from({ length: count }, () => ({ name: "" })));
          }}
        />

        {members.map((member, index) => (
          <div key={index} className="member-input">
            <input
              type="text"
              placeholder={`Member ${index + 1} Name`}
              required
              value={member.name}
              onChange={(e) => handleMemberChange(index, e.target.value)}
            />
          </div>
        ))}

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Registering..." : !status ? "Submit" : "Submitted"}
        </button>
      </form>
    </div>
  );
};

export default RegisterLatest;
