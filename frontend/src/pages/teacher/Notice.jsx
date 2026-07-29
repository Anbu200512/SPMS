import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlinePaperClip,
  HiOutlineUserGroup,
  HiOutlineGlobe,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/common/EmptyState';
import { getNotices } from '../../services/teacherService';
import { showError } from '../../components/ui/Toast';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await getNotices();
      setNotices(res.data?.data?.notices || res.data?.notices || []);
    } catch {
      showError('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const filteredNotices =
    filter === 'teachers'
      ? notices.filter((n) => n.targetAudience === 'teachers' || n.targetAudience === 'both')
      : notices;

  const groupedNotices = filteredNotices.reduce((groups, notice) => {
    const date = new Date(notice.createdAt).toDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(notice);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedNotices).sort((a, b) => new Date(b) - new Date(a));

  if (loading) {
    return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" />
        </div>
    );
  }

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Notice Board</h1>
          <p className="text-gray-500 mt-1">View official notices and announcements</p>
        </div>

        <div className="flex items-center gap-2">
          {[
            { key: 'all', label: 'All Notices', icon: HiOutlineGlobe },
            { key: 'teachers', label: 'Teachers', icon: HiOutlineUserGroup },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={classNames(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
                filter === key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {filteredNotices.length === 0 ? (
          <Card>
            <EmptyState
              icon={<HiOutlineBell className="w-12 h-12" />}
              title="No notices found"
              description="There are no notices available for this category."
            />
          </Card>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((dateKey) => (
              <div key={dateKey}>
                <div className="flex items-center gap-2 mb-3">
                  <HiOutlineCalendar className="w-4 h-4 text-gray-400" />
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {formatDate(dateKey)}
                  </h2>
                </div>
                <div className="space-y-3">
                  {groupedNotices[dateKey].map((notice, idx) => (
                    <motion.div
                      key={notice._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={notice.targetAudience === 'teachers' ? 'info' : 'default'} size="sm">
                              {notice.targetAudience === 'both' ? 'All' : notice.targetAudience}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {formatDate(notice.createdAt, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <h3 className="text-base font-heading font-semibold text-gray-800">{notice.title}</h3>
                          <p className="text-sm text-gray-600 mt-1.5 whitespace-pre-line">{notice.content}</p>
                          {notice.file && (
                            <a
                              href={notice.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                              <HiOutlinePaperClip className="w-4 h-4" />
                              View Attachment
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
  );
};

export default Notice;
