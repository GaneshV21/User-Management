let Auth = require("../models/auth");
const { generateToken } = require("../utils/token");

exports.login = async function (req, res, next) {
  try {
    let { email, password } = req.body;
    const userData = await Auth.findOne({ email, password });
    if (userData) {
      let token = await generateToken(email);
      res
        .status(200)
        .json({ data: token, message: "User Login Successfully Done" });
    } else {
      res.status(401).json({ data: {}, message: "User Not Found" });
    }
  } catch (e) {
    next(e);
  }
};
