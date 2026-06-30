const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    examName: {
      type: String,
      required: [true, 'Exam name is required'],
      trim: true,
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
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    marksObtained: {
      type: Number,
      required: [true, 'Marks obtained is required'],
      min: 0,
    },
    maxMarks: {
      type: Number,
      required: [true, 'Max marks is required'],
      min: 1,
    },
    grade: {
      type: String,
      trim: true,
    },
    examDate: {
      type: Date,
    },
    term: {
      type: String,
      trim: true,
    },
    academicYear: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
