import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import WelcomeSection from '../components/home/WelcomeSection';
import SchoolHighlights from '../components/home/SchoolHighlights';
import AcademicExcellence from '../components/home/AcademicExcellence';
import FeaturedFacilities from '../components/home/FeaturedFacilities';
import PrincipalMessage from '../components/home/PrincipalMessage';
import LatestNews from '../components/home/LatestNews';
import UpcomingEvents from '../components/home/UpcomingEvents';
import GalleryPreview from '../components/home/GalleryPreview';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <SchoolHighlights />
      <AcademicExcellence />
      <PrincipalMessage />
      <FeaturedFacilities />
      <LatestNews />
      <UpcomingEvents />
      <GalleryPreview />
      <Testimonials />
      <CallToAction />
      <Footer />
    </motion.div>
  );
};

export default Home;
