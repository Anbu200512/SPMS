const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Student = require('../models/Student');
const Class = require('../models/Class');

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

const getAdminNotifications = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const match = { sender: req.user._id };
  const groupId = { title: '$title', message: '$message', type: '$type', audience: '$audience' };

  const [countResult, notifications] = await Promise.all([
    Notification.aggregate([{ $match: match }, { $group: { _id: groupId } }, { $count: 'total' }]),
    Notification.aggregate([
      { $match: match },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: groupId,
          count: { $sum: 1 },
          createdAt: { $max: '$createdAt' },
          recipientIds: { $push: '$recipient' },
          notificationId: { $first: '$_id' },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'recipientIds',
          foreignField: '_id',
          as: 'recipients',
          pipeline: [{ $project: { name: 1, email: 1, role: 1 } }],
        },
      },
      {
        $project: {
          _id: '$notificationId',
          title: '$_id.title',
          message: '$_id.message',
          type: '$_id.type',
          audience: '$_id.audience',
          count: 1,
          createdAt: 1,
          recipients: 1,
        },
      },
    ]),
  ]);

  const total = countResult.length ? countResult[0].total : 0;

  res.json(
    new ApiResponse(200, {
      notifications,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const resolveRecipients = async ({ recipients, recipient, class: classId }) => {
  if (recipient) {
    return { userIds: [recipient], audience: 'Specific User' };
  }

  const audienceMap = {
    students: 'All Students',
    teachers: 'All Teachers',
    parents: 'All Parents',
    all: 'All (Students & Teachers)',
  };

  let userIds = [];

  switch (recipients) {
    case 'students':
      userIds = await User.find({ role: 'student', isActive: true }).distinct('_id');
      break;
    case 'teachers':
      userIds = await User.find({ role: 'teacher', isActive: true }).distinct('_id');
      break;
    case 'parents':
      userIds = await User.find({ role: 'student', isActive: true }).distinct('_id');
      break;
    case 'class': {
      if (!classId) {
        throw new ApiError(400, 'Please select a class');
      }
      const [cls, students] = await Promise.all([
        Class.findById(classId),
        Student.find({ class: classId }).distinct('user'),
      ]);
      userIds = students.filter(Boolean);
      return { userIds, audience: cls ? cls.name : 'Specific Class' };
    }
    case 'all':
    default:
      userIds = await User.find({ role: { $in: ['student', 'teacher'] }, isActive: true }).distinct('_id');
      break;
  }

  return { userIds, audience: audienceMap[recipients] || 'All' };
};

const createNotification = asyncHandler(async (req, res) => {
  const { title, message, type, link, recipients, recipient, class: classId } = req.body;

  if (!title || !message) {
    throw new ApiError(400, 'Title and message are required');
  }

  const { userIds, audience } = await resolveRecipients({ recipients, recipient, class: classId });

  if (!userIds.length) {
    throw new ApiError(400, 'No recipients found for the selected audience');
  }

  const uniqueIds = [...new Set(userIds.map((id) => id.toString()))];
  const docs = uniqueIds.map((id) => ({
    recipient: id,
    sender: req.user._id,
    audience,
    title,
    message,
    type: type || 'Info',
    link: link || '',
  }));

  const created = await Notification.insertMany(docs);

  res.status(201).json(
    new ApiResponse(
      201,
      { notifications: created, count: created.length },
      `Notification sent to ${created.length} recipient${created.length > 1 ? 's' : ''}`
    )
  );
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

module.exports = {
  getNotifications,
  getAdminNotifications,
  createNotification,
  markAsRead,
};
