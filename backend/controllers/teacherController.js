const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Teacher = require('../models/Teacher');
const User = require('../models/User');

const getTeachers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const teachers = await Teacher.find()
    .populate('user', '-password')
    .populate('classes')
    .populate('subjects')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Teacher.countDocuments();

  res.json(
    new ApiResponse(200, {
      teachers,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id)
    .populate('user', '-password')
    .populate('classes')
    .populate('subjects');

  if (!teacher) {
    throw new ApiError(404, 'Teacher not found');
  }

  res.json(new ApiResponse(200, { teacher }));
});

const createTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, phone, ...teacherData } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists with this email');
  }

  const user = await User.create({ name, email, password, role: 'teacher', phone });
  const teacher = await Teacher.create({ user: user._id, ...teacherData });

  const fullTeacher = await Teacher.findById(teacher._id)
    .populate('user', '-password')
    .populate('classes')
    .populate('subjects');

  res.status(201).json(new ApiResponse(201, { teacher: fullTeacher }, 'Teacher created successfully'));
});

const updateTeacher = asyncHandler(async (req, res) => {
  const { name, email, phone, ...teacherData } = req.body;
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    throw new ApiError(404, 'Teacher not found');
  }

  if (name || email || phone) {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    await User.findByIdAndUpdate(teacher.user, updateData, { runValidators: true });
  }

  const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, teacherData, {
    new: true,
    runValidators: true,
  })
    .populate('user', '-password')
    .populate('classes')
    .populate('subjects');

  res.json(new ApiResponse(200, { teacher: updatedTeacher }, 'Teacher updated successfully'));
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    throw new ApiError(404, 'Teacher not found');
  }

  await User.findByIdAndDelete(teacher.user);
  await Teacher.findByIdAndDelete(req.params.id);

  res.json(new ApiResponse(200, {}, 'Teacher deleted successfully'));
});

module.exports = { getTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher };
