const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Timetable = require('../models/Timetable');

const getTimetable = asyncHandler(async (req, res) => {
  const { class: classId, section, day } = req.query;
  const filter = {};
  if (classId) filter.class = classId;
  if (section) filter.section = section;
  if (day) filter.day = day;

  const timetables = await Timetable.find(filter)
    .populate('class')
    .populate('section')
    .populate('periods.subject')
    .populate('periods.teacher')
    .sort('day');

  res.json(new ApiResponse(200, { timetables }));
});

const getTimetableById = asyncHandler(async (req, res) => {
  const timetable = await Timetable.findById(req.params.id)
    .populate('class')
    .populate('section')
    .populate('periods.subject')
    .populate('periods.teacher');

  if (!timetable) {
    throw new ApiError(404, 'Timetable not found');
  }

  res.json(new ApiResponse(200, { timetable }));
});

const createTimetable = asyncHandler(async (req, res) => {
  const { class: classId, section, day } = req.body;

  const existing = await Timetable.findOne({ class: classId, section, day });
  if (existing) {
    const updated = await Timetable.findByIdAndUpdate(existing._id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('class')
      .populate('section')
      .populate('periods.subject')
      .populate('periods.teacher');

    return res.json(new ApiResponse(200, { timetable: updated }, 'Timetable updated successfully'));
  }

  const timetable = await Timetable.create(req.body);
  const fullTimetable = await Timetable.findById(timetable._id)
    .populate('class')
    .populate('section')
    .populate('periods.subject')
    .populate('periods.teacher');

  res.status(201).json(new ApiResponse(201, { timetable: fullTimetable }, 'Timetable created successfully'));
});

const updateTimetable = asyncHandler(async (req, res) => {
  const timetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('class')
    .populate('section')
    .populate('periods.subject')
    .populate('periods.teacher');

  if (!timetable) {
    throw new ApiError(404, 'Timetable not found');
  }

  res.json(new ApiResponse(200, { timetable }, 'Timetable updated successfully'));
});

const deleteTimetable = asyncHandler(async (req, res) => {
  const timetable = await Timetable.findByIdAndDelete(req.params.id);
  if (!timetable) {
    throw new ApiError(404, 'Timetable not found');
  }
  res.json(new ApiResponse(200, {}, 'Timetable deleted successfully'));
});

module.exports = { getTimetable, getTimetableById, createTimetable, updateTimetable, deleteTimetable };
