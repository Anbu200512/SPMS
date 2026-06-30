const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Section name is required'],
      trim: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    roomNo: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Section', sectionSchema);
