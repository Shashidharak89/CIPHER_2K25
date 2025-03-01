import express from "express";
import { registerTeam, upload } from "../controllers/teamController.js";

const router = express.Router();

router.post("/register", upload.array("images", 5), registerTeam); // Accepts multiple images

export default router;
