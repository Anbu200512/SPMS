const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Contact = require('../models/Contact');

const submitContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(new ApiResponse(201, { contact }, 'Contact form submitted successfully'));
});

const getContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find().skip(skip).limit(limit).sort('-createdAt');
  const total = await Contact.countDocuments();

  res.json(
    new ApiResponse(200, {
      contacts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    throw new ApiError(404, 'Contact not found');
  }
  res.json(new ApiResponse(200, { contact }));
});

const markAsRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!contact) {
    throw new ApiError(404, 'Contact not found');
  }

  res.json(new ApiResponse(200, { contact }, 'Contact marked as read'));
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    throw new ApiError(404, 'Contact not found');
  }
  res.json(new ApiResponse(200, {}, 'Contact deleted successfully'));
});

module.exports = { submitContact, getContacts, getContact, markAsRead, deleteContact };
