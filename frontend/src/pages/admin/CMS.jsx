import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineGlobe,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import { classNames } from '../../utils/helpers';

const initialSections = {
  hero: {
    title: 'Welcome to SPMS School',
    subtitle: 'Empowering minds, shaping futures since 1995',
    buttonText: 'Learn More',
    image: '',
    active: true,
  },
  about: {
    title: 'About Our School',
    content: 'SPMS School is a premier educational institution dedicated to providing quality education from classes 6 to 12. Our mission is to nurture students into responsible, knowledgeable, and compassionate individuals who can contribute meaningfully to society.\n\nWith state-of-the-art facilities, experienced faculty, and a comprehensive curriculum, we strive to create an environment where every student can excel academically and personally.',
    image: '',
    active: true,
  },
  welcomeMessage: {
    title: 'Principal\'s Welcome',
    content: 'Welcome to SPMS School! We are committed to creating a nurturing environment where every child can discover their potential and thrive. Our dedicated team works tirelessly to ensure holistic development of each student.',
    author: 'Dr. Principal Name',
    designation: 'Principal',
    image: '',
    active: true,
  },
  principalMessage: {
    title: 'From the Principal\'s Desk',
    content: 'Education is not just about academic excellence; it is about building character, fostering creativity, and developing critical thinking. At SPMS, we focus on all-round development of our students through a balanced approach to learning and extra-curricular activities.',
    author: 'Dr. Principal Name',
    designation: 'Principal',
    image: '',
    active: true,
  },
};

export default function CMS() {
  const [sections, setSections] = useState(initialSections);
  const [activeSection, setActiveSection] = useState('hero');
  const [preview, setPreview] = useState(false);
  const [editing, setEditing] = useState(null);

  const section = sections[activeSection];
  const sectionLabels = {
    hero: 'Hero Section',
    about: 'About Us',
    welcomeMessage: 'Welcome Message',
    principalMessage: 'Principal Message',
  };

  const handleSave = () => {
    setEditing(null);
  };

  const handleFieldChange = (field, value) => {
    setSections({ ...sections, [activeSection]: { ...sections[activeSection], [field]: value } });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineGlobe className="w-7 h-7 text-primary-500" />
          Website Content Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage website content sections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm space-y-1">
            {Object.entries(sectionLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setActiveSection(key); setPreview(false); }}
                className={classNames(
                  'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  activeSection === key ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading font-semibold text-gray-800">{sectionLabels[activeSection]}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreview(!preview)}
                  className={classNames('flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors', preview ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50')}
                >
                  <HiOutlineEye className="w-4 h-4" /> Preview
                </button>
                <Button size="sm" iconLeft={<HiOutlineCheckCircle className="w-4 h-4" />} onClick={handleSave}>Save Changes</Button>
              </div>
            </div>

            {preview ? (
              <div className="p-6 bg-gray-50 rounded-xl">
                {section.image && (
                  <img src={section.image} alt={section.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">{section.title}</h2>
                {section.subtitle && <p className="text-gray-500 mb-4">{section.subtitle}</p>}
                <div className="text-sm text-gray-600 whitespace-pre-wrap">{section.content}</div>
                {section.author && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-800">{section.author}</p>
                    <p className="text-xs text-gray-500">{section.designation}</p>
                  </div>
                )}
                {section.buttonText && (
                  <button className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium">{section.buttonText}</button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={section.title} onChange={(e) => handleFieldChange('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                {section.subtitle !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input type="text" value={section.subtitle} onChange={(e) => handleFieldChange('subtitle', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                )}

                {section.buttonText !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                    <input type="text" value={section.buttonText} onChange={(e) => handleFieldChange('buttonText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                )}

                {section.content !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea rows={8} value={section.content} onChange={(e) => handleFieldChange('content', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                )}

                {section.author !== undefined && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                      <input type="text" value={section.author} onChange={(e) => handleFieldChange('author', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                      <input type="text" value={section.designation} onChange={(e) => handleFieldChange('designation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="url" value={section.image} onChange={(e) => handleFieldChange('image', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Active</label>
                  <input type="checkbox" checked={section.active} onChange={(e) => handleFieldChange('active', e.target.checked)} className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
