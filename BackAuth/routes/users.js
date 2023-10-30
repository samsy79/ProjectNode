var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const UsersController = require("../controller/UsersController");
const {isAuthenticate} = require("../middleware/auth");
const dotenv =require ('dotenv')
dotenv.config({path:'./config/config.env'})


/* GET users listing. */
router.get("/", UsersController.getUsers);
router.post("/", UsersController.postUser);
router.post('/register', UsersController.register)
router.post('/login', UsersController.login)
router.get ('/allOfMe', UsersController.allInfo)
router.get('/mail',UsersController.mailling)

module.exports = router;
