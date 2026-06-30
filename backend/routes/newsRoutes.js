const express = require('express');
const router = express.Router();
const {
  getNews,
  getNewsItem,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getNews);
router.get('/:id', getNewsItem);
router.post('/', protect, authorize('admin'), createNews);
router.put('/:id', protect, authorize('admin'), updateNews);
router.delete('/:id', protect, authorize('admin'), deleteNews);

module.exports = router;
