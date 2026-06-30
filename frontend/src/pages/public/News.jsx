import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCalendar, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import PageHeader from '../../components/common/PageHeader';
import { formatDate, truncateText } from '../../utils/helpers';

const allPosts = [
  { id: 1, title: 'St. Paul\'s Students Shine in Board Exams', excerpt: 'Our students have achieved outstanding results in the 10th and 12th grade board examinations with a 98% pass rate.', date: '2026-05-20', category: 'Achievements', color: 'bg-blue-400' },
  { id: 2, title: 'New Science Lab Inaugurated', excerpt: 'The state-of-the-art science laboratory was inaugurated by the Chief Guest Dr. Rajesh Kumar on Monday.', date: '2026-05-15', category: 'Campus', color: 'bg-green-400' },
  { id: 3, title: 'Inter-School Sports Competition Results', excerpt: 'Our school team emerged as overall champions in the inter-school sports competition held last week.', date: '2026-05-10', category: 'Sports', color: 'bg-red-400' },
  { id: 4, title: 'Workshop on Digital Learning', excerpt: 'A workshop on digital learning tools and techniques was conducted for teachers to enhance classroom engagement.', date: '2026-05-05', category: 'Academic', color: 'bg-purple-400' },
  { id: 5, title: 'Annual Cultural Fest Registration Open', excerpt: 'Registrations are now open for the annual cultural fest. Students can sign up for various competitions.', date: '2026-04-28', category: 'Events', color: 'bg-amber-400' },
  { id: 6, title: 'Parent-Teacher Meeting Schedule', excerpt: 'The schedule for the upcoming parent-teacher meeting has been released. Check the details here.', date: '2026-04-20', category: 'Academic', color: 'bg-cyan-400' },
  { id: 7, title: 'School Achieves Green Campus Award', excerpt: 'St. Paul\'s has been recognized with the Green Campus Award for our sustainable practices and eco-friendly initiatives.', date: '2026-04-15', category: 'Achievements', color: 'bg-emerald-400' },
  { id: 8, title: 'New Library Books Arrival', excerpt: 'Over 500 new books have been added to the school library including fiction, non-fiction, and reference materials.', date: '2026-04-10', category: 'Campus', color: 'bg-teal-400' },
  { id: 9, title: 'Yoga and Meditation Workshop', excerpt: 'A special yoga and meditation workshop was organized for students to promote mental well-being.', date: '2026-04-05', category: 'Events', color: 'bg-orange-400' },
  { id: 10, title: 'Science Exhibition Winners Announced', excerpt: 'Congratulations to all winners of the annual science exhibition. The judges were impressed by the innovative projects.', date: '2026-03-28', category: 'Achievements', color: 'bg-indigo-400' },
  { id: 11, title: 'Summer Vacation Notice', excerpt: 'The school will remain closed for summer vacation from May 1st to June 2nd. Reopening on June 3rd.', date: '2026-04-25', category: 'Campus', color: 'bg-pink-400' },
  { id: 12, title: 'Chess Tournament Results', excerpt: 'Our chess team won the district-level chess tournament held at the City Convention Center.', date: '2026-03-20', category: 'Sports', color: 'bg-lime-400' },
  { id: 13, title: 'Admission Open for Academic Year 2026-27', excerpt: 'Admissions are now open for LKG to 12th standard. Limited seats available. Apply online today.', date: '2026-03-15', category: 'Academic', color: 'bg-sky-400' },
  { id: 14, title: 'Republic Day Celebration', excerpt: 'The 77th Republic Day was celebrated with great enthusiasm. Students presented patriotic performances.', date: '2026-01-26', category: 'Events', color: 'bg-rose-400' },
];

const categories = ['All', 'Academic', 'Achievements', 'Campus', 'Events', 'Sports'];
const POSTS_PER_PAGE = 6;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const News = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = activeCategory === 'All'
    ? allPosts
    : allPosts.filter((post) => post.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const getCategoryCount = (cat) => cat === 'All' ? allPosts.length : allPosts.filter((p) => p.category === cat).length;

  const recentPosts = allPosts.slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader
        title="News & Updates"
        subtitle="Latest news, achievements, and announcements from St. Paul's School"
      />

      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={activeCategory + currentPage}
                className="grid sm:grid-cols-2 gap-6"
              >
                {paginatedPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
                  >
                    <div className={`h-48 ${post.color} flex items-center justify-center relative`}>
                      <span className="text-white/30 text-6xl">
                        {post.category === 'Achievements' ? '🏆' : post.category === 'Campus' ? '🏛' : post.category === 'Events' ? '🎉' : post.category === 'Sports' ? '⚽' : '📚'}
                      </span>
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                        <HiOutlineCalendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-gray-800 mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{truncateText(post.excerpt, 120)}</p>
                      <Link
                        to="#"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
                      >
                        Read More
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {paginatedPosts.length === 0 && (
                <div className="text-center py-16 col-span-2">
                  <div className="text-5xl mb-4">📰</div>
                  <p className="text-gray-500 text-lg">No news articles found.</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <HiOutlineChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary-500 text-white'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <HiOutlineChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <aside className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
                        activeCategory === cat
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeCategory === cat ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {getCategoryCount(cat)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      to="#"
                      className="flex gap-3 group"
                    >
                      <div className={`w-14 h-14 rounded-lg ${post.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-lg">
                          {post.category === 'Achievements' ? '🏆' : post.category === 'Campus' ? '🏛' : post.category === 'Events' ? '🎉' : post.category === 'Sports' ? '⚽' : '📚'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(post.date)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default News;
