const mongoose = require("mongoose");

module.exports = mongoose.model("Users", {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
  });