import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineChartBar,
  HiOutlineDownload,
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlineTrendingUp,
  HiOutlineFilter,
} from 'react-icons/hi';
import StatCard from '../../components/portal/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { classNames, formatDate } from '../../utils/helpers';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const resultsData = {
  'Mid-Term Examinations 2026': {
    subjects: [
      { name: 'Mathematics', maxMarks: 100, obtained: 88, grade: 'A', percentage: 88 },
      { name: 'Physics', maxMarks: 75, obtained: 62, grade: 'B+', percentage: 82.7 },
      { name: 'Chemistry', maxMarks: 75, obtained: 65, grade: 'A', percentage: 86.7 },
      { name: 'English', maxMarks: 100, obtained: 79, grade: 'B+', percentage: 79 },
      { name: 'Biology', maxMarks: 75, obtained: 70, grade: 'A', percentage: 93.3 },
      { name: 'Computer Science', maxMarks: 50, obtained: 45, grade: 'A+', percentage: 90 },
      { name: 'History', maxMarks: 50, obtained: 38, grade: 'B', percentage: 76 },
    ],
    totalMax: 525,
    totalObtained: 447,
    overallPercentage: 85.1,
    overallGrade: 'A',
    rank: 5,
  },
  'Unit Test - 3': {
    subjects: [
      { name: 'Mathematics', maxMarks: 25, obtained: 22, grade: 'A', percentage: 88 },
      { name: 'Physics', maxMarks: 25, obtained: 20, grade: 'B+', percentage: 80 },
      { name: 'Chemistry', maxMarks: 25, obtained: 21, grade: 'A', percentage: 84 },
    ],
    totalMax: 75,
    totalObtained: 63,
    overallPercentage: 84,
    overallGrade: 'A',
    rank: 3,
  },
};

const Results = () => {
  const [selectedExam, setSelectedExam] = useState(Object.keys(resultsData)[0]);

  const currentResult = useMemo(() => resultsData[selectedExam], [selectedExam]);

  const stats = [
    { label: 'Total Marks', value: `${currentResult.totalObtained} / ${currentResult.totalMax}`, icon: HiOutlineChartBar, color: 'blue' },
    { label: 'Percentage', value: `${currentResult.overallPercentage}%`, icon: HiOutlineTrendingUp, color: 'green' },
    { label: 'Grade', value: currentResult.overallGrade, icon: HiOutlineStar, color: 'purple' },
    { label: 'Rank', value: `#${currentResult.rank}`, icon: HiOutlineAcademicCap, color: 'orange' },
  ];

  const getGradeBadge = (grade) => {
    const variantMap = {
      'A+': 'success',
      'A': 'success',
      'B+': 'info',
      'B': 'info',
      'C+': 'warning',
      'C': 'warning',
      'D': 'danger',
    };
    return <Badge variant={variantMap[grade] || 'default'}>{grade}</Badge>;
  };

  const getPercentageColor = (pct) => {
    if (pct >= 85) return 'text-green-600';
    if (pct >= 70) return 'text-blue-600';
    if (pct >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Academic Results</h1>
        <p className="text-gray-500 mb-6">View your marks and performance</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <HiOutlineFilter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
          >
            {Object.keys(resultsData).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <Button variant="primary" size="md" iconLeft={<HiOutlineDownload className="w-4 h-4" />}>
          Download Result
        </Button>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Subject-wise Marks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Marks</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Obtained</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentResult.subjects.map((sub, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{sub.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sub.maxMarks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{sub.obtained}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={getPercentageColor(sub.percentage)}>{sub.percentage}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getGradeBadge(sub.grade)}</td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-3 text-sm font-semibold text-gray-800">Total</td>
                <td className="px-6 py-3 text-sm font-semibold text-gray-800">{currentResult.totalMax}</td>
                <td className="px-6 py-3 text-sm font-semibold text-gray-800">{currentResult.totalObtained}</td>
                <td className="px-6 py-3 text-sm font-semibold">
                  <span className={getPercentageColor(currentResult.overallPercentage)}>{currentResult.overallPercentage}%</span>
                </td>
                <td className="px-6 py-3">{getGradeBadge(currentResult.overallGrade)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineTrendingUp className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Performance</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{currentResult.overallPercentage}%</p>
          <p className="text-sm text-blue-500">Overall Percentage</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineStar className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-800">Grade</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{currentResult.overallGrade}</p>
          <p className="text-sm text-purple-500">Overall Grade</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineAcademicCap className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-orange-800">Rank</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">#{currentResult.rank}</p>
          <p className="text-sm text-orange-500">Class Rank</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Results;
