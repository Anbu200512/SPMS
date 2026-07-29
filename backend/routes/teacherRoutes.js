const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/auth');

router.get('/profile', protect, getMyProfile);
router.get('/students', protect, authorize('teacher'), getMyStudents);
router.get('/dashboard', protect, authorize('teacher'), getMyDashboard);
router.get('/timetable', protect, authorize('teacher'), getMyTimetable);
router.get('/leaves', protect, authorize('teacher'), getMyLeaves);
router.post('/leaves', protect, authorize('teacher'), createMyLeave);

router.get('/', protect, authorize('admin', 'teacher'), getTeachers);
router.get('/:id', protect, getTeacher);
router.post('/', protect, authorize('admin'), createTeacher);
router.put('/:id', protect, authorize('admin'), updateTeacher);
router.delete('/:id', protect, authorize('admin'), deleteTeacher);

module.exports = router;
