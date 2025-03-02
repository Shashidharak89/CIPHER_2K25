const express = require("express");
const { registerTeam,getAllTeams, verifyTeamPassword } = require("../controllers/teamController"); // Corrected import
const multer = require("multer");
const { cloudinaryStorage } = require("../utils/multerConfig"); // Only cloudinaryStorage should be imported

const upload = multer({ storage: cloudinaryStorage });
const router = express.Router();

router.post("/register", upload.array("photos"), registerTeam);
router.get("/getusers",getAllTeams);
router.get("/:id/:password", verifyTeamPassword); // Now correctly using the function

module.exports = router;
