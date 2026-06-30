import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';

const Table = ({ columns, data, loading, emptyMessage, sortable = true }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    if (!sortable) return;
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = [...(data || [])].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) {
    return <Loader fullScreen={false} text="Loading data..." />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyMessage || 'No records found'} />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable !== false && handleSort(col.key)}
                className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                  col.sortable !== false && sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
                }`}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable !== false && sortable && sortConfig.key === col.key && (
                    <span className="text-primary-500">
                      {sortConfig.direction === 'asc' ? (
                        <HiOutlineChevronUp className="w-4 h-4" />
                      ) : (
                        <HiOutlineChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {sortedData.map((row, idx) => (
            <motion.tr
              key={row._id || row.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {col.render ? col.render(row[col.key], row) : row[col.key] ?? '-'}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
