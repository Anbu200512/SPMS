import React from 'react';
import { motion } from 'framer-motion';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ContactHero />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
                <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">
                  Send Us a Message
                </h2>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-gradient-to-br from-primary-700 to-primary-800 rounded-2xl p-8 text-white">
                <h3 className="text-lg font-heading font-bold mb-3">Quick Response</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  We typically respond within 24 hours during school days. For urgent matters, please call us directly.
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-accent-400 rounded-full" />
                  <span className="text-white/90 font-medium">Usually replies in 2–4 hours</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-heading font-bold text-primary-700 mb-4">Other Ways to Connect</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Follow us on Facebook', href: '#' },
                    { label: 'Follow us on Instagram', href: '#' },
                    { label: 'Subscribe on YouTube', href: '#' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors"
                    >
                      {link.label} &rarr;
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactInfo />
      <ContactMap />
    </motion.div>
  );
};

export default Contact;
