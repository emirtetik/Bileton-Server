const express = require("express");
var cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const eventRouter = require("./routes/eventRoutes");

const app = express();
const PORT = 8080;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/event", eventRouter);

app.listen(PORT, () => {
  console.log("Server is runnig..");
});
