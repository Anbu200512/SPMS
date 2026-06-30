import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineSearch,
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

const Homework = () => {
  const [search, setSearch] = useState('');
  const [doneIds, setDoneIds] = useState(new Set());
  const [filter, setFilter] = useState('all');

  const homeworkList = [
    {
      id: 1,
      title: 'Chapter 5 - Exercise 5.1',
      subject: 'Mathematics',
      dueDate: '2026-07-02',
      description: 'Complete all odd-numbered problems from Exercise 5.1 of Chapter 5: Arithmetic Progressions.',
    },
    {
      id: 2,
      title: 'Diagram of Human Heart',
      subject: 'Biology',
      dueDate: '2026-07-04',
      description: 'Draw and label a neat diagram of the human heart in your biology notebook.',
    },
    {
      id: 3,
      title: 'French Revolution Notes',
      subject: 'History',
      dueDate: '2026-07-01',
      description: 'Write a summary of Chapter 1: The French Revolution. Include key dates and events.',
    },
    {
      id: 4,
      title: 'Periodic Table Practice',
      subject: 'Chemistry',
      dueDate: '2026-07-06',
      description: 'Memorise the first 20 elements of the periodic table with their symbols and atomic numbers.',
    },
    {
      id: 5,
      title: 'Python Loops Assignment',
      subject: 'Computer Science',
      dueDate: '2026-07-03',
      description: 'Write Python programs using for and while loops. Print patterns and calculate sums.',
    },
  ];

  const toggleDone = (id) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredList = homeworkList
    .filter((h) => {
      if (filter === 'done') return doneIds.has(h.id);
      if (filter === 'pending') return !doneIds.has(h.id);
      return true;
    })
    .filter(
      (h) =>
        h.title.toLowerCase().includes(search.toLowerCase()) ||
        h.subject.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Homework</h1>
        <p className="text-gray-500 mb-6">View and track your daily homework</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full sm:w-72">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search homework..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'pending', 'done'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={classNames(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
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

      {filteredList.length === 0 ? (
        <motion.div variants={item}>
          <EmptyState
            title="No homework found"
            description="You're all caught up! No pending homework."
          />
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredList.map((hw, i) => {
            const isDone = doneIds.has(hw.id);
            const isOverdue = new Date(hw.dueDate) < new Date() && !isDone;
            return (
              <motion.div
                key={hw.id}
                variants={item}
                className={classNames(
                  'bg-white rounded-xl shadow-sm border p-5 transition-all',
                  isDone
                    ? 'border-green-200 bg-green-50/30'
                    : isOverdue
                    ? 'border-red-200'
                    : 'border-gray-100 hover:shadow-md'
                )}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleDone(hw.id)}
                    className={classNames(
                      'mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                      isDone
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-primary-500'
                    )}
                  >
                    {isDone && <HiOutlineCheckCircle className="w-4 h-4" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={classNames(
                        'text-base font-semibold',
                        isDone ? 'text-gray-400 line-through' : 'text-gray-800'
                      )}>
                        {hw.title}
                      </h3>
                      {isOverdue && (
                        <Badge variant="danger" size="sm" className="flex-shrink-0">Overdue</Badge>
                      )}
                      {isDone && (
                        <Badge variant="success" size="sm" className="flex-shrink-0">Done</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <HiOutlineBookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{hw.subject}</span>
                    </div>

                    <p className={classNames(
                      'text-sm mt-2',
                      isDone ? 'text-gray-400' : 'text-gray-600'
                    )}>
                      {hw.description}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <HiOutlineCalendar className="w-4 h-4" />
                      <span className={classNames(
                        isOverdue ? 'text-red-500 font-medium' : ''
                      )}>
                        Due: {formatDate(hw.dueDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {!isDone && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      iconLeft={<HiOutlineCheckCircle className="w-4 h-4" />}
                      onClick={() => toggleDone(hw.id)}
                    >
                      Mark as Done
                    </Button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Homework;
