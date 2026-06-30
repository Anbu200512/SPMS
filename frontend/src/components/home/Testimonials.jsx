import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Parent',
    quote: 'St. Paul\'s has been instrumental in my child\'s overall development. The teachers are dedicated and the environment is nurturing. I couldn\'t have asked for a better school.',
    avatar: '👩',
  },
  {
    id: 2,
    name: 'Rahul Kumar',
    role: 'Student (Class X)',
    quote: 'The smart classrooms and lab facilities are amazing! The teachers make learning fun and help us understand every concept clearly.',
    avatar: '👦',
  },
  {
    id: 3,
    name: 'Dr. Meena Rajan',
    role: 'Parent',
    quote: 'We chose St. Paul\'s for our daughter and it has been the best decision. The school focuses not just on academics but also on character building.',
    avatar: '👩‍⚕️',
  },
  {
    id: 4,
    name: 'Arun Prakash',
    role: 'Alumnus',
    quote: 'The values and education I received at St. Paul\'s have shaped my career and life. Grateful to all my teachers for their guidance.',
    avatar: '👨‍💼',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-500 font-medium mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700">What People Say</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-primary-50 rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="text-5xl mb-4">{testimonials[current].avatar}</div>
              <div className="text-4xl text-accent-200 mb-4">"</div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                {testimonials[current].quote}
              </p>
              <div>
                <p className="font-heading font-semibold text-primary-700 text-lg">
                  {testimonials[current].name}
                </p>
                <p className="text-gray-500">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm"
            >
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === current ? 'bg-primary-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm"
            >
              <HiOutlineChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
