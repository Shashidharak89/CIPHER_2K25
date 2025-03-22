const express = require("express");
const { 
  registerTeamNoPhoto, 
  getAllTeamsNoPhoto, 
  verifyTeamPasswordNoPhoto ,
  verifyServer
} = require("../controllers/teamControllerNoPhoto");

const router = express.Router();

router.post("/register", registerTeamNoPhoto);
router.get("/getusers", getAllTeamsNoPhoto);
router.get("/:id/:password", verifyTeamPasswordNoPhoto);
router.get("/verifyserver",verifyServer);

module.exports = router;
