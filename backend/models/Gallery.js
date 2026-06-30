const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    category: {
      type: String,
      enum: ['Campus', 'Events', 'Cultural', 'Sports', 'Other'],
      required: [true, 'Category is required'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
