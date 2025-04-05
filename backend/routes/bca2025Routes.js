// routes/bca2025Routes.js
const express = require("express");
const router = express.Router();
const upload = require("../multer");
const { uploadUser, getAllUsers } = require("../controllers/bca2025Controller");

router.post("/upload", upload.single("image"), uploadUser);
router.get("/users", getAllUsers);

module.exports = router;
