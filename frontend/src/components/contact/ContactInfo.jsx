import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlineClock } from 'react-icons/hi2';

const details = [
  {
    icon: HiOutlineMapPin,
    title: 'Our Address',
    lines: ['123, School Street', 'Educational District', 'City - 600001'],
    action: { label: 'Get Directions', href: '#' },
  },
  {
    icon: HiOutlinePhone,
    title: 'Phone',
    lines: ['+91 98765 43210', '+91 98765 43211'],
    action: { label: 'Call Now', href: 'tel:+919876543210' },
  },
  {
    icon: HiOutlineEnvelope,
    title: 'Email',
    lines: ['info@stpaulsschool.edu', 'admissions@stpaulsschool.edu'],
    action: { label: 'Send Email', href: 'mailto:info@stpaulsschool.edu' },
  },
  {
    icon: HiOutlineClock,
    title: 'School Hours',
    lines: ['Monday – Friday: 8:00 AM – 3:30 PM', 'Saturday: 9:00 AM – 12:30 PM'],
    action: null,
  },
];

const reasons = [
  { title: 'Admissions', desc: 'Learn about our admission process, requirements, and upcoming deadlines.' },
  { title: 'Academic Programs', desc: 'Get details about our curriculum, subjects, and teaching methodology.' },
  { title: 'Campus Tours', desc: 'Schedule a visit to explore our campus, labs, library, and sports facilities.' },
  { title: 'General Support', desc: 'Questions about fees, transport, uniforms, or any other school services.' },
];

const ContactInfo = () => {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-accent-500 font-semibold mb-3">
              How to Reach Us
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700">
              Our Contact Details
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {details.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl border border-gray-100 bg-white hover:border-accent-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-5 group-hover:bg-accent-100 transition-colors">
                  <item.icon className="w-5 h-5 text-accent-600" />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-sm text-gray-500 leading-relaxed">{line}</p>
                ))}
                {item.action && (
                  <a
                    href={item.action.href}
                    className="inline-block mt-4 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
                  >
                    {item.action.label} &rarr;
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-accent-500 font-semibold mb-3">
                Why Reach Out
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-6">
                We're Here to Help
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Whether you're a parent exploring admissions, a student with a question, or a 
                community member wanting to connect — our team is ready to assist you.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {reasons.map((item) => (
                  <div key={item.title} className="p-5 rounded-xl bg-white border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80"
                  alt="St. Paul's School Campus"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactInfo;
