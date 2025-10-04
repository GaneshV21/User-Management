const crypto = require("crypto");
const Token = require("../models/token.js");
const sha256 = require("sha256");

async function generateToken(email) {
  const token = crypto.randomBytes(32).toString("hex");

  let tokenAlreadyPresent = await Token.findOne({ email });
  if (tokenAlreadyPresent) {
    return tokenAlreadyPresent.token;
  } else {
    await Token.create({ email, token });
    return token;
  }
}

function hash(str) {
  return sha256(str + process.env.secret || "demo");
}
module.exports = { generateToken, hash };
