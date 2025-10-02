const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  profile_link: String,
});
module.exports = mongoose.model("users", schema);
