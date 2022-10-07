const express = require("express");

const app = express();
app.use(express.json())

// Set port
app.set('port', 8080)




module.exports = app;