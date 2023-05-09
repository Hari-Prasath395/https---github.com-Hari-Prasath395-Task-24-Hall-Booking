const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const nodeServer = express();
const app = require("./app");
require('./dbconfig');


const port =process.env.PORT || 5000;

nodeServer.use("/", app);

nodeServer.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
