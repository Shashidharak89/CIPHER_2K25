// controllers/bca2025Controller.js
const Bca2025 = require("../models/bca2025");

const uploadUser = async (req, res) => {
  try {
    const { name, profileLink } = req.body;
    const imageUrl = req.file.path;

    const newUser = new Bca2025({
      name,
      profileLink: profileLink || "https://instagram.com",
      imageUrl,
    });

    await newUser.save();
    res.status(201).json({ message: "User uploaded successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Bca2025.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Fetching users failed", error: error.message });
  }
};

module.exports = {
  uploadUser,
  getAllUsers,
};
