const express = require('express');
const router = express.Router();
const {
  getSettings,
  getSetting,
  updateSetting,
} = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getSettings);
router.get('/:key', getSetting);
router.put('/:key', protect, authorize('admin'), updateSetting);

module.exports = router;
