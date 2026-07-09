import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const achievements = [
  {
    title: 'Board Results',
    desc: 'Consistent 100% pass rate in board examinations with top ranks',
    image: 'https://plus.unsplash.com/premium_photo-1770458472927-cb395dc86cb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJvYXJkJTIwZXhhbXMlMjByZXN1bHRzfGVufDB8fDB8fHww',
  },
  {
    title: 'Competitions',
    desc: 'Regular winners in district, state, and national level competitions',
    image: 'https://media.istockphoto.com/id/1343562834/photo/school-children-playing-basketball-in-basketball-court-in-school.webp?a=1&b=1&s=612x612&w=0&k=20&c=ixNG0hDqsMJeeonz65i4vTjqb2fKv2PyOGfKFhYdLx4=',
  },
  {
    title: 'Innovation',
    desc: 'Smart classrooms and digital learning initiatives for modern education',
    image: 'https://plus.unsplash.com/premium_photo-1681841949799-cd79672b5c3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2Nob29sJTIwSW5ub3ZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'Co-curricular',
    desc: 'Extensive programs in sports, arts, music, and cultural activities',
    image: 'https://images.unsplash.com/photo-1581929345506-5b7889b43585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Nob29sJTIwQ28tY3VycmljdWxhcnxlbnwwfHwwfHx8MA%3D%3D',
  },
];

const AcademicExcellence = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-50 rounded-full blur-[120px]" />
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
            Our Achievements
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
            Academic Excellence
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
            <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            A track record of outstanding academic performance and holistic student development
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20 group-hover:from-gray-900/90 group-hover:via-gray-900/60 group-hover:to-gray-900/40 transition-all duration-500" />

              <div className="relative z-10 p-8 flex flex-col justify-end min-h-[320px]">
                <h3 className="text-xl font-heading font-bold text-gray-100 mb-3 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-300 leading-relaxed text-sm group-hover:text-white transition-colors">
                  {item.desc}
                </p>

                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent-300 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/academics"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View All Achievements
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademicExcellence;
