const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getAdminNotifications,
  createNotification,
  markAsRead,
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getNotifications);
router.get('/all', protect, authorize('admin'), getAdminNotifications);
router.post('/', protect, authorize('admin'), createNotification);
router.put('/:id/read', protect, markAsRead);

module.exports = router;
