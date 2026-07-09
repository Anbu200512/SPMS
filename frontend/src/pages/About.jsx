import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineCalendar, HiOutlineUserGroup, HiOutlineChevronRight } from 'react-icons/hi2';

const stats = [
  { value: '25+', label: 'Years of Legacy' },
  { value: '5000+', label: 'Students Graduated' },
  { value: '200+', label: 'Dedicated Faculty' },
  { value: '100%', label: 'Board Pass Rate' },
];

const milestones = [
  { year: '1982', title: 'Foundation', desc: 'St. Paul\'s Matriculation School was established with a vision to provide quality education.' },
  { year: '1995', title: ' Secondary', desc: 'Expanded to offer secondary education with science and various streams.' },
  { year: '2005', title: 'Digital Era', desc: 'Introduced computer labs and smart classrooms to embrace modern teaching methods.' },
  { year: '2015', title: 'Excellence Award', desc: 'Recognized as one of the top schools in the region for academic excellence.' },
  { year: '2025', title: 'Continuing Legacy', desc: 'Over 5000 alumni worldwide, continuing to uphold the values and traditions of the school.' },
];

const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Banner */}
      <section className="relative pt-20 min-h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599725427295-6ed79ff8dbef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/45 to-black/10" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white mb-8 shadow-lg w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-400" />
                </span>
                <span className="tracking-wide uppercase">Established 1982</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 leading-[1.05] tracking-tight"
            >
              About
              <span className="block text-primary-500 mt-2">St. Paul's</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/90 mb-4 max-w-xl mx-auto leading-relaxed"
            >
              Discover the story of St. Paul's Matriculation School — a legacy of quality education, 
              character building, and holistic development spanning over two decades.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-white/50 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              From our founding in 1982 to becoming one of the most respected educational institutions in the region, our journey has been driven by a passion for nurturing young minds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/admissions"
                className="px-8 py-4 bg-primary-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <HiOutlineUserGroup className="w-5 h-5" />
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <HiOutlineCalendar className="w-5 h-5" />
                Schedule a Visit
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-6"
          >
            {[
              { value: '25+', label: 'Years' },
              { value: '5000+', label: 'Students' },
              { value: '200+', label: 'Faculty' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-white font-bold text-lg">{item.value}</span>
                <span className="text-white/50 text-xs uppercase tracking-wider">{item.label}</span>
                {i < 2 && <span className="w-px h-6 bg-white/20" />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 1: Our Legacy */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-[140px] translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-50 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-20 left-1/3 w-32 h-32 bg-accent-200/30 rounded-full blur-[60px]" />
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
              Since 1982
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
              Our Legacy
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
              <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
            </div>
            <p className="text-gray-500 max-w-xl mx-auto">
              Four decades of shaping young minds and building a tradition of excellence
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
              className="lg:col-span-5 relative"
            >
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/5]">
                    <img
                      src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
                      alt="St. Paul's School Building"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                        <HiOutlineAcademicCap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/70 text-[10px] font-medium uppercase tracking-widest">Established</p>
                        <p className="text-white font-bold text-xl">1982</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-accent-300 z-[-1] hidden lg:block" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl z-10 hidden lg:flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">25+</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Years of</p>
                  <p className="text-sm font-bold text-gray-800">Excellence</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className="lg:col-span-7 relative"
            >
              <div className="absolute -top-10 -right-10 text-[200px] font-heading font-bold text-primary-50 select-none leading-none pointer-events-none hidden lg:block">
                1982
              </div>

              <div className="relative">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                  A Tradition of
                  <span className="block text-primary-500">Educational Excellence</span>
                </h3>

                <div className="flex items-center gap-3 mb-6">
                  <span className="w-14 h-1 bg-primary-500 rounded-full" />
                  <span className="w-8 h-1 bg-accent-400 rounded-full" />
                </div>

                <div className="space-y-5">
                  <p className="text-gray-600 leading-relaxed">
                    <span className="text-3xl font-serif text-primary-500 float-left leading-none mr-2 mt-1">S</span>t. Paul's Matriculation School has been a beacon of quality education for over two decades.
                    Founded in <span className="inline-flex items-center px-2 py-0.5 bg-primary-50 text-primary-700 font-bold text-sm rounded-md">1982</span> with the vision of nurturing young minds,
                    we have consistently strived to provide an environment that fosters academic excellence,
                    character development, and holistic growth.
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    Our dedicated faculty of <span className="inline-flex items-center px-2 py-0.5 bg-accent-50 text-accent-700 font-bold text-sm rounded-md">200+</span> experienced educators works tirelessly to ensure
                    that every student receives the best possible education. We believe in nurturing not
                    just scholars, but responsible citizens who will contribute meaningfully to society.
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    Over <span className="inline-flex items-center px-2 py-0.5 bg-primary-50 text-primary-700 font-bold text-sm rounded-md">5000+</span> alumni have graduated from our institution, consistently achieving
                    outstanding results in academics, sports, and co-curricular activities. Our <span className="inline-flex items-center px-2 py-0.5 bg-accent-50 text-accent-700 font-bold text-sm rounded-md">100%</span> board
                    pass rate stands as a testament to our commitment to quality education, making us one
                    of the most respected educational institutions in the region.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/admissions"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>Enroll Your Child</span>
                    <HiOutlineChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-200 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300"
                  >
                    <HiOutlineCalendar className="w-4 h-4" />
                    <span>Take a Tour</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5 rounded-3xl" />
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-gray-100 bg-gray-100">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                  viewport={{ once: true }}
                  className="relative bg-white py-8 px-4 text-center group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <span className="block text-3xl md:text-4xl font-black text-primary-500 mb-1 group-hover:scale-110 group-hover:text-primary-600 transition-all duration-300">
                      {stat.value}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wide uppercase">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Mission & Vision */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-100 rounded-full blur-[140px]" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent-50 rounded-full blur-[120px]" />
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
              Our Foundation
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
              Mission & Vision
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
              <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
            </div>
            <p className="text-gray-500 max-w-xl mx-auto">
              Guided by our core principles, we strive to create a nurturing environment for every student
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: HiOutlineGlobeAlt,
                title: 'Our Mission',
                desc: 'To provide quality education that nurtures intellectual curiosity, fosters creativity, and builds strong character in every student, preparing them to excel in a rapidly evolving world.',
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
                color: 'from-primary-500 to-primary-700',
              },
              {
                icon: HiOutlineAcademicCap,
                title: 'Our Vision',
                desc: 'To be a leading educational institution that shapes future leaders through innovative teaching, holistic development, and unwavering commitment to excellence.',
                image: 'https://media.istockphoto.com/id/1309740004/photo/child-climbing-stairs-made-of-on-sky-background-education-or-hard-study-concept-soft-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=jX0s_gcPHpTX9Yxn7hN8t7HNwS5fVcqk6GeA4JL56Jc=',
                color: 'from-accent-500 to-accent-700',
              },
              {
                icon: HiOutlineHeart,
                title: 'Core Values',
                desc: 'Integrity, respect, perseverance, and compassion form the foundation of our educational philosophy, guiding every interaction and decision within our school community.',
                image: 'https://media.istockphoto.com/id/1128201196/photo/ethics-oncept-honesty-integrity-and-values-words.webp?a=1&b=1&s=612x612&w=0&k=20&c=mxU3qPOuLf3yY23KnW3tu-BIPr-liLQAgqgT4SdBDzk=',
                color: 'from-primary-500 to-accent-600',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-overlay opacity-40`} />

                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">
                      {item.desc}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-sm font-semibold text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>Learn more</span>
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Our Journey / Timeline */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-50 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-50 rounded-full blur-[120px]" />
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
              Our History
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
              Our Journey
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
              <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
            </div>
            <p className="text-gray-500 max-w-xl mx-auto">
              From humble beginnings to a legacy of excellence — the story of St. Paul's
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-accent-300 to-primary-200 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative md:flex items-start gap-8"
                >
                  <div className="hidden md:flex md:w-16 justify-center flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                      <HiOutlineCalendar className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative ml-4 md:ml-0">
                    <div className="hidden md:block absolute left-0 top-8 -translate-x-2 w-4 h-4 bg-white border-l border-b border-gray-100 -rotate-45" />

                    <div className="flex items-center gap-4 mb-3">
                      <span className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 font-bold text-sm rounded-lg">
                        {item.year}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-200 to-transparent" />
                    </div>

                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose Us */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-50 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-50 rounded-full blur-[120px]" />
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
              Why Us
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
              Why Choose St. Paul's?
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
              <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
            </div>
            <p className="text-gray-500 max-w-xl mx-auto">
              What makes us different? Here are the reasons parents trust us with their children's future
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: HiOutlineAcademicCap,
                title: 'Experienced Faculty',
                desc: 'Our dedicated team of 200+ qualified educators brings years of expertise and a passion for teaching, ensuring every child receives personalized attention.',
                accent: 'from-primary-500 to-primary-600',
                bgAccent: 'bg-primary-50',
                iconColor: 'text-primary-600',
              },
              {
                icon: HiOutlineGlobeAlt,
                title: 'Holistic Development',
                desc: 'We focus on academics, sports, arts, and character building, nurturing well-rounded individuals prepared for the challenges of tomorrow.',
                accent: 'from-accent-500 to-accent-600',
                bgAccent: 'bg-accent-50',
                iconColor: 'text-accent-600',
              },
              {
                icon: HiOutlineHeart,
                title: 'Safe & Nurturing Environment',
                desc: 'A secure campus with modern safety measures, CCTV surveillance, and a caring atmosphere where every student feels valued and protected.',
                accent: 'from-primary-500 to-accent-600',
                bgAccent: 'bg-primary-50',
                iconColor: 'text-primary-600',
              },
              {
                icon: HiOutlineUserGroup,
                title: 'Strong Parent Community',
                desc: 'We believe in partnership with parents through regular communication, workshops, and events that foster a vibrant school community.',
                accent: 'from-accent-500 to-primary-600',
                bgAccent: 'bg-accent-50',
                iconColor: 'text-accent-600',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-6 md:p-7 flex gap-5 items-start">
                  <div className={`flex-shrink-0 w-14 h-14 ${item.bgAccent} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-gray-900 mb-1.5 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className={`relative z-10 h-1 bg-gradient-to-r ${item.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -ml-40 -mb-40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
            Join Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Be a Part of Our Story
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
            Give your child the gift of quality education. Admissions for the academic year 2025-26 are now open.
            Join the St. Paul's family and watch your child flourish.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admissions"
              className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              <HiOutlineUserGroup className="w-5 h-5" />
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg flex items-center gap-2"
            >
              Schedule a Visit
            </Link>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default About;
