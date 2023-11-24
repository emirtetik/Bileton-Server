const mongoose = require("mongoose");
// const MONGO_URL = process.env.MONGO_URL;

const env = {
  db: "mongodb+srv://mrramicevic:1234@cluster0.dkckweg.mongodb.net/eventApp",
};
const connectDB = async () => {
  try {
    await mongoose.connect(env.db);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error.message);
  
  }
};

module.exports = connectDB;
