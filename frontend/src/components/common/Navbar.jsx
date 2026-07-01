import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineChevronDown,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineAcademicCap,
  HiOutlineClipboard,
  HiOutlinePhotograph,
  HiOutlineMail,
} from "react-icons/hi";
import { NAV_LINKS } from "../../utils/constants";
import { classNames } from "../../utils/helpers";

const linkIcons = {
  Home: HiOutlineHome,
  About: HiOutlineInformationCircle,
  Academics: HiOutlineAcademicCap,
  Admissions: HiOutlineClipboard,
  "Campus Life": HiOutlinePhotograph,
  Contact: HiOutlineMail,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (path) => {
    if (path === "#") return false;
    return location.pathname === path;
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.96,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.15 },
    },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md shadow-primary-500/20 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300">
              SP
            </div>
            <div className="hidden sm:block">
              <span className="text-base sm:text-lg font-heading font-semibold text-gray-800">
                St. Paul's
              </span>
              <span className="text-base sm:text-lg font-heading font-semibold text-primary-600">
                {" "}
                School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = linkIcons[link.label];
              const active = isActive(link.path);
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={classNames(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 group",
                      active
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    {Icon && (
                      <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    )}
                    <span>{link.label}</span>
                    {link.children && (
                      <HiOutlineChevronDown
                        className={classNames(
                          "w-3.5 h-3.5 transition-all duration-200",
                          activeDropdown === link.label && "rotate-180",
                        )}
                      />
                    )}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-primary-500 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg shadow-black/5 border border-gray-100 py-2 overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <motion.div key={child.label} variants={childVariants}>
                            <Link
                              to={child.path}
                              className={classNames(
                                "block px-4 py-2.5 text-sm transition-all duration-150 mx-1.5 rounded-lg",
                                isActive(child.path)
                                  ? "text-primary-600 bg-primary-50 font-medium"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              )}
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-gray-50 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-5 h-4">
              <span
                className={classNames(
                  "absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300",
                  isOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "top-0",
                )}
              />
              <span
                className={classNames(
                  "absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 top-1/2 -translate-y-1/2",
                  isOpen && "opacity-0 scale-0",
                )}
              />
              <span
                className={classNames(
                  "absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300",
                  isOpen
                    ? "bottom-1/2 translate-y-1/2 -rotate-45"
                    : "bottom-0",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed top-16 right-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-gray-100 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="px-4 py-6">
                <div className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const Icon = linkIcons[link.label];
                    return (
                      <div key={link.label}>
                        {link.children ? (
                          <MobileAccordion
                            link={link}
                            setIsOpen={setIsOpen}
                            Icon={Icon}
                          />
                        ) : (
                          <Link
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={classNames(
                              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                              isActive(link.path)
                                ? "text-primary-600 bg-primary-50"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                            )}
                          >
                            {Icon && <Icon className="w-5 h-5" />}
                            {link.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-500/20 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MobileAccordion = ({ link, setIsOpen, Icon }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const hasActiveChild = link.children.some(
    (c) => location.pathname === c.path,
  );

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={classNames(
          "flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
          hasActiveChild
            ? "text-primary-600 bg-primary-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
        )}
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5" />}
          {link.label}
        </span>
        <HiOutlineChevronDown
          className={classNames(
            "w-4 h-4 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-4 border-l-2 border-primary-100 space-y-1 py-1 my-1">
              {link.children.map((child) => (
                <Link
                  key={child.label}
                  to={child.path}
                  onClick={() => setIsOpen(false)}
                  className={classNames(
                    "block px-4 py-2.5 rounded-lg text-sm transition-all duration-200",
                    location.pathname === child.path
                      ? "text-primary-600 bg-primary-50 font-medium"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
