const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*"
}));

app.use("/api", require("./routes/auth"));
app.use("/api/items", require("./routes/items"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log("Server running");
});

const auth = require("./middleware/auth");

app.get("/protected", auth, (req, res) => {
  res.json({ msg: "You are authorized", user: req.user });
});