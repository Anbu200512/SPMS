const express = require('express');
const router = express.Router();
const {
  getStudyMaterials,
  getStudyMaterial,
  createStudyMaterial,
  updateStudyMaterial,
  deleteStudyMaterial,
} = require('../controllers/studyMaterialController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getStudyMaterials);
router.get('/:id', protect, getStudyMaterial);
router.post('/', protect, authorize('admin', 'teacher'), createStudyMaterial);
router.put('/:id', protect, authorize('admin', 'teacher'), updateStudyMaterial);
router.delete('/:id', protect, authorize('admin'), deleteStudyMaterial);

module.exports = router;
