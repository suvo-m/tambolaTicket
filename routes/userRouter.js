const express = require("express");

const router = express.Router();
const {userController}  = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");



router
.post("/register", userController.userRegister)
.post("/login", userController.userLogin)
.get("/logout", isAuthenticated, userController.userLogout);

exports.userRoutes = router;

//module.exports = router
