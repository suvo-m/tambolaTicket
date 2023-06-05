const model = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const { setToken } = require("../utils/jwtToken");

const User = model.userModel;



// user Registration
const userRegister = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  setToken(user, 200, res);
});




// User Login
const userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }
  setToken(user, 200, res);
});


// logging out the user
const userLogout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {expires: new Date(Date.now()),httpOnly: true,});
  res.status(200).json({success: true,message: `${req.user.name} logged out successfully`,});
});




exports.userController = {
  userRegister,
  userLogin,
  userLogout,
};


