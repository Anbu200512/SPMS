import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/common/Loader';
import ProtectedRoute from './ProtectedRoute';

const PublicLayout = lazy(() => import('../layouts/PublicLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const StudentLayout = lazy(() => import('../layouts/StudentLayout'));
const TeacherLayout = lazy(() => import('../layouts/TeacherLayout'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Academics = lazy(() => import('../pages/Academics'));
const Admissions = lazy(() => import('../pages/Admissions'));
const Contact = lazy(() => import('../pages/Contact'));
const Facilities = lazy(() => import('../pages/public/Facilities'));
const Gallery = lazy(() => import('../pages/public/Gallery'));
const Events = lazy(() => import('../pages/public/Events'));
const News = lazy(() => import('../pages/public/News'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const NotFound = lazy(() => import('../pages/NotFound'));

const StudentDashboard = lazy(() => import('../pages/student/Dashboard'));
const StudentProfile = lazy(() => import('../pages/student/Profile'));
const StudentAttendance = lazy(() => import('../pages/student/Attendance'));
const StudentTimetable = lazy(() => import('../pages/student/Timetable'));
const StudentAssignments = lazy(() => import('../pages/student/Assignments'));
const StudentHomework = lazy(() => import('../pages/student/Homework'));
const StudentStudyMaterials = lazy(() => import('../pages/student/StudyMaterials'));
const StudentExamSchedule = lazy(() => import('../pages/student/ExamSchedule'));
const StudentResults = lazy(() => import('../pages/student/Results'));
const StudentFees = lazy(() => import('../pages/student/Fees'));
const StudentNotifications = lazy(() => import('../pages/student/Notifications'));
const StudentLeaveApplication = lazy(() => import('../pages/student/LeaveApplication'));

const TeacherDashboard = lazy(() => import('../pages/teacher/Dashboard'));
const TeacherProfile = lazy(() => import('../pages/teacher/Profile'));
const TeacherClasses = lazy(() => import('../pages/teacher/Classes'));
const TeacherAttendance = lazy(() => import('../pages/teacher/Attendance'));
const TeacherAssignments = lazy(() => import('../pages/teacher/Assignments'));
const TeacherHomework = lazy(() => import('../pages/teacher/Homework'));
const TeacherMarksEntry = lazy(() => import('../pages/teacher/MarksEntry'));
const TeacherStudyMaterials = lazy(() => import('../pages/teacher/StudyMaterials'));
const TeacherTimetable = lazy(() => import('../pages/teacher/Timetable'));
const TeacherNotifications = lazy(() => import('../pages/teacher/Notifications'));

const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const AdminStudents = lazy(() => import('../pages/admin/Students'));
const AdminTeachers = lazy(() => import('../pages/admin/Teachers'));
const AdminClasses = lazy(() => import('../pages/admin/Classes'));
const AdminSections = lazy(() => import('../pages/admin/Sections'));
const AdminSubjects = lazy(() => import('../pages/admin/Subjects'));
const AdminAdmissions = lazy(() => import('../pages/admin/Admissions'));
const AdminAttendance = lazy(() => import('../pages/admin/Attendance'));
const AdminExams = lazy(() => import('../pages/admin/Exams'));
const AdminResults = lazy(() => import('../pages/admin/Results'));
const AdminFees = lazy(() => import('../pages/admin/Fees'));
const AdminGallery = lazy(() => import('../pages/admin/Gallery'));
const AdminEvents = lazy(() => import('../pages/admin/Events'));
const AdminNews = lazy(() => import('../pages/admin/News'));
const AdminCMS = lazy(() => import('../pages/admin/CMS'));
const AdminUsers = lazy(() => import('../pages/admin/Users'));
const AdminNotifications = lazy(() => import('../pages/admin/Notifications'));
const AdminReports = lazy(() => import('../pages/admin/Reports'));
const AdminSettings = lazy(() => import('../pages/admin/Settings'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route path="/student" element={<ProtectedRoute role="student" />}>
          <Route element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="homework" element={<StudentHomework />} />
            <Route path="study-materials" element={<StudentStudyMaterials />} />
            <Route path="exam-schedule" element={<StudentExamSchedule />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="notifications" element={<StudentNotifications />} />
            <Route path="leave-application" element={<StudentLeaveApplication />} />
          </Route>
        </Route>

        <Route path="/teacher" element={<ProtectedRoute role="teacher" />}>
          <Route element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="classes" element={<TeacherClasses />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="assignments" element={<TeacherAssignments />} />
            <Route path="homework" element={<TeacherHomework />} />
            <Route path="marks-entry" element={<TeacherMarksEntry />} />
            <Route path="study-materials" element={<TeacherStudyMaterials />} />
            <Route path="timetable" element={<TeacherTimetable />} />
            <Route path="notifications" element={<TeacherNotifications />} />
          </Route>
        </Route>

        <Route path="/admin" element={<ProtectedRoute role="admin" />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="sections" element={<AdminSections />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="admissions" element={<AdminAdmissions />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="exams" element={<AdminExams />} />
            <Route path="results" element={<AdminResults />} />
            <Route path="fees" element={<AdminFees />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="cms" element={<AdminCMS />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
