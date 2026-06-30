const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Admin = require('../models/Admin');
const User = require('../models/User');

const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().populate('user', '-password');
  res.json(new ApiResponse(200, { admins }));
});

const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id).populate('user', '-password');
  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }
  res.json(new ApiResponse(200, { admin }));
});

const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, phone, ...adminData } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists with this email');
  }

  const user = await User.create({ name, email, password, role: 'admin', phone });
  const admin = await Admin.create({ user: user._id, ...adminData });

  const fullAdmin = await Admin.findById(admin._id).populate('user', '-password');

  res.status(201).json(new ApiResponse(201, { admin: fullAdmin }, 'Admin created successfully'));
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { name, email, phone, ...adminData } = req.body;
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  if (name || email || phone) {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    await User.findByIdAndUpdate(admin.user, updateData, { runValidators: true });
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, adminData, {
    new: true,
    runValidators: true,
  }).populate('user', '-password');

  res.json(new ApiResponse(200, { admin: updatedAdmin }, 'Admin updated successfully'));
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  await User.findByIdAndDelete(admin.user);
  await Admin.findByIdAndDelete(req.params.id);

  res.json(new ApiResponse(200, {}, 'Admin deleted successfully'));
});

module.exports = { getAdmins, getAdmin, createAdmin, updateAdmin, deleteAdmin };
