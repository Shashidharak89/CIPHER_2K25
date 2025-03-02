const express = require("express");
const { registerTeam } = require("../controllers/teamController");
const multer = require("multer");
const { cloudinaryStorage } = require("../utils/multerConfig");

const upload = multer({ storage: cloudinaryStorage });
const router = express.Router();

router.post("/register", upload.array("photos"), registerTeam);

// router.get('/getusers',getAllTeams);

// router.get('/getuser/:id',getUserById);

// router.post('/adduser',addUserToEvent);

// router.put('/updateuser',updateUserInEvent);

module.exports = router;
