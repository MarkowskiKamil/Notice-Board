const mongoose = require("mongoose");

module.exports = mongoose.model("Users", {
    login: String,
    password: String,
    firstName: String,
    lastName: String,
  });