const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./asyncError");
const model = require("../models/userModel");

const User = model.userModel;

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource"), 401);
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});
