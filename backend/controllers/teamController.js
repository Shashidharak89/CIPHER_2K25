const Team = require("../models/Team");
const bcrypt = require("bcrypt");

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

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({}, "-password"); // Exclude password field
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id, "-password"); // Exclude password field

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUserToEvent = async (req, res) => {
  try {
    const { teamId, eventName, userName, imageUrl } = req.body;
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (!team.events) {
      team.events = {};
    }

    if (!team.events[eventName]) {
      team.events[eventName] = [];
    }

    team.events[eventName].push({ name: userName, photoUrl: imageUrl });
    await team.save();

    res.status(200).json({ message: "User added to event successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserInEvent = async (req, res) => {
  try {
    const { teamId, eventName, userName, newUserName, newImageUrl } = req.body;
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (!team.events || !team.events[eventName]) {
      return res.status(404).json({ message: "Event not found" });
    }

    const user = team.events[eventName].find(member => member.name === userName);
    if (!user) {
      return res.status(404).json({ message: "User not found in event" });
    }

    user.name = newUserName || user.name;
    user.photoUrl = newImageUrl || user.photoUrl;

    await team.save();
    res.status(200).json({ message: "User details updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerTeam, getAllTeams, getUserById, addUserToEvent, updateUserInEvent };