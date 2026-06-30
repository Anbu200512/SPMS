const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Admission = require('../models/Admission');
const Event = require('../models/Event');
const Attendance = require('../models/Attendance');
const ExamSchedule = require('../models/ExamSchedule');
const Fee = require('../models/Fee');
const Result = require('../models/Result');
const Notification = require('../models/Notification');

const getAdminDashboard = asyncHandler(async (req, res) => {
  const [
    totalStudents,
    totalTeachers,
    totalClasses,
    pendingAdmissions,
    recentEvents,
  ] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    Class.countDocuments(),
    Admission.countDocuments({ status: 'Pending' }),
    Event.find({ date: { $gte: new Date() }, isUpcoming: true }).sort('date').limit(5),
  ]);

  res.json(
    new ApiResponse(200, {
      stats: { totalStudents, totalTeachers, totalClasses, pendingAdmissions },
      recentEvents,
    })
  );
});

const getTeacherDashboard = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({ user: req.user._id }).populate('classes').populate('subjects');
  if (!teacher) {
    throw new ApiError(404, 'Teacher profile not found');
  }

  const totalStudentsInClasses = await Student.countDocuments({ class: { $in: teacher.classes.map((c) => c._id) } });

  const Assignment = require('../models/Assignment');
  const pendingAssignments = await Assignment.countDocuments({ teacher: teacher._id });

  res.json(
    new ApiResponse(200, {
      stats: {
        assignedClasses: teacher.classes.length,
        totalStudents: totalStudentsInClasses,
        subjects: teacher.subjects.length,
        pendingAssignments,
      },
      classes: teacher.classes,
      subjects: teacher.subjects,
    })
  );
});

const getStudentDashboard = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id }).populate('class').populate('section');
  if (!student) {
    throw new ApiError(404, 'Student profile not found');
  }

  const [
    totalAttendance,
    presentAttendance,
    upcomingExams,
    pendingFees,
    recentResults,
    notifications,
  ] = await Promise.all([
    Attendance.countDocuments({ student: student._id }),
    Attendance.countDocuments({ student: student._id, status: 'Present' }),
    ExamSchedule.find({ class: student.class?._id, date: { $gte: new Date() } })
      .populate('subject')
      .sort('date')
      .limit(5),
    Fee.find({ student: student._id, status: { $in: ['Pending', 'Overdue'] } }),
    Result.find({ student: student._id })
      .populate('subject')
      .sort('-createdAt')
      .limit(5),
    Notification.find({ recipient: req.user._id, isRead: false }).sort('-createdAt').limit(5),
  ]);

  const attendancePercentage = totalAttendance > 0
    ? Math.round((presentAttendance / totalAttendance) * 100)
    : 0;

  res.json(
    new ApiResponse(200, {
      student,
      attendancePercentage,
      stats: {
        totalAttendance,
        presentAttendance,
        pendingFees: pendingFees.length,
        unreadNotifications: notifications.length,
      },
      upcomingExams,
      pendingFees,
      recentResults,
      notifications,
    })
  );
});

module.exports = { getAdminDashboard, getTeacherDashboard, getStudentDashboard };
