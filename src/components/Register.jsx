import { useState } from "react";
import "./styles/Register.css";

const Register = () => {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [numMembers, setNumMembers] = useState(0);
  const [members, setMembers] = useState([]);
  const [password, setPassword] = useState("");

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleFileUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleMemberChange(index, "photo", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ teamName, leaderName, numMembers, members, password });
    alert("Registration Successful!");
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register Your Team</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Team Name" required value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        <input type="text" placeholder="Team Leader Name" required value={leaderName} onChange={(e) => setLeaderName(e.target.value)} />
        <input type="number" min="1" max="10" placeholder="Number of Members" required value={numMembers} onChange={(e) => {
          setNumMembers(e.target.value);
          setMembers(Array.from({ length: e.target.value }, () => ({ name: "", photo: "" })));
        }} />
        
        {members.map((member, index) => (
          <div key={index} className="member-input">
            <input type="text" placeholder={`Member ${index + 1} Name`} required value={member.name} onChange={(e) => handleMemberChange(index, "name", e.target.value)} />
            <input type="file" accept="image/*" required onChange={(e) => handleFileUpload(index, e.target.files[0])} />
          </div>
        ))}

        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="register-btn">Submit</button>
      </form>
    </div>
  );
};

export default Register;
