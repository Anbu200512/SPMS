import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineDocumentText,
  HiOutlinePresentationChartBar,
  HiOutlineVideoCamera,
  HiOutlineBookOpen,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlineSearch,
} from 'react-icons/hi';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { classNames } from '../../utils/helpers';

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

const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science'];

const typeIcons = {
  Notes: HiOutlineDocumentText,
  PPT: HiOutlinePresentationChartBar,
  Video: HiOutlineVideoCamera,
  Reference: HiOutlineBookOpen,
};

const typeColors = {
  Notes: 'blue',
  PPT: 'orange',
  Video: 'purple',
  Reference: 'green',
};

const materials = [
  {
    id: 1,
    title: 'Quadratic Equations - Complete Notes',
    type: 'Notes',
    subject: 'Mathematics',
    teacher: 'Mrs. Sharma',
    uploadDate: '2026-06-20',
    description: 'Comprehensive notes covering all concepts of quadratic equations with solved examples.',
    fileSize: '2.4 MB',
  },
  {
    id: 2,
    title: 'Newton\'s Laws - Lecture Slides',
    type: 'PPT',
    subject: 'Physics',
    teacher: 'Mr. Kumar',
    uploadDate: '2026-06-18',
    description: 'PowerPoint presentation covering Newton\'s three laws of motion with diagrams.',
    fileSize: '5.1 MB',
  },
  {
    id: 3,
    title: 'Chemical Bonding - Video Tutorial',
    type: 'Video',
    subject: 'Chemistry',
    teacher: 'Ms. Patel',
    uploadDate: '2026-06-15',
    description: 'Recorded video lecture explaining ionic and covalent bonding concepts.',
    fileSize: '45 MB',
  },
  {
    id: 4,
    title: 'Cell Biology - Reference Material',
    type: 'Reference',
    subject: 'Biology',
    teacher: 'Dr. Gupta',
    uploadDate: '2026-06-12',
    description: 'Additional reference materials on cell structure and functions from various sources.',
    fileSize: '3.2 MB',
  },
  {
    id: 5,
    title: 'Grammar Rules Handbook',
    type: 'Notes',
    subject: 'English',
    teacher: 'Mrs. Singh',
    uploadDate: '2026-06-10',
    description: 'Complete English grammar rules with examples for all topics.',
    fileSize: '1.8 MB',
  },
  {
    id: 6,
    title: 'World War II - Timeline & Facts',
    type: 'Reference',
    subject: 'History',
    teacher: 'Mr. Rao',
    uploadDate: '2026-06-08',
    description: 'Timeline of key events in World War II with important facts and figures.',
    fileSize: '4.5 MB',
  },
  {
    id: 7,
    title: 'Python Programming - PPT',
    type: 'PPT',
    subject: 'Computer Science',
    teacher: 'Mr. Verma',
    uploadDate: '2026-06-05',
    description: 'Introduction to Python programming with code examples and syntax reference.',
    fileSize: '6.2 MB',
  },
  {
    id: 8,
    title: 'Trigonometry Formulas Guide',
    type: 'Notes',
    subject: 'Mathematics',
    teacher: 'Mrs. Sharma',
    uploadDate: '2026-06-03',
    description: 'Quick reference guide for all trigonometry formulas and identities.',
    fileSize: '1.2 MB',
  },
];

const StudyMaterials = () => {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');

  const filteredMaterials = materials.filter(
    (m) =>
      (subjectFilter === 'All' || m.subject === subjectFilter) &&
      (m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Study Materials</h1>
        <p className="text-gray-500 mb-6">Access notes, presentations, and reference materials</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full sm:w-72">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <HiOutlineFilter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubjectFilter(s)}
              className={classNames(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap',
                subjectFilter === s
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {filteredMaterials.length === 0 ? (
        <motion.div variants={item}>
          <EmptyState
            title="No materials found"
            description="Try changing your filter or search criteria"
          />
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMaterials.map((m, i) => {
            const Icon = typeIcons[m.type] || HiOutlineDocumentText;
            return (
              <motion.div
                key={m.id}
                variants={item}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all group"
              >
                <div className={classNames(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-3',
                  m.type === 'Notes' ? 'bg-blue-50' : m.type === 'PPT' ? 'bg-orange-50' : m.type === 'Video' ? 'bg-purple-50' : 'bg-green-50'
                )}>
                  <Icon className={classNames(
                    'w-6 h-6',
                    m.type === 'Notes' ? 'text-blue-600' : m.type === 'PPT' ? 'text-orange-600' : m.type === 'Video' ? 'text-purple-600' : 'text-green-600'
                  )} />
                </div>

                <Badge variant={typeColors[m.type]} size="sm">{m.type}</Badge>

                <h3 className="text-base font-semibold text-gray-800 mt-2 mb-1 line-clamp-2">{m.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{m.subject}</p>
                <p className="text-xs text-gray-400 mb-3">{m.fileSize} · {m.teacher}</p>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{m.description}</p>

                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm" className="flex-1" iconLeft={<HiOutlineDownload className="w-4 h-4" />}>
                    Download
                  </Button>
                  <Button variant="secondary" size="sm" iconLeft={<HiOutlineEye className="w-4 h-4" />}>
                    View
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudyMaterials;
