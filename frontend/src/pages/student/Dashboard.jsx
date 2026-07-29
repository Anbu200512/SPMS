import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineClipboardCheck,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineBell,
  HiOutlineAcademicCap,
  HiOutlineChevronRight,
  HiOutlineExclamationCircle,
  HiOutlineStar,
} from 'react-icons/hi';
import { formatDate } from '../../utils/helpers';
import StatCard from '../../components/portal/StatCard';
import Card from '../../components/ui/Card';
import { getStudentDashboard } from '../../services/studentService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudentDashboard()
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load dashboard');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">{error}</div>
    );
  }

  const studentName = data?.student?.user?.name || 'Student';
  const stats = [
    { label: 'Attendance', value: `${data?.attendancePercentage ?? 0}%`, icon: HiOutlineClipboardCheck, color: 'green', trend: 0 },
    { label: 'Upcoming Exams', value: data?.upcomingExams?.length ?? 0, icon: HiOutlineCalendar, color: 'orange', trend: 0 },
    { label: 'Pending Fees', value: data?.stats?.pendingFees ?? 0, icon: HiOutlineCurrencyDollar, color: 'red', trend: 0 },
    { label: 'Notifications', value: data?.stats?.unreadNotifications ?? 0, icon: HiOutlineBell, color: 'blue', trend: 0 },
  ];

  const upcomingExams = data?.upcomingExams || [];
  const pendingFees = data?.pendingFees || [];
  const recentResults = data?.recentResults || [];
  const notifications = data?.notifications || [];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">
          Welcome back, {studentName}
        </h1>
        <p className="text-gray-500 mt-1">Here is your academic overview.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {upcomingExams.length > 0 && (
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineExclamationCircle className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-semibold text-gray-800">Upcoming Exams</h2>
              </div>
              <div className="space-y-3">
                {upcomingExams.map((exam, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-primary-50/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">{exam.subject?.name || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{exam.class?.name || ''} {exam.section?.name || ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary-600">{formatDate(exam.date)}</p>
                      {exam.type && <p className="text-xs text-gray-400">{exam.type}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {recentResults.length > 0 && (
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineAcademicCap className="w-5 h-5 text-accent-500" />
                <h2 className="text-lg font-heading font-semibold text-gray-800">Recent Results</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                      <th className="text-center py-2 px-2 text-xs font-semibold text-gray-500 uppercase">Marks</th>
                      <th className="text-center py-2 px-2 text-xs font-semibold text-gray-500 uppercase">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentResults.map((result, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-2 px-2 text-sm font-medium text-gray-800">{result.subject?.name || 'N/A'}</td>
                        <td className="py-2 px-2 text-sm text-gray-600 text-center">{result.marksObtained}/{result.maxMarks}</td>
                        <td className="py-2 px-2 text-sm text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            (result.grade || '').startsWith('A') ? 'bg-green-100 text-green-700' :
                            (result.grade || '').startsWith('B') ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>{result.grade || '-'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {pendingFees.length > 0 && (
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCurrencyDollar className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-heading font-semibold text-gray-800">Pending Fees</h2>
              </div>
              <div className="space-y-3">
                {pendingFees.map((fee, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{fee.feeType || 'Fee'}</p>
                      <p className="text-xs text-gray-500">Due: {formatDate(fee.dueDate)}</p>
                    </div>
                    <span className="text-sm font-semibold text-red-600">₹{fee.amount || 0}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <Card>
            <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">Quick Links</h2>
            <div className="space-y-3">
              {[
                { label: 'View Timetable', path: '/student/timetable', icon: HiOutlineCalendar, color: 'bg-blue-50 text-blue-600' },
                { label: 'My Attendance', path: '/student/attendance', icon: HiOutlineClipboardCheck, color: 'bg-green-50 text-green-600' },
                { label: 'Assignments', path: '/student/assignments', icon: HiOutlineBookOpen, color: 'bg-purple-50 text-purple-600' },
                { label: 'Study Materials', path: '/student/study-materials', icon: HiOutlineAcademicCap, color: 'bg-orange-50 text-orange-600' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.color}`}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                    {link.label}
                  </span>
                  <HiOutlineChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">Notifications</h2>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No new notifications.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((n, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="relative">
                      <HiOutlineBell className="w-5 h-5 text-gray-400" />
                      {!n.isRead && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{n.title}</p>
                      {n.message && <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>}
                      <p className="text-xs text-gray-400 mt-1">{formatDate(n.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
