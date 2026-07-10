const mongoose = require("mongoose");
const admissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    class: {
      type: String,
      required: true,
      trim: true,
    },

    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    relationship: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
documents: {
  type: [String],
  default: [],
},
   email: {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
},

    address: String,
    previousSchool: String,
    academicYear: String,
    medicalInfo: String,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionSchema);