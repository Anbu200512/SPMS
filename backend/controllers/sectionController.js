const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Section = require('../models/Section');

const getSections = asyncHandler(async (req, res) => {
  const sections = await Section.find().populate('class').sort('name');
  res.json(new ApiResponse(200, { sections }));
});

const getSection = asyncHandler(async (req, res) => {
  const section = await Section.findById(req.params.id).populate('class');
  if (!section) {
    throw new ApiError(404, 'Section not found');
  }
  res.json(new ApiResponse(200, { section }));
});

const createSection = asyncHandler(async (req, res) => {
  const section = await Section.create(req.body);
  const fullSection = await Section.findById(section._id).populate('class');
  res.status(201).json(new ApiResponse(201, { section: fullSection }, 'Section created successfully'));
});

const updateSection = asyncHandler(async (req, res) => {
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('class');

  if (!section) {
    throw new ApiError(404, 'Section not found');
  }
  res.json(new ApiResponse(200, { section }, 'Section updated successfully'));
});

const deleteSection = asyncHandler(async (req, res) => {
  const section = await Section.findByIdAndDelete(req.params.id);
  if (!section) {
    throw new ApiError(404, 'Section not found');
  }
  res.json(new ApiResponse(200, {}, 'Section deleted successfully'));
});

module.exports = { getSections, getSection, createSection, updateSection, deleteSection };
