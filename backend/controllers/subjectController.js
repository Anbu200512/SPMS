const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Subject = require('../models/Subject');

const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find().populate('class').populate('teacher').sort('name');
  res.json(new ApiResponse(200, { subjects }));
});

const getSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id).populate('class').populate('teacher');
  if (!subject) {
    throw new ApiError(404, 'Subject not found');
  }
  res.json(new ApiResponse(200, { subject }));
});

const createSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.create(req.body);
  const fullSubject = await Subject.findById(subject._id).populate('class').populate('teacher');
  res.status(201).json(new ApiResponse(201, { subject: fullSubject }, 'Subject created successfully'));
});

const updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('class').populate('teacher');

  if (!subject) {
    throw new ApiError(404, 'Subject not found');
  }
  res.json(new ApiResponse(200, { subject }, 'Subject updated successfully'));
});

const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.params.id);
  if (!subject) {
    throw new ApiError(404, 'Subject not found');
  }
  res.json(new ApiResponse(200, {}, 'Subject deleted successfully'));
});

module.exports = { getSubjects, getSubject, createSubject, updateSubject, deleteSubject };
