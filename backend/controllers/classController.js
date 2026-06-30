const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Class = require('../models/Class');

const getClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find().sort('name');
  res.json(new ApiResponse(200, { classes }));
});

const getClass = asyncHandler(async (req, res) => {
  const cls = await Class.findById(req.params.id);
  if (!cls) {
    throw new ApiError(404, 'Class not found');
  }
  res.json(new ApiResponse(200, { class: cls }));
});

const createClass = asyncHandler(async (req, res) => {
  const cls = await Class.create(req.body);
  res.status(201).json(new ApiResponse(201, { class: cls }, 'Class created successfully'));
});

const updateClass = asyncHandler(async (req, res) => {
  const cls = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!cls) {
    throw new ApiError(404, 'Class not found');
  }
  res.json(new ApiResponse(200, { class: cls }, 'Class updated successfully'));
});

const deleteClass = asyncHandler(async (req, res) => {
  const cls = await Class.findByIdAndDelete(req.params.id);
  if (!cls) {
    throw new ApiError(404, 'Class not found');
  }
  res.json(new ApiResponse(200, {}, 'Class deleted successfully'));
});

module.exports = { getClasses, getClass, createClass, updateClass, deleteClass };
