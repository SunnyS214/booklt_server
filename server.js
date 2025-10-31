// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./db");

const app = express();
const Port = process.env.PORT || 5000;

const allowedOrigins = [
  "https://booklt-r8geoheji-sunnyss-projects.vercel.app", 
  "https://booklt-smoky.vercel.app",
  "http://localhost:5173", 
];


//cors
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(" Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("check route");
});

const apiRoutes = require("./routes/index");
app.use("/api", apiRoutes);

app.listen(Port, () => {
  console.log(` Server running on port ${Port}`);
});
