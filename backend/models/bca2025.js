// models/bca2025.js
const mongoose = require("mongoose");

const bca2025Schema = new mongoose.Schema({
  name: { type: String, required: true },
  profileLink: { type: String, default: "https://instagram.com" },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Bca2025", bca2025Schema);
