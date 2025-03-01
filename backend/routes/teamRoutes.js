const express = require("express");
const { registerTeam } = require("../controllers/teamController");
const multer = require("multer");
const { cloudinaryStorage } = require("../utils/multerConfig");

const upload = multer({ storage: cloudinaryStorage });
const router = express.Router();

router.post("/register", upload.array("photos"), registerTeam);

module.exports = router;
