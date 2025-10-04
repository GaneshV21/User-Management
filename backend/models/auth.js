const mongoose = require("mongoose");
const { hash } = require("../utils/token");

const schema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, set: hash },
  name: { type: String },
});

schema.methods.checkPassword = async function (password) {
  if (hash(password) === this.password) {
    return true;
  }
  return false;
};
module.exports = mongoose.model("auth", schema);
