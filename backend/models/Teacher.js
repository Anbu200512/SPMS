const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
      trim: true,
    },
    qualification: {
      type: String,
      trim: true,
    },
    specialization: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      min: 0,
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    bloodGroup: {
      type: String,
      trim: true,
    },
    joiningDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
