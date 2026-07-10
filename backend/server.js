const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

// Route Imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");
const classRoutes = require("./routes/classRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const homeworkRoutes = require("./routes/homeworkRoutes");
const resultRoutes = require("./routes/resultRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const feeRoutes = require("./routes/feeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const newsRoutes = require("./routes/newsRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const contactRoutes = require("./routes/contactRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const studyMaterialRoutes = require("./routes/studyMaterialRoutes");
const examScheduleRoutes = require("./routes/examScheduleRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/sections", sectionRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/homework", homeworkRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/admissions", admissionRoutes);
app.use("/api/v1/fees", feeRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/gallery", galleryRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/notices", noticeRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/leaves", leaveRoutes);
app.use("/api/v1/timetable", timetableRoutes);
app.use("/api/v1/materials", studyMaterialRoutes);
app.use("/api/v1/exams", examScheduleRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/settings", settingsRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to St. Paul's School Management System API",
  });
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;