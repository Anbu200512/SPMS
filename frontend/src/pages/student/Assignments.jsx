import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineBookOpen,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineSearch,
  HiOutlineEye,
  HiOutlineX,
  HiOutlineUpload,
  HiOutlineFilter,
} from 'react-icons/hi';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
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

const Assignments = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations Practice',
      subject: 'Mathematics',
      teacher: 'Mrs. Sharma',
      dueDate: '2026-07-05',
      status: 'pending',
      description: 'Solve 20 problems from Chapter 4: Quadratic Equations. Focus on word problems and real-life applications.',
      totalMarks: 20,
    },
    {
      id: 2,
      title: 'Essay on Climate Change',
      subject: 'English',
      teacher: 'Mrs. Singh',
      dueDate: '2026-07-03',
      status: 'submitted',
      description: 'Write a 500-word essay on the impact of climate change on our daily lives. Include references.',
      totalMarks: 15,
    },
    {
      id: 3,
      title: 'Lab Report - Acids & Bases',
      subject: 'Chemistry',
      teacher: 'Ms. Patel',
      dueDate: '2026-06-28',
      status: 'overdue',
      description: 'Submit the lab report for the Acids and Bases titration experiment conducted in class.',
      totalMarks: 25,
    },
    {
      id: 4,
      title: 'Newton\'s Laws Worksheet',
      subject: 'Physics',
      teacher: 'Mr. Kumar',
      dueDate: '2026-07-10',
      status: 'pending',
      description: 'Complete the worksheet on Newton\'s Laws of Motion. All questions are compulsory.',
      totalMarks: 20,
    },
    {
      id: 5,
      title: 'HTML Project',
      subject: 'Computer Science',
      teacher: 'Mr. Verma',
      dueDate: '2026-07-02',
      status: 'submitted',
      description: 'Create a personal portfolio webpage using HTML and CSS. Include at least 3 sections.',
      totalMarks: 30,
    },
  ];

  const statusColors = {
    pending: 'warning',
    submitted: 'success',
    overdue: 'danger',
  };

  const filteredAssignments = assignments
    .filter((a) => filter === 'all' || a.status === filter)
    .filter(
      (a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.subject.toLowerCase().includes(search.toLowerCase())
    );

  const openDetail = (assignment) => {
    setSelected(assignment);
    setViewModal(true);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Assignments</h1>
        <p className="text-gray-500 mb-6">Track and submit your assignments</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full sm:w-72">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'pending', 'submitted', 'overdue'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={classNames(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap',
                filter === f
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {filteredAssignments.length === 0 ? (
        <motion.div variants={item}>
          <EmptyState
            title="No assignments found"
            description="Try changing your filter or search criteria"
          />
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAssignments.map((assignment, i) => (
            <motion.div
              key={assignment.id}
              variants={item}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openDetail(assignment)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiOutlineBookOpen className="w-5 h-5 text-primary-600" />
                </div>
                <Badge variant={statusColors[assignment.status]} size="sm">
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </Badge>
              </div>

              <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">{assignment.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{assignment.subject}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiOutlineUser className="w-4 h-4" />
                  <span>{assignment.teacher}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiOutlineClock className="w-4 h-4" />
                  <span className={classNames(
                    new Date(assignment.dueDate) < new Date() && assignment.status === 'pending'
                      ? 'text-red-500 font-medium'
                      : ''
                  )}>
                    Due: {formatDate(assignment.dueDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiOutlineDocumentText className="w-4 h-4" />
                  <span>Max Marks: {assignment.totalMarks}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  iconLeft={<HiOutlineEye className="w-4 h-4" />}
                  onClick={(e) => { e.stopPropagation(); openDetail(assignment); }}
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {viewModal && selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setViewModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-lg relative z-10"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Assignment Details</h2>
                <button
                  onClick={() => setViewModal(false)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selected.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{selected.subject}</p>
                  </div>
                  <Badge variant={statusColors[selected.status]} size="md">
                    {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600">{selected.description}</p>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Teacher</span>
                    <span className="font-medium text-gray-800">{selected.teacher}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Due Date</span>
                    <span className="font-medium text-gray-800">{formatDate(selected.dueDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Marks</span>
                    <span className="font-medium text-gray-800">{selected.totalMarks}</span>
                  </div>
                </div>

                {selected.status === 'pending' && (
                  <Button
                    variant="primary"
                    className="w-full"
                    iconLeft={<HiOutlineUpload className="w-4 h-4" />}
                  >
                    Submit Assignment
                  </Button>
                )}

                {selected.status === 'submitted' && (
                  <Badge variant="success" size="md" className="w-full justify-center">Assignment Submitted</Badge>
                )}

                {selected.status === 'overdue' && (
                  <Button
                    variant="danger"
                    className="w-full"
                    iconLeft={<HiOutlineUpload className="w-4 h-4" />}
                  >
                    Submit Late
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Assignments;
