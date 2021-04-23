const path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

// ? Making Static folder
app.use(express.static(path.join(__dirname, "RockPaperScissor")));

app.listen(PORT, console.log(`Server Started on Port: ${PORT}`));
