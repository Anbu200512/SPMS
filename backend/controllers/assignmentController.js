const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Assignment = require('../models/Assignment');

const getAssignments = asyncHandler(async (req, res) => {
  const { class: classId, section, subject } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (classId) filter.class = classId;
  if (section) filter.section = section;
  if (subject) filter.subject = subject;

  const assignments = await Assignment.find(filter)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Assignment.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      assignments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  if (!assignment) {
    throw new ApiError(404, 'Assignment not found');
  }

  res.json(new ApiResponse(200, { assignment }));
});

const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.create({ ...req.body, teacher: req.body.teacher || req.user._id });
  const fullAssignment = await Assignment.findById(assignment._id)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  res.status(201).json(new ApiResponse(201, { assignment: fullAssignment }, 'Assignment created successfully'));
});

const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  if (!assignment) {
    throw new ApiError(404, 'Assignment not found');
  }

  res.json(new ApiResponse(200, { assignment }, 'Assignment updated successfully'));
});

const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);
  if (!assignment) {
    throw new ApiError(404, 'Assignment not found');
  }
  res.json(new ApiResponse(200, {}, 'Assignment deleted successfully'));
});

module.exports = { getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment };
