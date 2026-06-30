const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Attendance = require('../models/Attendance');

const getAttendance = asyncHandler(async (req, res) => {
  const { class: classId, section, date, student } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const filter = {};
  if (classId) filter.class = classId;
  if (section) filter.section = section;
  if (date) filter.date = new Date(date);
  if (student) filter.student = student;

  const records = await Attendance.find(filter)
    .populate('student')
    .populate('class')
    .populate('section')
    .populate('markedBy', '-password')
    .skip(skip)
    .limit(limit)
    .sort('-date');

  const total = await Attendance.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      records,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const markAttendance = asyncHandler(async (req, res) => {
  const { records } = req.body;

  if (!Array.isArray(records) || records.length === 0) {
    throw new ApiError(400, 'Attendance records array is required');
  }

  const results = [];
  for (const record of records) {
    const { student, class: classId, section, date, status, remarks } = record;
    const filter = { student, class: classId, date: new Date(date) };
    if (section) filter.section = section;

    const attendance = await Attendance.findOneAndUpdate(
      filter,
      { status, remarks, markedBy: req.user._id, ...filter },
      { upsert: true, new: true, runValidators: true }
    ).populate('student').populate('class');

    results.push(attendance);
  }

  res.json(new ApiResponse(200, { records: results }, 'Attendance marked successfully'));
});

const getStudentAttendance = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const records = await Attendance.find({ student: studentId })
    .populate('class')
    .populate('section')
    .skip(skip)
    .limit(limit)
    .sort('-date');

  const total = await Attendance.countDocuments({ student: studentId });
  const present = await Attendance.countDocuments({ student: studentId, status: 'Present' });
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  res.json(
    new ApiResponse(200, {
      records,
      percentage,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

module.exports = { getAttendance, markAttendance, getStudentAttendance };
