const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const Student = require('../models/Student');
const Class = require('../models/Class');
const Attendance = require('../models/Attendance');
const Assignment = require('../models/Assignment');
const Homework = require('../models/Homework');
const Result = require('../models/Result');
const ExamSchedule = require('../models/ExamSchedule');
const Event = require('../models/Event');
const Notice = require('../models/Notice');
const Timetable = require('../models/Timetable');
const LeaveRequest = require('../models/LeaveRequest');

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

const getMyProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({ user: req.user._id })
    .populate('user', '-password')
    .populate('classes')
    .populate('subjects');

  if (!teacher) {
    throw new ApiError(404, 'Teacher profile not found');
  }

  res.json(new ApiResponse(200, { teacher }));
});

const getMyStudents = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({ user: req.user._id }).populate('classes');
  if (!teacher) {
    throw new ApiError(404, 'Teacher profile not found');
  }

  const classIds = teacher.classes.map((c) => c._id);

  const filter = { class: { $in: classIds } };
  if (req.query.class) filter.class = req.query.class;
  if (req.query.section) filter.section = req.query.section;
  if (req.query.subject) filter.subject = req.query.subject;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skip = (page - 1) * limit;

  const students = await Student.find(filter)
    .populate('user', '-password')
    .populate('class')
    .populate('section')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Student.countDocuments({ class: { $in: classIds } });

  const studentIds = students.map((s) => s._id);
  const attendanceRecords = await Attendance.aggregate([
    { $match: { student: { $in: studentIds } } },
    { $group: { _id: '$student', total: { $sum: 1 }, present: { $sum: { $cond: [{ $eq: ['$status', 'Present'] }, 1, 0] } } } },
  ]);

  const attendanceMap = {};
  attendanceRecords.forEach((r) => {
    attendanceMap[r._id.toString()] = {
      total: r.total,
      present: r.present,
      percentage: r.total > 0 ? Math.round((r.present / r.total) * 100) : 0,
    };
  });

  const studentsWithAttendance = students.map((s) => ({
    ...s.toObject(),
    attendance: attendanceMap[s._id.toString()] || { total: 0, present: 0, percentage: 0 },
  }));

  res.json(
    new ApiResponse(200, {
      students: studentsWithAttendance,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getMyDashboard = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({ user: req.user._id }).populate('classes').populate('subjects');
  if (!teacher) {
    throw new ApiError(404, 'Teacher profile not found');
  }

  const classIds = teacher.classes.map((c) => c._id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDay = dayNames[today.getDay()];

  const [
    totalStudents,
    pendingAssignments,
    pendingHomework,
    todayTimetable,
    todayAttendance,
    upcomingExams,
    recentEvents,
    notices,
  ] = await Promise.all([
    Student.countDocuments({ class: { $in: classIds } }),
    Assignment.countDocuments({ teacher: teacher._id }),
    Homework.countDocuments({ teacher: teacher._id }),
    Timetable.find({ class: { $in: classIds }, day: todayDay })
      .populate('class')
      .populate('section')
      .populate('periods.subject')
      .populate('periods.teacher'),
    Attendance.countDocuments({
      class: { $in: classIds },
      date: { $gte: today, $lte: todayEnd },
    }),
    ExamSchedule.find({ class: { $in: classIds }, date: { $gte: today } })
      .populate('subject')
      .populate('class')
      .sort('date')
      .limit(5),
    Event.find({ date: { $gte: today }, isUpcoming: true }).sort('date').limit(5),
    Notice.find({
      $or: [
        { targetAudience: { $in: ['All', 'Teachers'] } },
        { class: { $in: classIds } },
      ],
      isActive: true,
    }).sort('-createdAt').limit(5),
  ]);

  res.json(
    new ApiResponse(200, {
      teacher,
      stats: {
        assignedClasses: teacher.classes.length,
        totalStudents,
        subjects: teacher.subjects.length,
        pendingAssignments,
        pendingHomework,
        todayAttendance,
      },
      todayTimetable,
      upcomingExams,
      recentEvents,
      notices,
    })
  );
});

const getMyTimetable = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({ user: req.user._id }).populate('classes');
  if (!teacher) {
    throw new ApiError(404, 'Teacher profile not found');
  }

  const classIds = teacher.classes.map((c) => c._id);

  const timetables = await Timetable.find({ class: { $in: classIds } })
    .populate('class')
    .populate('section')
    .populate('periods.subject')
    .populate('periods.teacher')
    .sort('day');

  res.json(new ApiResponse(200, { timetables }));
});

const getMyLeaves = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const leaves = await LeaveRequest.find({ user: req.user._id })
    .populate('approvedBy', '-password')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await LeaveRequest.countDocuments({ user: req.user._id });

  res.json(
    new ApiResponse(200, {
      leaves,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const createMyLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.create({ ...req.body, user: req.user._id });
  const fullLeave = await LeaveRequest.findById(leave._id).populate('approvedBy', '-password');
  res.status(201).json(new ApiResponse(201, { leave: fullLeave }, 'Leave request submitted successfully'));
});

module.exports = {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getMyProfile,
  getMyStudents,
  getMyDashboard,
  getMyTimetable,
  getMyLeaves,
  createMyLeave,
};
