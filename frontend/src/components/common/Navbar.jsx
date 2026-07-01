import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenu, HiOutlineX, HiOutlineChevronDown } from 'react-icons/hi';
import { NAV_LINKS } from '../../utils/constants';
import { classNames } from '../../utils/helpers';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-heading font-bold text-lg">
              SP
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-heading font-bold text-primary-700">St. Paul's</span>
              <span className="text-lg font-heading font-bold text-accent-500"> School</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={classNames(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1',
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  )}
                >
                  {link.label}
                  {link.children && (
                    <HiOutlineChevronDown
                      className={classNames(
                        'w-4 h-4 transition-transform',
                        activeDropdown === link.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-medium bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl lg:hidden z-50"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-heading font-bold text-primary-700">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.path}
                      onClick={() => !link.children && setIsOpen(false)}
                      className={classNames(
                        'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        isActive(link.path)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 space-y-1 mt-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-5 py-3 text-center text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-5 py-3 text-center text-sm font-medium bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
