var express = require("express");
var router = express.Router();
var UserController = require("../controllers/UserController");
const { tokenCheck } = require("../middlewares/auth");
router.get("/v1/list", tokenCheck, UserController.listUsers);
router.post("/v1/create", tokenCheck, UserController.createUser);
router.put("/v1/update/:user_id", tokenCheck, UserController.updateUser);
router.delete("/v1/delete/:user_id", tokenCheck, UserController.deleteUser);

module.exports = router;
