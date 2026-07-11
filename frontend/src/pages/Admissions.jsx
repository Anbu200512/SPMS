import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AdmissionsHero from '../components/admissions/AdmissionsHero';
import AdmissionForm from '../components/forms/AdmissionForm';

const Admissions = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <AdmissionsHero />
      <section id="process" className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">Admission Process</h2>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Submit Application', desc: 'Fill out the online application form with student details.' },
                  { step: '02', title: 'Document Verification', desc: 'Submit required documents for verification.' },
                  { step: '03', title: 'Interaction', desc: 'Schedule an interaction with the student and parents.' },
                  { step: '04', title: 'Confirmation', desc: 'Receive admission confirmation and fee details.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-heading font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div id="application-form" className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-heading font-bold text-primary-700 mb-6">Application Form</h3>
                <AdmissionForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </motion.div>
  );
};

export default Admissions;
