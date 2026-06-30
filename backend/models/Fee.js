const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    feeType: {
      type: String,
      enum: ['Tuition', 'Transport', 'Library', 'Sports', 'Other'],
      required: [true, 'Fee type is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Overdue', 'Partial'],
      default: 'Pending',
    },
    paidAmount: {
      type: Number,
      min: 0,
      default: 0,
    },
    paymentDate: {
      type: Date,
    },
    paymentMode: {
      type: String,
      trim: true,
    },
    transactionId: {
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

module.exports = mongoose.model('Fee', feeSchema);
