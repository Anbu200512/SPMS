import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlinePhotograph,
  HiOutlineTrash,
  HiOutlineStar,
  HiOutlineUpload,
  HiOutlinePlus,
} from 'react-icons/hi';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { classNames } from '../../utils/helpers';

const initialImages = [
  { id: 1, title: 'Annual Day 2026', description: 'Students performing on stage during the annual day celebration', category: 'Events', url: 'https://placehold.co/400x300/eee/999?text=Annual+Day', featured: true },
  { id: 2, title: 'Science Exhibition', description: 'Students presenting their science projects', category: 'Academic', url: 'https://placehold.co/400x300/eee/999?text=Science', featured: false },
  { id: 3, title: 'Sports Day', description: 'Annual sports day competition', category: 'Sports', url: 'https://placehold.co/400x300/eee/999?text=Sports', featured: true },
  { id: 4, title: 'Classroom Activity', description: 'Students engaged in group activity', category: 'Academic', url: 'https://placehold.co/400x300/eee/999?text=Classroom', featured: false },
  { id: 5, title: 'Cultural Fest', description: 'Cultural program by students', category: 'Events', url: 'https://placehold.co/400x300/eee/999?text=Cultural', featured: false },
  { id: 6, title: 'Library Session', description: 'Students reading in the library', category: 'Academic', url: 'https://placehold.co/400x300/eee/999?text=Library', featured: false },
];

const categories = ['Events', 'Academic', 'Sports', 'Cultural'];

export default function Gallery() {
  const [images, setImages] = useState(initialImages);
  const [uploadModal, setUploadModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [form, setForm] = useState({ title: '', description: '', category: 'Events', url: '' });

  const filtered = activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory);

  const handleUpload = (e) => {
    e.preventDefault();
    setImages([...images, { id: Date.now(), ...form, featured: false }]);
    setUploadModal(false);
    setForm({ title: '', description: '', category: 'Events', url: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this image?')) setImages(images.filter((img) => img.id !== id));
  };

  const toggleFeatured = (id) => {
    setImages(images.map((img) => img.id === id ? { ...img, featured: !img.featured } : img));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlinePhotograph className="w-7 h-7 text-primary-500" />
          Gallery Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Upload and manage school gallery images</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {['All', ...categories].map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={classNames('px-4 py-2 text-sm font-medium rounded-md transition-colors', activeCategory === cat ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700')}>{cat}</button>
          ))}
        </div>
        <Button iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setUploadModal(true)}>Upload Image</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img) => (
          <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="relative aspect-[4/3] bg-gray-100">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => toggleFeatured(img.id)} className={classNames('p-2 rounded-full', img.featured ? 'bg-yellow-400 text-white' : 'bg-white text-gray-600 hover:bg-yellow-400 hover:text-white transition-colors')}><HiOutlineStar className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(img.id)} className="p-2 rounded-full bg-white text-red-600 hover:bg-red-500 hover:text-white transition-colors"><HiOutlineTrash className="w-4 h-4" /></button>
              </div>
              {img.featured && <span className="absolute top-2 left-2 px-2 py-0.5 bg-yellow-400 text-white text-xs font-medium rounded-full">Featured</span>}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-800 truncate">{img.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{img.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={uploadModal} onClose={() => setUploadModal(false)} title="Upload Image">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="url" required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setUploadModal(false)}>Cancel</Button>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
