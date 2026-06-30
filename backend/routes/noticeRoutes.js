const express = require('express');
const router = express.Router();
const {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getNotices);
router.get('/:id', protect, getNotice);
router.post('/', protect, authorize('admin', 'teacher'), createNotice);
router.put('/:id', protect, authorize('admin', 'teacher'), updateNotice);
router.delete('/:id', protect, authorize('admin'), deleteNotice);

module.exports = router;
