const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const ExamSchedule = require('../models/ExamSchedule');

const getExamSchedules = asyncHandler(async (req, res) => {
  const { class: classId } = req.query;
  const filter = {};
  if (classId) filter.class = classId;

  const schedules = await ExamSchedule.find(filter)
    .populate('class')
    .populate('section')
    .populate('subject')
    .sort('date');

  res.json(new ApiResponse(200, { schedules }));
});

const getExamSchedule = asyncHandler(async (req, res) => {
  const schedule = await ExamSchedule.findById(req.params.id)
    .populate('class')
    .populate('section')
    .populate('subject');

  if (!schedule) {
    throw new ApiError(404, 'Exam schedule not found');
  }

  res.json(new ApiResponse(200, { schedule }));
});

const createExamSchedule = asyncHandler(async (req, res) => {
  const schedule = await ExamSchedule.create(req.body);
  const fullSchedule = await ExamSchedule.findById(schedule._id)
    .populate('class')
    .populate('section')
    .populate('subject');

  res.status(201).json(new ApiResponse(201, { schedule: fullSchedule }, 'Exam schedule created successfully'));
});

const updateExamSchedule = asyncHandler(async (req, res) => {
  const schedule = await ExamSchedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('class')
    .populate('section')
    .populate('subject');

  if (!schedule) {
    throw new ApiError(404, 'Exam schedule not found');
  }

  res.json(new ApiResponse(200, { schedule }, 'Exam schedule updated successfully'));
});

const deleteExamSchedule = asyncHandler(async (req, res) => {
  const schedule = await ExamSchedule.findByIdAndDelete(req.params.id);
  if (!schedule) {
    throw new ApiError(404, 'Exam schedule not found');
  }
  res.json(new ApiResponse(200, {}, 'Exam schedule deleted successfully'));
});

module.exports = { getExamSchedules, getExamSchedule, createExamSchedule, updateExamSchedule, deleteExamSchedule };
