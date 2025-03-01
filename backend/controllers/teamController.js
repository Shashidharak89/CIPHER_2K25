import Team from "../models/Team.js"; // Add `.js` extension
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const registerTeam = async (req, res) => {
  try {
    const { teamName, teamLeader, contactNumber, membersCount, members, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload images to Cloudinary
    const uploadedMembers = await Promise.all(members.map(async (member) => {
      const result = await cloudinary.uploader.upload(member.image);
      return { name: member.name, image: result.secure_url };
    }));

    // Save to MongoDB
    const newTeam = new Team({
      teamName,
      teamLeader,
      contactNumber,
      membersCount,
      members: uploadedMembers,
      password: hashedPassword
    });

    await newTeam.save();
    res.status(201).json({ message: "Team registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
