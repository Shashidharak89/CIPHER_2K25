const express = require("express");
const { 
  registerTeamNoPhoto, 
  getAllTeamsNoPhoto, 
  verifyTeamPasswordNoPhoto 
} = require("../controllers/teamControllerNoPhoto");

const router = express.Router();

router.post("/register", registerTeamNoPhoto);
router.get("/getusers", getAllTeamsNoPhoto);
router.get("/:id/:password", verifyTeamPasswordNoPhoto);

module.exports = router;
