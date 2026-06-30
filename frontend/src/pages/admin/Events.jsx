import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineViewList,
  HiOutlineViewGrid,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { classNames, formatDate } from '../../utils/helpers';

const initialEvents = [
  { id: 1, title: 'Annual Day Celebration', description: 'Annual day celebration with cultural programs and awards ceremony.', date: '2026-07-15', time: '10:00 AM', venue: 'School Auditorium', type: 'Academic', image: 'https://placehold.co/800x400/eee/999?text=Annual+Day', status: 'upcoming' },
  { id: 2, title: 'PTA Meeting', description: 'Parent Teacher Association quarterly meeting.', date: '2026-07-20', time: '2:00 PM', venue: 'Conference Hall', type: 'Meeting', image: '', status: 'upcoming' },
  { id: 3, title: 'Science Exhibition', description: 'Annual science exhibition showcasing student projects.', date: '2026-07-25', time: '9:00 AM', venue: 'Science Block', type: 'Academic', image: 'https://placehold.co/800x400/eee/999?text=Science', status: 'upcoming' },
  { id: 4, title: 'Sports Day', description: 'Annual sports day with various competitions.', date: '2026-06-05', time: '8:00 AM', venue: 'Sports Ground', type: 'Sports', image: 'https://placehold.co/800x400/eee/999?text=Sports', status: 'past' },
];

const eventTypes = ['Academic', 'Sports', 'Cultural', 'Meeting', 'Holiday', 'Other'];

export default function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [viewMode, setViewMode] = useState('list');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', venue: '', type: 'Academic', image: '' });

  const filtered = filter === 'all' ? events : events.filter((e) => e.status === filter);

  const handleAdd = () => {
    setEditEvent(null);
    setForm({ title: '', description: '', date: '', time: '', venue: '', type: 'Academic', image: '' });
    setModalOpen(true);
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setForm({ title: event.title, description: event.description, date: event.date, time: event.time, venue: event.venue, type: event.type, image: event.image });
    setModalOpen(true);
  };

  const handleDelete = (event) => {
    if (window.confirm(`Delete event "${event.title}"?`)) setEvents(events.filter((e) => e.id !== event.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editEvent) {
      setEvents(events.map((ev) => ev.id === editEvent.id ? { ...ev, ...form } : ev));
    } else {
      setEvents([...events, { id: Date.now(), ...form, status: 'upcoming' }]);
    }
    setModalOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineCalendar className="w-7 h-7 text-primary-500" />
          Event Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage school events</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {[{ key: 'all', label: 'All' }, { key: 'upcoming', label: 'Upcoming' }, { key: 'past', label: 'Past' }].map((tab) => (
            <button key={tab.key} onClick={() => setFilter(tab.key)} className={classNames('px-4 py-2 text-sm font-medium rounded-md transition-colors', filter === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700')}>{tab.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button onClick={() => setViewMode('list')} className={classNames('p-1.5 rounded-md', viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-400')}><HiOutlineViewList className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('grid')} className={classNames('p-1.5 rounded-md', viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-400')}><HiOutlineViewGrid className="w-4 h-4" /></button>
          </div>
          <Button iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={handleAdd}>Create Event</Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filtered.map((event) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold leading-tight">{new Date(event.date).getDate()}</span>
                <span className="text-xs leading-tight">{new Date(event.date).toLocaleString('en', { month: 'short' })}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-800">{event.title}</h3>
                  <span className={classNames('px-2 py-0.5 text-xs font-medium rounded-full', event.type === 'Academic' && 'bg-blue-100 text-blue-700', event.type === 'Sports' && 'bg-green-100 text-green-700', event.type === 'Meeting' && 'bg-purple-100 text-purple-700', event.type === 'Cultural' && 'bg-pink-100 text-pink-700')}>{event.type}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" />{event.time}</span>
                  <span className="flex items-center gap-1"><HiOutlineLocationMarker className="w-3.5 h-3.5" />{event.venue}</span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(event)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><HiOutlinePencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(event)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><HiOutlineTrash className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((event) => (
            <motion.div key={event.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {event.image && <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={classNames('px-2 py-0.5 text-xs font-medium rounded-full', event.type === 'Academic' && 'bg-blue-100 text-blue-700', event.type === 'Sports' && 'bg-green-100 text-green-700', event.type === 'Meeting' && 'bg-purple-100 text-purple-700', event.type === 'Cultural' && 'bg-pink-100 text-pink-700')}>{event.type}</span>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(event)} className="p-1.5 text-gray-400 hover:text-primary-600"><HiOutlinePencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(event)} className="p-1.5 text-gray-400 hover:text-red-600"><HiOutlineTrash className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">{event.title}</h3>
                <p className="text-xs text-gray-400 mb-3">{event.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><HiOutlineCalendar className="w-3.5 h-3.5" />{formatDate(event.date)}</span>
                  <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" />{event.time}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><HiOutlineLocationMarker className="w-3.5 h-3.5" />{event.venue}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editEvent ? 'Edit Event' : 'Create New Event'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="text" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="10:00 AM" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
              <input type="text" required value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
            <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editEvent ? 'Update' : 'Create'} Event</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
