import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PageHeader from '../components/common/PageHeader';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you" />
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">123, School Street, Educational District, City - 600001</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl">✉️</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">info@stpaulsschool.edu</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl">🕐</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">School Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 3:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-primary-700 mb-6">Send us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
};

export default Contact;
