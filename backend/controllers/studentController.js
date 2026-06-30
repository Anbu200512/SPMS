const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Student = require('../models/Student');
const User = require('../models/User');

const getStudents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const students = await Student.find()
    .populate('user', '-password')
    .populate('class')
    .populate('section')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Student.countDocuments();

  res.json(
    new ApiResponse(200, {
      students,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate('user', '-password')
    .populate('class')
    .populate('section');

  if (!student) {
    throw new ApiError(404, 'Student not found');
  }

  res.json(new ApiResponse(200, { student }));
});

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, password, phone, ...studentData } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists with this email');
  }

  const user = await User.create({ name, email, password, role: 'student', phone });
  const student = await Student.create({ user: user._id, ...studentData });

  const fullStudent = await Student.findById(student._id)
    .populate('user', '-password')
    .populate('class')
    .populate('section');

  res.status(201).json(new ApiResponse(201, { student: fullStudent }, 'Student created successfully'));
});

const updateStudent = asyncHandler(async (req, res) => {
  const { name, email, phone, ...studentData } = req.body;
  const student = await Student.findById(req.params.id);

  if (!student) {
    throw new ApiError(404, 'Student not found');
  }

  if (name || email || phone) {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    await User.findByIdAndUpdate(student.user, updateData, { runValidators: true });
  }

  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, studentData, {
    new: true,
    runValidators: true,
  })
    .populate('user', '-password')
    .populate('class')
    .populate('section');

  res.json(new ApiResponse(200, { student: updatedStudent }, 'Student updated successfully'));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    throw new ApiError(404, 'Student not found');
  }

  await User.findByIdAndDelete(student.user);
  await Student.findByIdAndDelete(req.params.id);

  res.json(new ApiResponse(200, {}, 'Student deleted successfully'));
});

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent };
