const crypto = require("crypto");
const Token = require("../models/token.js");

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

module.exports = { generateToken };
