const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Homework = require('../models/Homework');

const getHomework = asyncHandler(async (req, res) => {
  const { class: classId, section, subject } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (classId) filter.class = classId;
  if (section) filter.section = section;
  if (subject) filter.subject = subject;

  const homework = await Homework.find(filter)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Homework.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      homework,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getHomeworkById = asyncHandler(async (req, res) => {
  const homework = await Homework.findById(req.params.id)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  if (!homework) {
    throw new ApiError(404, 'Homework not found');
  }

  res.json(new ApiResponse(200, { homework }));
});

const createHomework = asyncHandler(async (req, res) => {
  const homework = await Homework.create({ ...req.body, teacher: req.body.teacher || req.user._id });
  const fullHomework = await Homework.findById(homework._id)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  res.status(201).json(new ApiResponse(201, { homework: fullHomework }, 'Homework created successfully'));
});

const updateHomework = asyncHandler(async (req, res) => {
  const homework = await Homework.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  if (!homework) {
    throw new ApiError(404, 'Homework not found');
  }

  res.json(new ApiResponse(200, { homework }, 'Homework updated successfully'));
});

const deleteHomework = asyncHandler(async (req, res) => {
  const homework = await Homework.findByIdAndDelete(req.params.id);
  if (!homework) {
    throw new ApiError(404, 'Homework not found');
  }
  res.json(new ApiResponse(200, {}, 'Homework deleted successfully'));
});

module.exports = { getHomework, getHomeworkById, createHomework, updateHomework, deleteHomework };
