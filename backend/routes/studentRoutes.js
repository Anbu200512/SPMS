const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('admin', 'teacher'), getStudents);
router.get('/:id', protect, getStudent);
router.post('/', protect, authorize('admin'), createStudent);
router.put('/:id', protect, authorize('admin', 'teacher'), updateStudent);
router.delete('/:id', protect, authorize('admin'), deleteStudent);

module.exports = router;
