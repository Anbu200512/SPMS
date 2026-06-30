const express = require('express');
const router = express.Router();
const {
  getResults,
  getResult,
  createResult,
  updateResult,
  deleteResult,
  bulkCreateResults,
} = require('../controllers/resultController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getResults);
router.get('/:id', protect, getResult);
router.post('/', protect, authorize('admin', 'teacher'), createResult);
router.put('/:id', protect, authorize('admin', 'teacher'), updateResult);
router.delete('/:id', protect, authorize('admin'), deleteResult);
router.post('/bulk', protect, authorize('admin', 'teacher'), bulkCreateResults);

module.exports = router;
