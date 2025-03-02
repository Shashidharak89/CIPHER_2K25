const Team = require("../models/Team");
const bcrypt = require("bcrypt");

// Register a new team
const registerTeam = async (req, res) => {
  try {
    const { teamName, leaderName, numMembers, password, members } = req.body;
    const parsedMembers = JSON.parse(members); // Convert string to object

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password

    const memberDetails = parsedMembers.map((member, index) => ({
      name: member.name,
      photoUrl: req.files[index]?.path || null, // Cloudinary URL
    }));

    const newTeam = new Team({
      teamName,
      leaderName,
      numMembers,
      password: hashedPassword,
      members: memberDetails,
    });

    await newTeam.save();
    res.status(201).json({ message: "Team registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all teams (excluding password)
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().select("-password"); // Exclude password field
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify password (GET /:id/:password)
const verifyTeamPassword = async (req, res) => {
  try {
    const { id, password } = req.params;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }

    const isMatch = await bcrypt.compare(password, team.password);
    if (isMatch) {
      res.json({ success: true, message: "Password is correct" });
    } else {
      res.status(401).json({ success: false, message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { registerTeam, getAllTeams, verifyTeamPassword };
