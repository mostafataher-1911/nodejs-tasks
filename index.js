const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');


require("dotenv").config();

const app = express();

const postRoutes = require("./Routers/postRoutes"); 
const userRoutes = require("./Routers/users");  

app.use(helmet());
app.use(mongoSanitize());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/users", userRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Error:", err));

app.use('/api', postRoutes);  

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.post("/about", (req, res) => {
  res.status(201).json({ message: "about" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running");
});
