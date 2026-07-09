import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { HiStar } from 'react-icons/hi2';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Parent',
    quote: "St. Paul's has been instrumental in my child's overall development. The teachers are dedicated and the environment is nurturing. I couldn't have asked for a better school.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Kumar',
    role: 'Student (Class X)',
    quote: 'The smart classrooms and lab facilities are amazing! The teachers make learning fun and help us understand every concept clearly.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Meena Rajan',
    role: 'Parent',
    quote: "We chose St. Paul's for our daughter and it has been the best decision. The school focuses not just on academics but also on character building.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
    rating: 5,
  },
  {
    id: 4,
    name: 'Arun Prakash',
    role: 'Alumnus',
    quote: "The values and education I received at St. Paul's have shaped my career and life. Grateful to all my teachers for their guidance.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -80 }),
  };

  return (
    <section className="section-padding bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-accent-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-primary-100 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-50 rounded-full text-sm font-semibold text-accent-700 mb-4">
            <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
            What People Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
            <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Hear from our students, parents, and alumni about their experience at St. Paul's
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-primary-100 relative">
                <div className="absolute -top-3 left-8 text-6xl leading-none text-accent-200/30 font-serif">
                  &ldquo;
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-accent-100 shadow-lg mb-5">
                    <img
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <HiStar key={i} className="w-5 h-5 text-accent-400 fill-accent-400" />
                    ))}
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>

                  <div className="pt-5 border-t border-gray-100">
                    <p className="font-heading font-bold text-primary-700 text-lg">
                      {testimonials[current].name}
                    </p>
                    <p className="text-gray-400 text-sm font-medium">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Previous testimonial"
            >
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1);
                    setCurrent(idx);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    idx === current
                      ? 'w-8 h-2.5 bg-primary-500 shadow-sm'
                      : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Next testimonial"
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
