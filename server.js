// Load environment variables from .env file
require('dotenv').config();

const express = require("express")
const app = express()
const Port = process.env.PORT || 5000; 


//home route for check
app.get("/",(req,res)=>{
    res.send('check route')
})

// json body parser
app.use(express.json())

// db connection
const connecteDb = require("./db")
connecteDb()

// for frontend access (CORS)
const cors = require("cors")
// app.use(cors())
app.use(cors({ origin: "https://booklt-r8geoheji-sunnyss-projects.vercel.app", methods: ["GET", "POST", "PUT", "DELETE"] }));


// router setup
const apiRoutes = require("./routes/index")
app.use("/api", apiRoutes)

app.get("/", (req, res) => {
    res.send("Booklt Backend is Running!")
})

app.listen(Port, () => {
    console.log(`Server Running on PORT ${Port}`)
})
