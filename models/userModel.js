const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// utility function for validating email
/*const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};*/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    //validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    //minLength: [8, "Password should be greater than 8 characters"],
  },
  token: {
    type: String,
  },
});

// encrypting the password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = parseInt(process.env.SALT);
  this.password = await bcrypt.hash(this.password, salt);
});

// JWT authentication
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

exports.userModel = new mongoose.model("User", userSchema);
