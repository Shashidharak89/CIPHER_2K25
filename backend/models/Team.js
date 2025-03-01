import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamLeader: { type: String, required: true },
  contactNumber: { type: String, required: true },
  membersCount: { type: Number, required: true },
  members: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true }, // Cloudinary URL
    }
  ],
  password: { type: String, required: true } // Bcrypted
});

export default mongoose.model("Team", TeamSchema);
