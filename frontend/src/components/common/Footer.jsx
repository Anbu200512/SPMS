import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center text-white font-heading font-bold text-lg">
                SP
              </div>
              <span className="text-lg font-heading font-bold">St. Paul's School</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering young minds with quality education, character building, and holistic
              development since 2000. We nurture future leaders with knowledge and values.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Academics', path: '/academics' },
                { label: 'Admissions', path: '/admissions' },
                { label: 'Facilities', path: '/facilities' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123, School Street, Educational District, City - 600001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@stpaulsschool.edu</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Follow Us</h3>
            <p className="text-gray-400 text-sm mb-4">
              Stay connected with us on social media for updates and events.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all"
                >
                  <span className="text-xs font-medium uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} St. Paul's Matriculation School. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-accent-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-accent-400 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
