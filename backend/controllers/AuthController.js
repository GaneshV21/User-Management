let Auth = require("../models/auth");
const { generateToken } = require("../utils/token");

exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // Check in database
    const userData = await Auth.findOne({ email, password });

    if (userData) {
      const token = await generateToken(email);
      return res.status(200).json({
        data: token,
        message: "User login successful",
      });
    }

    // Check for admin credentials from environment variables
    if (email === process.env.email && password === process.env.password) {
      const token = await generateToken(email);
      return res.status(200).json({
        data: token,
        message: "Admin login successful",
      });
    }

    // If neither found
    return res.status(401).json({
      data: {},
      message: "Invalid email or password",
    });
  } catch (err) {
    next(err);
  }
};
