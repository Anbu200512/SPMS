const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Notice = require('../models/Notice');

const getNotices = asyncHandler(async (req, res) => {
  const notices = await Notice.find()
    .populate('class')
    .populate('section')
    .sort('-createdAt');
  res.json(new ApiResponse(200, { notices }));
});

const getNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id).populate('class').populate('section');
  if (!notice) {
    throw new ApiError(404, 'Notice not found');
  }
  res.json(new ApiResponse(200, { notice }));
});

const createNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.create(req.body);
  const fullNotice = await Notice.findById(notice._id).populate('class').populate('section');
  res.status(201).json(new ApiResponse(201, { notice: fullNotice }, 'Notice created successfully'));
});

const updateNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('class').populate('section');

  if (!notice) {
    throw new ApiError(404, 'Notice not found');
  }

  res.json(new ApiResponse(200, { notice }, 'Notice updated successfully'));
});

const deleteNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findByIdAndDelete(req.params.id);
  if (!notice) {
    throw new ApiError(404, 'Notice not found');
  }
  res.json(new ApiResponse(200, {}, 'Notice deleted successfully'));
});

module.exports = { getNotices, getNotice, createNotice, updateNotice, deleteNotice };
