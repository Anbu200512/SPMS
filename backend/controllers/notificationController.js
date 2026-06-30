const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Notification = require('../models/Notification');

const getNotifications = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const notifications = await Notification.find({ recipient: req.user._id })
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Notification.countDocuments({ recipient: req.user._id });
  const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false });

  res.json(
    new ApiResponse(200, {
      notifications,
      unreadCount,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(201).json(new ApiResponse(201, { notification }, 'Notification created successfully'));
});

const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id === 'all') {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );
    return res.json(new ApiResponse(200, {}, 'All notifications marked as read'));
  }

  const notification = await Notification.findOneAndUpdate(
    { _id: id, recipient: req.user._id },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  res.json(new ApiResponse(200, { notification }, 'Notification marked as read'));
});

module.exports = { getNotifications, createNotification, markAsRead };
