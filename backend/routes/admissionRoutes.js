const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getAdmissions,
  getAdmission,
  createAdmission,
  updateAdmission,
  deleteAdmission,
} = require("../controllers/admissionController");

const { protect, authorize } = require("../middleware/auth");

router.get("/", protect, authorize("admin"), getAdmissions);

router.post(
  "/",
  upload.array("documents", 10),
  createAdmission
);

router.get("/:id", protect, getAdmission);
router.put("/:id", protect, authorize("admin"), updateAdmission);
router.delete("/:id", protect, authorize("admin"), deleteAdmission);

module.exports = router;