const Admission = require("../models/Admission");
const sendAdmissionEmail = require("../utils/sendAdmissionEmail");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

// Get all admissions
const getAdmissions = asyncHandler(async (req, res) => {
  const { status, class: className } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (status) filter.status = status;
  if (className) filter.class = className;

  const admissions = await Admission.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Admission.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        admissions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      "Admissions fetched successfully"
    )
  );
});

// Get single admission
const getAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findById(req.params.id);

  if (!admission) {
    throw new ApiError(404, "Admission not found");
  }

  res.status(200).json(
    new ApiResponse(200, admission, "Admission fetched successfully")
  );
});

// Create admission
const createAdmission = async (req, res) => {
  try {
    // Uploaded files from Multer
    const uploadedFiles = req.files || [];

    // Save uploaded file paths
    const documents = uploadedFiles.map((file) => file.path);

    // Create admission record
    const admission = await Admission.create({
      studentName: req.body.studentName,
      dob: req.body.dob,
      gender: req.body.gender,
      class: req.body.class,
      parentName: req.body.parentName,
      relationship: req.body.relationship,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      previousSchool: req.body.previousSchool,
      academicYear: req.body.academicYear,
      medicalInfo: req.body.medicalInfo,
      documents,
      status: "Pending",
    });

    // Send email with uploaded files
    await sendAdmissionEmail(admission, uploadedFiles);

    res.status(201).json({
      success: true,
      message: "Admission submitted successfully.",
      data: admission,
    });
  } catch (error) {
    console.error("Admission Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update admission
const updateAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!admission) {
    throw new ApiError(404, "Admission not found");
  }

  res.status(200).json(
    new ApiResponse(200, admission, "Admission updated successfully")
  );
});

// Delete admission
const deleteAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findByIdAndDelete(req.params.id);

  if (!admission) {
    throw new ApiError(404, "Admission not found");
  }

  res.status(200).json(
    new ApiResponse(200, {}, "Admission deleted successfully")
  );
});

module.exports = {
  getAdmissions,
  getAdmission,
  createAdmission,
  updateAdmission,
  deleteAdmission,
};