const TeamNoPhoto = require("../models/TeamNoPhoto");
const bcrypt = require("bcrypt");

// Register a new team without photoUrl
const registerTeamNoPhoto = async (req, res) => {
  try {
    const { teamName, leaderName, numMembers, password, members } = req.body;
    const parsedMembers = JSON.parse(members); // Convert string to object

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password

    const memberDetails = parsedMembers.map((member) => ({
      name: member.name
    }));

    const newTeam = new TeamNoPhoto({
      teamName,
      leaderName,
      numMembers,
      password: hashedPassword,
      members: memberDetails,
    });

    await newTeam.save();
    res.status(201).json({ message: "Team without photo registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all teams (excluding password)
const getAllTeamsNoPhoto = async (req, res) => {
  try {
    const teams = await TeamNoPhoto.find().select("-password");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify password (GET /:id/:password)
const verifyTeamPasswordNoPhoto = async (req, res) => {
  try {
    const { id, password } = req.params;

    const team = await TeamNoPhoto.findById(id);
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
const verifyServer = async (req, res) => {
  res.status(200).send(true);
}
module.exports = { registerTeamNoPhoto, getAllTeamsNoPhoto, verifyTeamPasswordNoPhoto,verifyServer };
