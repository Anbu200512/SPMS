const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit).sort('-createdAt');
  const total = await User.countDocuments();

  res.json(
    new ApiResponse(200, {
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  res.json(new ApiResponse(200, { user }));
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, role, isActive } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, phone, role, isActive },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(new ApiResponse(200, { user }, 'User updated successfully'));
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  res.json(new ApiResponse(200, {}, 'User deleted successfully'));
});

module.exports = { getUsers, getUser, updateUser, deleteUser };
