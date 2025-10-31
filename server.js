// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./db");

const app = express();
const Port = process.env.PORT || 5000;

// ✅ CORS Setup (Place BEFORE routes)
const allowedOrigins = [
  "https://booklt-r8geoheji-sunnyss-projects.vercel.app", // Production
  "https://booklt-smoky.vercel.app", // Another deployed frontend
  "http://localhost:5173", // Local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware after CORS
app.use(express.json());

// ✅ DB Connection
connectDb();

// ✅ Home route (after CORS middleware)
app.get("/", (req, res) => {
  res.send("CORS working fine ✅");
});

// ✅ Routers (after CORS)
const apiRoutes = require("./routes/index");
app.use("/api", apiRoutes);

// ✅ Start server
app.listen(Port, () => {
  console.log(`🚀 Server running on port ${Port}`);
});
