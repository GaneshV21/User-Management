const Token = require("../models/token.js");
exports.tokenCheck = async function (req, res, next) {
  try {
    const tokenHeader = req.headers["x-auth-header"];

    if (!tokenHeader) {
      return res.status(401).json({ data: {}, message: "Token is Mandatory" });
    }

    const token = await Token.findOne({ token: tokenHeader });

    if (!token) {
      return res
        .status(401)
        .json({ data: {}, message: "Token is Wrong or Expired" });
    }
    next();
  } catch (e) {
    next(e);
  }
};
