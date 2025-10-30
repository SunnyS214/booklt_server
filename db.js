require('dotenv').config();

const mongoose = require("mongoose")


const connectDB = async (params) => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('connected to databse 🟢')
  } catch (error) {
    console.log("new  error", error)
    console.log('connected failed ❌')

  }
};

module.exports = connectDB









