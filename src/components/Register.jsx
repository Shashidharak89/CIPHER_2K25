import { useContext, useState } from "react";
import axios from "axios";
import "./styles/Register.css";
import SampleContext from "./contexts/SampleContext";

const Register = () => {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [numMembers, setNumMembers] = useState(1);
  const [members, setMembers] = useState([{ name: "", photo: null }]);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const[status,setStatus]=useState(false);

  const {URL}=useContext(SampleContext);

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleFileUpload = (index, file) => {
    if (!file) return;
    const updatedMembers = [...members];
    updatedMembers[index].photo = file;
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus(true);

    const formData = new FormData();
    formData.append("teamName", teamName);
    formData.append("leaderName", leaderName);
    formData.append("numMembers", numMembers);
    formData.append("password", password);
    formData.append("members", JSON.stringify(members.map(({ name }) => ({ name }))));

    members.forEach(({ photo }) => {
      if (photo) formData.append("photos", photo);
    });

    try {
      const res = await axios.post(URL+"/api/team/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      console.log("data submitted");
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
          placeholder="Team Name"
          required
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Team Leader Name"
          required
          value={leaderName}
          onChange={(e) => setLeaderName(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="10"
          placeholder="Number of Members"
          required
          value={numMembers}
          onChange={(e) => {
            const count = parseInt(e.target.value, 10);
            setNumMembers(count);
            setMembers(Array.from({ length: count }, () => ({ name: "", photo: null })));
          }}
        />

        {members.map((member, index) => (
          <div key={index} className="member-input">
            <input
              type="text"
              placeholder={`Member ${index + 1} Name`}
              required
              value={member.name}
              onChange={(e) => handleMemberChange(index, "name", e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => handleFileUpload(index, e.target.files[0])}
            />
            {member.photo && <p className="file-name">File selected</p>} {/* Show default text */}
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
          {loading ? "Registering..." :!status? "Submit":"Submitted"}
        </button>
      </form>
    </div>
  );
};

export default Register;
