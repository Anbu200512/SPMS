const mongoose = require('mongoose');

const examScheduleSchema = new mongoose.Schema(
  {
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
    date: {
      type: Date,
      required: [true, 'Exam date is required'],
    },
    startTime: {
      type: String,
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
    },
    maxMarks: {
      type: Number,
      required: [true, 'Max marks is required'],
      min: 1,
    },
    academicYear: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExamSchedule', examScheduleSchema);
