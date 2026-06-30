const express = require('express');
const router = express.Router();
const {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require('../controllers/assignmentController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getAssignments);
router.get('/:id', protect, getAssignment);
router.post('/', protect, authorize('admin', 'teacher'), createAssignment);
router.put('/:id', protect, authorize('admin', 'teacher'), updateAssignment);
router.delete('/:id', protect, authorize('admin', 'teacher'), deleteAssignment);

module.exports = router;
