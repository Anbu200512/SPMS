const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Fee = require('../models/Fee');
const Payment = require('../models/Payment');

const getFees = asyncHandler(async (req, res) => {
  const { student, class: classId, status } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (student) filter.student = student;
  if (classId) filter.class = classId;
  if (status) filter.status = status;

  const fees = await Fee.find(filter)
    .populate('student')
    .populate('class')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Fee.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      fees,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getFee = asyncHandler(async (req, res) => {
  const fee = await Fee.findById(req.params.id).populate('student').populate('class');
  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }
  res.json(new ApiResponse(200, { fee }));
});

const createFee = asyncHandler(async (req, res) => {
  const fee = await Fee.create(req.body);
  const fullFee = await Fee.findById(fee._id).populate('student').populate('class');
  res.status(201).json(new ApiResponse(201, { fee: fullFee }, 'Fee created successfully'));
});

const updateFee = asyncHandler(async (req, res) => {
  const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('student').populate('class');

  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }

  res.json(new ApiResponse(200, { fee }, 'Fee updated successfully'));
});

const deleteFee = asyncHandler(async (req, res) => {
  const fee = await Fee.findByIdAndDelete(req.params.id);
  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }
  res.json(new ApiResponse(200, {}, 'Fee deleted successfully'));
});

const recordPayment = asyncHandler(async (req, res) => {
  const { feeId } = req.params;
  const { amount, paymentMode, transactionId, receiptNo } = req.body;

  const fee = await Fee.findById(feeId);
  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }

  const payment = await Payment.create({
    student: fee.student,
    fee: fee._id,
    amount,
    paymentMode,
    transactionId,
    receiptNo,
    status: 'Success',
  });

  const newPaidAmount = (fee.paidAmount || 0) + amount;
  const newStatus = newPaidAmount >= fee.amount ? 'Paid' : 'Partial';

  await Fee.findByIdAndUpdate(feeId, {
    paidAmount: newPaidAmount,
    status: newStatus,
    paymentDate: new Date(),
    paymentMode,
    transactionId,
  });

  const fullPayment = await Payment.findById(payment._id).populate('student').populate('fee');

  res.json(new ApiResponse(200, { payment: fullPayment }, 'Payment recorded successfully'));
});

module.exports = { getFees, getFee, createFee, updateFee, deleteFee, recordPayment };
