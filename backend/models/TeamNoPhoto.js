const mongoose = require("mongoose");  

const teamNoPhotoSchema = new mongoose.Schema({  
  teamName: { type: String, required: true },  
  leaderName: { type: String, required: true },  
  numMembers: { type: Number, required: true },  
  password: { type: String, required: true },  
  members: [  
    {  
      name: { type: String, required: true }  
    },  
  ],  
});  

const TeamNoPhoto = mongoose.model("TeamNoPhoto", teamNoPhotoSchema);  
module.exports = TeamNoPhoto;
