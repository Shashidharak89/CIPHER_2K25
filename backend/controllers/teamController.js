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

module.exports = { registerTeam }; 