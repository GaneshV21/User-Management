var express = require("express");
var router = express.Router();

var AuthController = require("../controllers/AuthController");
router.post("/v1/login", AuthController.login);
module.exports = router;
