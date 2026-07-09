import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NewsHero from '../components/news/NewsHero';
import NewsCta from '../components/news/NewsCta';
import NewsFilters from '../components/news/NewsFilters';
import NewsCard from '../components/news/NewsCard';
import NewsSidebar from '../components/news/NewsSidebar';
import NewsPagination from '../components/news/NewsPagination';
import allPosts from '../components/news/newsData';

const POSTS_PER_PAGE = 6;

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
      <NewsHero />

      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <NewsFilters
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              <motion.div
                initial="hidden"
                animate="visible"
                key={activeCategory + currentPage}
                className="grid sm:grid-cols-2 gap-6"
              >
                {paginatedPosts.length > 0 ? (
                  paginatedPosts.map((post) => (
                    <NewsCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-16 col-span-2">
                    <div className="text-5xl mb-4">📰</div>
                    <p className="text-gray-500 text-lg">No news articles found.</p>
                  </div>
                )}
              </motion.div>

              <NewsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>

            <NewsSidebar
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              getCategoryCount={getCategoryCount}
              recentPosts={recentPosts}
            />
          </div>
        </div>
      </section>

      <NewsCta />
    </motion.div>
  );
};

export default News;
