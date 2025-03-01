const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  leaderName: { type: String, required: true },
  numMembers: { type: Number, required: true },
  password: { type: String, required: true },
  members: [
    {
      name: { type: String, required: true },
      photoUrl: { type: String },
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
