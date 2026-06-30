const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const StudyMaterial = require('../models/StudyMaterial');

const getStudyMaterials = asyncHandler(async (req, res) => {
  const { class: classId, subject } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (classId) filter.class = classId;
  if (subject) filter.subject = subject;

  const materials = await StudyMaterial.find(filter)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await StudyMaterial.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      materials,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getStudyMaterial = asyncHandler(async (req, res) => {
  const material = await StudyMaterial.findById(req.params.id)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  if (!material) {
    throw new ApiError(404, 'Study material not found');
  }

  res.json(new ApiResponse(200, { material }));
});

const createStudyMaterial = asyncHandler(async (req, res) => {
  const material = await StudyMaterial.create(req.body);
  const fullMaterial = await StudyMaterial.findById(material._id)
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  res.status(201).json(new ApiResponse(201, { material: fullMaterial }, 'Study material created successfully'));
});

const updateStudyMaterial = asyncHandler(async (req, res) => {
  const material = await StudyMaterial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('subject')
    .populate('class')
    .populate('section')
    .populate('teacher');

  if (!material) {
    throw new ApiError(404, 'Study material not found');
  }

  res.json(new ApiResponse(200, { material }, 'Study material updated successfully'));
});

const deleteStudyMaterial = asyncHandler(async (req, res) => {
  const material = await StudyMaterial.findByIdAndDelete(req.params.id);
  if (!material) {
    throw new ApiError(404, 'Study material not found');
  }
  res.json(new ApiResponse(200, {}, 'Study material deleted successfully'));
});

module.exports = { getStudyMaterials, getStudyMaterial, createStudyMaterial, updateStudyMaterial, deleteStudyMaterial };
