const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Announcement', 'Circular', 'ExamNotice', 'Achievement', 'Other'],
      required: [true, 'Category is required'],
    },
    author: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);
