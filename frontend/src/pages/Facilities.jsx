import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import FacilityStats from '../components/facilities/FacilityStats';
import FacilityFilters from '../components/facilities/FacilityFilters';
import FacilityGrid from '../components/facilities/FacilityGrid';
import FacilityModal from '../components/facilities/FacilityModal';
import OperatingHours from '../components/facilities/OperatingHours';
import FacilityFAQ from '../components/facilities/FacilityFAQ';
import facilitiesData from '../components/facilities/facilitiesData.jsx';

const Facilities = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFacility, setSelectedFacility] = useState(null);

  const filteredFacilities = activeCategory === 'All'
    ? facilitiesData
    : facilitiesData.filter(f => f.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader
        title="Our Facilities"
        subtitle="State-of-the-art infrastructure designed to provide the best learning environment for your child"
      >
        <FacilityStats />
      </PageHeader>
      <section className="section-padding pb-0">
        <div className="section-container">
          <FacilityFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          {filteredFacilities.length > 0 ? (
            <FacilityGrid
              facilities={filteredFacilities}
              onSelect={setSelectedFacility}
            />
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4 opacity-30">🏗️</div>
              <p className="text-gray-500 text-lg">No facilities found in this category.</p>
            </div>
          )}
        </div>
      </section>
      <OperatingHours />
      <FacilityFAQ />
      <FacilityModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />
    </motion.div>
  );
};

export default Facilities;
