const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Result = require('../models/Result');

const getResults = asyncHandler(async (req, res) => {
  const { class: classId, section, examName, student } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (classId) filter.class = classId;
  if (section) filter.section = section;
  if (examName) filter.examName = examName;
  if (student) filter.student = student;

  const results = await Result.find(filter)
    .populate('student')
    .populate('class')
    .populate('section')
    .populate('subject')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Result.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      results,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getResult = asyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id)
    .populate('student')
    .populate('class')
    .populate('section')
    .populate('subject');

  if (!result) {
    throw new ApiError(404, 'Result not found');
  }

  res.json(new ApiResponse(200, { result }));
});

const createResult = asyncHandler(async (req, res) => {
  const result = await Result.create(req.body);
  const fullResult = await Result.findById(result._id)
    .populate('student')
    .populate('class')
    .populate('section')
    .populate('subject');

  res.status(201).json(new ApiResponse(201, { result: fullResult }, 'Result created successfully'));
});

const updateResult = asyncHandler(async (req, res) => {
  const result = await Result.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('student')
    .populate('class')
    .populate('section')
    .populate('subject');

  if (!result) {
    throw new ApiError(404, 'Result not found');
  }

  res.json(new ApiResponse(200, { result }, 'Result updated successfully'));
});

const deleteResult = asyncHandler(async (req, res) => {
  const result = await Result.findByIdAndDelete(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Result not found');
  }
  res.json(new ApiResponse(200, {}, 'Result deleted successfully'));
});

const bulkCreateResults = asyncHandler(async (req, res) => {
  const { results } = req.body;

  if (!Array.isArray(results) || results.length === 0) {
    throw new ApiError(400, 'Results array is required');
  }

  const created = await Result.insertMany(results);

  const fullResults = await Result.find({ _id: { $in: created.map((r) => r._id) } })
    .populate('student')
    .populate('class')
    .populate('section')
    .populate('subject');

  res.status(201).json(new ApiResponse(201, { results: fullResults }, 'Results created successfully'));
});

module.exports = { getResults, getResult, createResult, updateResult, deleteResult, bulkCreateResults };
