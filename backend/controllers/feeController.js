const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Fee = require('../models/Fee');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const Settings = require('../models/Settings');
const Razorpay = require('razorpay');
const { getRazorpay } = require('../config/razorpay');

const DEFAULT_PAYMENT_METHODS = ['upi', 'card', 'netbanking', 'wallet'];

const getFees = asyncHandler(async (req, res) => {
  const { class: classId, status } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.user.role === 'student') {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) {
      throw new ApiError(404, 'Student profile not found');
    }
    filter.student = student._id;
  }
  if (req.user.role === 'admin' && req.query.student) filter.student = req.query.student;
  if (classId) filter.class = classId;
  if (status) filter.status = status;

  const fees = await Fee.find(filter)
    .populate({
      path: 'student',
      populate: [{ path: 'user', select: '-password' }, { path: 'class' }, { path: 'section' }],
    })
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
  const fee = await Fee.findById(req.params.id)
    .populate({
      path: 'student',
      populate: [{ path: 'user', select: '-password' }, { path: 'class' }, { path: 'section' }],
    })
    .populate('class');
  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }
  res.json(new ApiResponse(200, { fee }));
});

const createFee = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (!payload.class && payload.student) {
    const student = await Student.findById(payload.student);
    if (student && student.class) payload.class = student.class;
  }

  const fee = await Fee.create(payload);
  const fullFee = await Fee.findById(fee._id)
    .populate({
      path: 'student',
      populate: [{ path: 'user', select: '-password' }, { path: 'class' }, { path: 'section' }],
    })
    .populate('class');
  res.status(201).json(new ApiResponse(201, { fee: fullFee }, 'Fee created successfully'));
});

const updateFee = asyncHandler(async (req, res) => {
  const existing = await Fee.findById(req.params.id);
  if (!existing) {
    throw new ApiError(404, 'Fee not found');
  }

  const body = { ...req.body };
  const amount = body.amount ?? existing.amount;
  const paidAmount = body.paidAmount ?? existing.paidAmount;

  if (amount < paidAmount) {
    throw new ApiError(400, 'Fee amount cannot be less than the amount already paid');
  }

  if (!body.status) {
    if (paidAmount >= amount) body.status = 'Paid';
    else if (paidAmount > 0) body.status = 'Partial';
    else body.status = existing.dueDate && new Date(existing.dueDate) < new Date() ? 'Overdue' : 'Pending';
  }

  const fee = await Fee.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: 'student',
      populate: [{ path: 'user', select: '-password' }, { path: 'class' }, { path: 'section' }],
    })
    .populate('class');

  res.json(new ApiResponse(200, { fee }, 'Fee updated successfully'));
});

const deleteFee = asyncHandler(async (req, res) => {
  const fee = await Fee.findByIdAndDelete(req.params.id);
  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }
  res.json(new ApiResponse(200, {}, 'Fee deleted successfully'));
});

const applyPaymentToFee = async (payment) => {
  const fee = await Fee.findById(payment.fee);
  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }

  const newPaidAmount = (fee.paidAmount || 0) + payment.amount;
  const newStatus = newPaidAmount >= fee.amount ? 'Paid' : 'Partial';

  await Fee.findByIdAndUpdate(fee._id, {
    paidAmount: newPaidAmount,
    status: newStatus,
    paymentDate: new Date(),
    paymentMode: payment.paymentMode,
    transactionId: payment.transactionId,
  });

  return newStatus;
};

const recordPayment = asyncHandler(async (req, res) => {
  const { feeId } = req.params;
  const { amount, paymentMode, transactionId, receiptNo, paymentDate } = req.body;

  const fee = await Fee.findById(feeId);
  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }

  const pending = fee.amount - (fee.paidAmount || 0);
  if (amount <= 0) {
    throw new ApiError(400, 'Amount must be greater than zero');
  }
  if (amount > pending) {
    throw new ApiError(400, `Amount exceeds the pending balance of ₹${pending}`);
  }

  const finalReceiptNo =
    receiptNo || `RCP-${Date.now().toString().slice(-6)}-${fee.student.toString().slice(-4).toUpperCase()}`;

  const payment = await Payment.create({
    student: fee.student,
    fee: fee._id,
    amount,
    paymentMode,
    transactionId,
    receiptNo: finalReceiptNo,
    paymentDate: paymentDate || undefined,
    status: 'Success',
  });

  await applyPaymentToFee(payment);

  const fullPayment = await Payment.findById(payment._id).populate('student').populate('fee');

  res.json(new ApiResponse(200, { payment: fullPayment }, 'Payment recorded successfully'));
});

