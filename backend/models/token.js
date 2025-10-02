const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "1h" },
});
module.exports = mongoose.model("token", schema);
