require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/", urlRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
