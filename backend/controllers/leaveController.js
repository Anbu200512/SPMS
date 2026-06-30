const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const LeaveRequest = require('../models/LeaveRequest');

const getLeaves = asyncHandler(async (req, res) => {
  const { user, status } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (user) filter.user = user;
  if (status) filter.status = status;

  const leaves = await LeaveRequest.find(filter)
    .populate('user', '-password')
    .populate('approvedBy', '-password')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await LeaveRequest.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      leaves,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id)
    .populate('user', '-password')
    .populate('approvedBy', '-password');

  if (!leave) {
    throw new ApiError(404, 'Leave request not found');
  }

  res.json(new ApiResponse(200, { leave }));
});

const createLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.create({ ...req.body, user: req.user._id });
  const fullLeave = await LeaveRequest.findById(leave._id).populate('user', '-password');
  res.status(201).json(new ApiResponse(201, { leave: fullLeave }, 'Leave request submitted successfully'));
});

const updateLeave = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;

  const updateData = { ...req.body };
  if (status && ['Approved', 'Rejected'].includes(status)) {
    updateData.approvedBy = req.user._id;
  }

  const leave = await LeaveRequest.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate('user', '-password')
    .populate('approvedBy', '-password');

  if (!leave) {
    throw new ApiError(404, 'Leave request not found');
  }

  res.json(new ApiResponse(200, { leave }, 'Leave request updated successfully'));
});

const deleteLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.findByIdAndDelete(req.params.id);
  if (!leave) {
    throw new ApiError(404, 'Leave request not found');
  }
  res.json(new ApiResponse(200, {}, 'Leave request deleted successfully'));
});

module.exports = { getLeaves, getLeave, createLeave, updateLeave, deleteLeave };
