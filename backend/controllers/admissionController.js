const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Admission = require('../models/Admission');

const getAdmissions = asyncHandler(async (req, res) => {
  const { status, class: classId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (status) filter.status = status;
  if (classId) filter.class = classId;

  const admissions = await Admission.find(filter)
    .populate('class')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Admission.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      admissions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findById(req.params.id).populate('class');
  if (!admission) {
    throw new ApiError(404, 'Admission not found');
  }
  res.json(new ApiResponse(200, { admission }));
});

const createAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.create(req.body);
  const fullAdmission = await Admission.findById(admission._id).populate('class');
  res.status(201).json(new ApiResponse(201, { admission: fullAdmission }, 'Admission submitted successfully'));
});

const updateAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('class');

  if (!admission) {
    throw new ApiError(404, 'Admission not found');
  }

  res.json(new ApiResponse(200, { admission }, 'Admission updated successfully'));
});

const deleteAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findByIdAndDelete(req.params.id);
  if (!admission) {
    throw new ApiError(404, 'Admission not found');
  }
  res.json(new ApiResponse(200, {}, 'Admission deleted successfully'));
});

module.exports = { getAdmissions, getAdmission, createAdmission, updateAdmission, deleteAdmission };
