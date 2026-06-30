import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineNewspaper,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { classNames, formatDate } from '../../utils/helpers';

const initialArticles = [
  { id: 1, title: 'School Wins Inter-School Competition', content: 'Our students have won first place in the inter-school science competition held at the city level. The team demonstrated exceptional skills and knowledge.', excerpt: 'Our students won first place in inter-school science competition.', category: 'Achievement', image: '', status: 'published', publishDate: '2026-06-25' },
  { id: 2, title: 'New Academic Year Begins', content: 'The new academic year 2026-27 has begun with a grand orientation ceremony. New students were welcomed by the principal and staff.', excerpt: 'New academic year 2026-27 begins with orientation.', category: 'Academic', image: '', status: 'published', publishDate: '2026-06-20' },
  { id: 3, title: 'PTA Meeting Scheduled', content: 'The quarterly PTA meeting is scheduled for July 20th. All parents are requested to attend.', excerpt: 'Quarterly PTA meeting on July 20th.', category: 'Notice', image: '', status: 'draft', publishDate: '' },
];

const categories = ['Achievement', 'Academic', 'Notice', 'Sports', 'Cultural', 'General'];

export default function News() {
  const [articles, setArticles] = useState(initialArticles);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [previewModal, setPreviewModal] = useState(null);
  const [editArticle, setEditArticle] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', category: 'General', image: '' });

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.status === filter);

  const handleAdd = () => {
    setEditArticle(null);
    setForm({ title: '', content: '', excerpt: '', category: 'General', image: '' });
    setModalOpen(true);
  };

  const handleEdit = (article) => {
    setEditArticle(article);
    setForm({ title: article.title, content: article.content, excerpt: article.excerpt, category: article.category, image: article.image });
    setModalOpen(true);
  };

  const handleDelete = (article) => {
    if (window.confirm(`Delete article "${article.title}"?`)) setArticles(articles.filter((a) => a.id !== article.id));
  };

  const handleSubmit = (e, publish = false) => {
    e.preventDefault();
    const data = { ...form, status: publish ? 'published' : 'draft', publishDate: publish ? new Date().toISOString().split('T')[0] : '' };
    if (editArticle) {
      setArticles(articles.map((a) => a.id === editArticle.id ? { ...a, ...data } : a));
    } else {
      setArticles([...articles, { id: Date.now(), ...data }]);
    }
    setModalOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineNewspaper className="w-7 h-7 text-primary-500" />
          News Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage news articles</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {[{ key: 'all', label: 'All' }, { key: 'published', label: 'Published' }, { key: 'draft', label: 'Drafts' }].map((tab) => (
            <button key={tab.key} onClick={() => setFilter(tab.key)} className={classNames('px-4 py-2 text-sm font-medium rounded-md transition-colors', filter === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700')}>{tab.label}</button>
          ))}
        </div>
        <Button iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={handleAdd}>New Article</Button>
      </div>

      <div className="space-y-3">
        {filtered.map((article) => (
          <motion.div key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-heading font-semibold text-gray-800">{article.title}</h3>
                  <span className={classNames('px-2 py-0.5 text-xs font-medium rounded-full', article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>{article.status}</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{article.category}</span>
                </div>
                <p className="text-sm text-gray-500">{article.excerpt}</p>
                {article.publishDate && <p className="text-xs text-gray-400 mt-2">Published: {formatDate(article.publishDate)}</p>}
              </div>
              <div className="flex items-center gap-1 ml-4">
                <button onClick={() => setPreviewModal(article)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><HiOutlineEye className="w-4 h-4" /></button>
                <button onClick={() => handleEdit(article)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><HiOutlinePencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(article)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><HiOutlineTrash className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editArticle ? 'Edit Article' : 'New Article'} size="xl">
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea rows={6} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
              <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="outline" type="submit" iconLeft={<HiOutlineClock className="w-4 h-4" />}>Save as Draft</Button>
            <Button type="button" iconLeft={<HiOutlineCheckCircle className="w-4 h-4" />} onClick={(e) => handleSubmit(e, true)}>Publish</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!previewModal} onClose={() => setPreviewModal(null)} title="Preview Article" size="lg">
        {previewModal && (
          <div>
            {previewModal.image && <img src={previewModal.image} alt={previewModal.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
            <h2 className="text-xl font-heading font-bold text-gray-800 mb-2">{previewModal.title}</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">{previewModal.category}</span>
              {previewModal.publishDate && <span className="text-xs text-gray-400">{formatDate(previewModal.publishDate)}</span>}
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{previewModal.content}</p>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