const createCheckout = asyncHandler(async (req, res) => {
  const fee = await Fee.findById(req.params.feeId);
  if (!fee) {
    throw new ApiError(404, 'Fee not found');
  }

  const student = await Student.findOne({ user: req.user._id });
  if (!student) {
    throw new ApiError(404, 'Student profile not found');
  }
  if (fee.student.toString() !== student._id.toString()) {
    throw new ApiError(403, 'You can only pay your own fees');
  }
  if (fee.status === 'Paid') {
    throw new ApiError(400, 'This fee has already been paid');
  }

  const pendingAmount = fee.amount - (fee.paidAmount || 0);
  if (pendingAmount <= 0) {
    throw new ApiError(400, 'No amount pending for this fee');
  }

  const razorpay = getRazorpay();
  const order = await razorpay.orders.create({
    amount: Math.round(pendingAmount * 100),
    currency: 'INR',
    receipt: `fee_${fee._id.toString()}`,
    notes: { feeId: fee._id.toString(), studentId: student._id.toString() },
  });

  const paymentSettings = await Settings.findOne({ key: 'paymentMethods' });
  const paymentMethods =
    Array.isArray(paymentSettings?.value) && paymentSettings.value.length > 0
      ? paymentSettings.value
      : DEFAULT_PAYMENT_METHODS;

  const payment = await Payment.create({
    student: student._id,
    fee: fee._id,
    amount: pendingAmount,
    paymentMode: 'Online',
    transactionId: order.id,
    gateway: 'Razorpay',
    status: 'Pending',
  });

  res.json(
    new ApiResponse(200, {
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id,
      paymentMethods,
    }, 'Checkout created')
  );
});

const getPaymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const student = await Student.findOne({ user: req.user._id });
  if (!student) {
    throw new ApiError(404, 'Student profile not found');
  }

  const payment = await Payment.findOne({ transactionId: orderId, student: student._id }).populate('fee');
  if (!payment) {
    throw new ApiError(404, 'Payment not found');
  }

  res.json(new ApiResponse(200, { payment }));
});

const getMyPayments = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });
  if (!student) {
    throw new ApiError(404, 'Student profile not found');
  }

  const payments = await Payment.find({ student: student._id })
    .populate('fee')
    .sort('-createdAt');

  res.json(new ApiResponse(200, { payments }));
});

const getAllPayments = asyncHandler(async (req, res) => {
  const { student, status, mode } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (student) filter.student = student;
  if (status) filter.status = status;
  if (mode) filter.paymentMode = mode;

  const payments = await Payment.find(filter)
    .populate({
      path: 'student',
      populate: [{ path: 'user', select: '-password' }, { path: 'class' }, { path: 'section' }],
    })
    .populate('fee')
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Payment.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      payments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const handleWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    throw new ApiError(503, 'Razorpay webhook secret is not configured');
  }

  const valid = Razorpay.webhooks.validateWebhookSignature(req.rawBody, signature || '', secret);
  if (!valid) {
    throw new ApiError(400, 'Invalid webhook signature');
  }

  const event = JSON.parse(req.rawBody);
  const eventName = event.event;
  const entity = event.payload && event.payload.payment && event.payload.payment.entity;

  if (!entity || !entity.order_id) {
    return res.json(new ApiResponse(200, {}, 'Ignored'));
  }

  const payment = await Payment.findOne({ transactionId: entity.order_id });
  if (!payment) {
    return res.json(new ApiResponse(200, {}, 'Order not found'));
  }

  if (eventName === 'payment.captured' || eventName === 'payment.authorized') {
    if (payment.status === 'Success') {
      return res.json(new ApiResponse(200, {}, 'Already settled'));
    }
    await Payment.findByIdAndUpdate(payment._id, {
      status: 'Success',
      paymentDate: new Date(),
      gatewayPaymentId: entity.id,
    });
    await applyPaymentToFee({ ...payment.toObject(), paymentMode: 'Online' });
  } else if (eventName === 'payment.failed') {
    await Payment.findByIdAndUpdate(payment._id, {
      status: 'Failed',
      gatewayPaymentId: entity.id,
    });
  }

  res.json(new ApiResponse(200, {}, 'Webhook processed'));
});

module.exports = {
  getFees,
  getFee,
  createFee,
  updateFee,
  deleteFee,
  recordPayment,
  createCheckout,
  getPaymentStatus,
  getMyPayments,
  getAllPayments,
  handleWebhook,
};
