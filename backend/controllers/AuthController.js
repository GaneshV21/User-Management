let Auth = require("../models/auth");
const { generateToken } = require("../utils/token");

exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const userData = await Auth.findOne({ email });
    if (!userData) {
      return res.status(401).json({
        data: {},
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await userData.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        data: {},
        message: "Invalid email or password",
      });
    }

    const token = await generateToken(email);
    let reponse = { token, email, name: userData.name };

    return res.status(200).json({
      data: reponse,
      message: "User login successful",
    });
  } catch (err) {
    next(err);
  }
};

exports.signup = async function (req, res, next) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        data: {},
        message: "Missing Mandatory Fields",
      });
    }
    let emailAlreadyExist = await Auth.findOne({ email });
    if (emailAlreadyExist) {
      return res.status(400).json({
        data: {},
        message: "Email Already Exist",
      });
    }
    await Auth.create({ email, password, name });
    return res.status(200).json({
      data: { email },
      message: "Signup Successfully",
    });
  } catch (err) {
    next(err);
  }
};
