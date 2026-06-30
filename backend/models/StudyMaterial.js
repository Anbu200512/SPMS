const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema(
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
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    file: {
      type: String,
      required: [true, 'File is required'],
    },
    type: {
      type: String,
      enum: ['Notes', 'PPT', 'Video', 'Reference', 'Worksheet'],
      required: [true, 'Material type is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
