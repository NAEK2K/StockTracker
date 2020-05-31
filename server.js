const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

app.listen(6969, () => {
  console.log("Running on localhost:6969");
});
