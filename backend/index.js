const express = require("express");
const app = require("./app.js");
const dotenv = require('dotenv').config()
const { client } = require('./dbConnection.js');

const port = process.env.PORT;

const server = express();
server.use(app);


server.listen(port, () => {
  //console.log(`Server started on ${port}`);
})