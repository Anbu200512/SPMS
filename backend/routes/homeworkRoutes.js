const express = require('express');
const router = express.Router();
const {
  getHomework,
  getHomeworkById,
  createHomework,
  updateHomework,
  deleteHomework,
} = require('../controllers/homeworkController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getHomework);
router.get('/:id', protect, getHomeworkById);
router.post('/', protect, authorize('admin', 'teacher'), createHomework);
router.put('/:id', protect, authorize('admin', 'teacher'), updateHomework);
router.delete('/:id', protect, authorize('admin', 'teacher'), deleteHomework);

module.exports = router;
