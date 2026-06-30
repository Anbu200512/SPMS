const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Event = require('../models/Event');

const getEvents = asyncHandler(async (req, res) => {
  const { upcoming } = req.query;
  const filter = {};
  if (upcoming === 'true') {
    filter.date = { $gte: new Date() };
    filter.isUpcoming = true;
  }

  const events = await Event.find(filter).sort('date');
  res.json(new ApiResponse(200, { events }));
});

const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    throw new ApiError(404, 'Event not found');
  }
  res.json(new ApiResponse(200, { event }));
});

const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(new ApiResponse(201, { event }, 'Event created successfully'));
});

const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  res.json(new ApiResponse(200, { event }, 'Event updated successfully'));
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    throw new ApiError(404, 'Event not found');
  }
  res.json(new ApiResponse(200, {}, 'Event deleted successfully'));
});

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
