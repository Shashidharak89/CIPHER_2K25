const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const teamRoutes = require("./routes/teamRoutes");
const eventRoutes=require("./routes/eventRoutes");
const teamNoPhotoRoutes=require("./routes/teamNoPhotoRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api/team", teamRoutes);
app.use("/api/teamlatest", teamNoPhotoRoutes);
app.use("/api/event", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
