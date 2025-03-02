const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  eventname: {
    type: String,
    required: true,
  },
  maxparticipants: {
    type: Number,
    required: true,
  },
  participants: [
    {
      teamname: {
        type: String,
        required: true,
      },
      teamid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
      members: [
        {
          membername: {
            type: String,
            required: true,
          },
          imageUrl: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Event", EventSchema);