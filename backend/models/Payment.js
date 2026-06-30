const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    fee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fee',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentMode: {
      type: String,
      enum: ['Cash', 'Card', 'Online', 'Cheque', 'DD'],
      required: [true, 'Payment mode is required'],
    },
    transactionId: {
      type: String,
      trim: true,
    },
    receiptNo: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Success', 'Pending', 'Failed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
