import express from "express";
import { registerTeam } from "../controllers/teamController.js";

const router = express.Router();

// Test API to check server status
router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

router.post("/register", registerTeam);

export default router;
