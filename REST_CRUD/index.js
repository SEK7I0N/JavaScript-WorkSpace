// -- Modules
//const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const postsRoutes = require("./routes/post");

// -- Consts and variables
const app = express();
const PORT = process.env.PORT || 5000;

// -- Middleware
app.use(express.json());
app.use("/Posts", postsRoutes);

// -- Routes
app.get("/", (req, res) => {
  res.send("Hi World!..");
});

// -- Connecting to the Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!: " + mongoose.connection.readyState)
);

// -- Listining to the Server
app.listen(PORT);
