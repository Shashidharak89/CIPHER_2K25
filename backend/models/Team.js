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
  events: {
    coding: [
      {
        eventName: { type: String, required: true, default: "bug_slayer" },
        noOfParticipants: { type: Number, required: true, default: 2 },
        teamName: { type: String, required: true },
        members: [
          {
            name: { type: String, required: true },
            photoUrl: { type: String },
          },
        ],
      },
    ],
    webDesign: [
      {
        eventName: { type: String, required: true, default: "design_maze" },
        noOfParticipants: { type: Number, required: true, default: 2 },
        teamName: { type: String, required: true },
        members: [
          {
            name: { type: String, required: true },
            photoUrl: { type: String },
          },
        ],
      },
    ],
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
