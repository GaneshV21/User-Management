let User = require("../models/user");

exports.listUsers = async function (req, res, next) {
  try {
    const userList = await User.find({});
    res
      .status(200)
      .json({ data: userList, message: "User List Successfully Done" });
  } catch (e) {
    next(e);
  }
};

exports.createUser = async function (req, res, next) {
  try {
    let { first_name, last_name, email, profile_link } = req.body;
    const userCreate = await User.create({
      first_name,
      last_name,
      email,
      profile_link,
    });
    res.status(200).json({ data: userCreate, message: "User Created Done" });
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async function (req, res, next) {
  try {
    let body = req.body;
    let user_id = req.params.user_id;
    let response = await User.findOne({ _id: user_id });
    if (body?.first_name) response.first_name = body.first_name;
    if (body?.last_name) response.last_name = body.last_name;
    if (body?.email) response.email = body.email;
    if (body?.profile_link) response.profile_link = body.profile_link;
    await response.save();
    res.status(200).json({ data: response, message: "User Updated Done" });
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    let user_id = req.params.user_id;
    await User.deleteOne({
      _id: user_id,
    });
    res.status(200).json({ data: {}, message: "User Deleted Done" });
  } catch (e) {
    next(e);
  }
};
