const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContact,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id/read', protect, authorize('admin'), markAsRead);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;
