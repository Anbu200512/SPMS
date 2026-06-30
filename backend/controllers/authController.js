const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, ...profileData } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists with this email');
  }

  const user = await User.create({ name, email, password, role, phone });

  let profile = null;
  if (role === 'student') {
    profile = await Student.create({ user: user._id, ...profileData });
  } else if (role === 'teacher') {
    profile = await Teacher.create({ user: user._id, ...profileData });
  } else if (role === 'admin') {
    profile = await Admin.create({ user: user._id, ...profileData });
  }

  const token = generateToken(user._id);

  const userData = user.toObject();
  delete userData.password;

  res.status(201).json(
    new ApiResponse(201, { user: userData, profile, token }, 'User registered successfully')
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id);

  const userData = user.toObject();
  delete userData.password;

  res.json(new ApiResponse(200, { user: userData, token }, 'Login successful'));
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  let profile = null;
  if (user.role === 'student') {
    profile = await Student.findOne({ user: user._id }).populate('class section');
  } else if (user.role === 'teacher') {
    profile = await Teacher.findOne({ user: user._id }).populate('classes subjects');
  } else if (user.role === 'admin') {
    profile = await Admin.findOne({ user: user._id });
  }

  res.json(new ApiResponse(200, { user, profile }));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found with this email');
  }

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  res.json(new ApiResponse(200, { resetToken }, 'Password reset token generated'));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired token');
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json(new ApiResponse(200, {}, 'Password reset successful'));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.json(new ApiResponse(200, {}, 'Password updated successfully'));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, email, phone },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(new ApiResponse(200, { user }, 'Profile updated successfully'));
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
};
