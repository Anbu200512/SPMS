const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    startTime: {
      type: String,
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Academic', 'Cultural', 'Sports', 'Celebration', 'Meeting', 'Other'],
      required: [true, 'Event type is required'],
    },
    isUpcoming: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
