import Team from "../models/Team.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer Storage (Temporary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const registerTeam = async (req, res) => {
  try {
    const { teamName, teamLeader, contactNumber, membersCount, password } = req.body;
    
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload Images to Cloudinary
    const uploadedMembers = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload_stream({
          folder: "team_members"
        }, (error, result) => {
          if (error) throw new Error(error);
          return result.secure_url;
        }).end(file.buffer);
        
        return { name: req.body.memberNames, image: result };
      })
    );

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

// Export Multer Upload Middleware
export { upload };
