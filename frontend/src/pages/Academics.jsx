import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineAcademicCap, HiOutlineBeaker, HiOutlineBookOpen,
  HiOutlineComputerDesktop, HiOutlineGlobeAlt, HiOutlineHeart,
  HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineArrowLongRight,
  HiOutlineCheckBadge, HiOutlineRocketLaunch, HiOutlineClipboardDocumentList,
} from 'react-icons/hi2';

const pillars = [
  {
    icon: HiOutlineClipboardDocumentList,
    title: 'Academic Rigor',
    desc: 'State Board curriculum enhanced with modern tools, regular assessments, and a proven 100% pass rate in board examinations.',
    stats: '100% Pass Rate',
    color: 'bg-primary-500',
    lightColor: 'bg-primary-50',
  },
  {
    icon: HiOutlineRocketLaunch,
    title: 'Skill Development',
    desc: 'Focus on critical thinking, problem-solving, communication, and collaboration skills essential for 21st-century success.',
    stats: '4 Core Skills',
    color: 'bg-accent-500',
    lightColor: 'bg-accent-50',
  },
  {
    icon: HiOutlineCheckBadge,
    title: 'Holistic Growth',
    desc: 'Balanced emphasis on academics, sports, arts, and values to nurture well-rounded individuals ready for life beyond school.',
    stats: 'All-Round Dev.',
    color: 'bg-primary-500',
    lightColor: 'bg-primary-50',
  },
];

const programs = [
  {
    level: 'Primary',
    grades: 'Grades 1 - 5',
    desc: 'Building foundational skills through interactive learning, storytelling, hands-on activities, and a nurturing environment that sparks curiosity.',
    subjects: ['English', 'Maths', 'Science', 'Social', 'Tamil', 'GK'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    accent: 'bg-primary-500',
  },
  {
    level: 'Middle School',
    grades: 'Grades 6 - 8',
    desc: 'Transitioning to advanced concepts with specialised subject teachers, lab work, and the introduction of Computer Science and Hindi.',
    subjects: ['English', 'Maths', 'Science', 'Social', 'Tamil', 'CS', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    accent: 'bg-accent-500',
  },
  {
    level: 'High School',
    grades: 'Grades 9 - 10',
    desc: 'Rigorous preparation for board examinations with comprehensive syllabus coverage, mock tests, and individual mentoring.',
    subjects: ['English', 'Maths', 'Science', 'Social', 'Tamil', 'CS'],
    image: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGlnaCUyMGNsYXNzfGVufDB8fDB8fHww',
    accent: 'bg-primary-500',
  },

];

const subjectGroups = [
  {
    category: 'Core Academics',
    color: 'bg-primary-500',
    bgLight: 'bg-primary-50',
    borderColor: 'border-primary-200',
    items: ['English', 'Mathematics', 'Science', 'Social Studies', 'Tamil'],
  },
  {
    category: 'Sciences',
    color: 'bg-accent-500',
    bgLight: 'bg-accent-50',
    borderColor: 'border-accent-200',
    items: ['Physics', 'Chemistry', 'Biology', 'Computer Science', 'Environmental Science'],
  },
  {
    category: 'Languages',
    color: 'bg-primary-500',
    bgLight: 'bg-primary-50',
    borderColor: 'border-primary-200',
    items: ['Tamil', 'Hindi', 'English', 'French'],
  },
  {
    category: 'Co-Curricular',
    color: 'bg-accent-500',
    bgLight: 'bg-accent-50',
    borderColor: 'border-accent-200',
    items: ['Physical Education', 'Art & Craft', 'Music', 'Drama', 'Yoga'],
  },
];

const methodologies = [
  {
    icon: HiOutlineLightBulb,
    title: 'Smart Classrooms',
    desc: 'Interactive digital boards and multimedia lessons make abstract concepts visual and engaging for deeper understanding.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
  },
  {
    icon: HiOutlineBeaker,
    title: 'Practical Learning',
    desc: 'Fully equipped labs for science and computer experiments that encourage hands-on exploration and scientific inquiry.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
  },
  {
    icon: HiOutlineHeart,
    title: 'Continuous Assessment',
    desc: 'Regular evaluations through tests, projects, presentations, and participation tracking to monitor progress continuously.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Personalised Mentoring',
    desc: 'Small class sizes enable teachers to give individual attention, identify strengths, and address learning gaps early.',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80',
  },
];

const Academics = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero: Split Layout */}
      <section className="relative min-h-screen flex overflow-hidden bg-black">
        <div className="absolute inset-0 md:inset-auto md:right-0 md:w-1/2 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/70 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/40 md:to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center mt-10">
          <div className="w-full md:w-1/2 py-32 md:py-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-10 bg-accent-400 rounded-full" />
                <span className="text-accent-400 font-semibold text-sm uppercase tracking-[0.2em]">Est. 1982</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.05] tracking-tight mb-6">
                Where Knowledge
                <span className="block text-primary-500">Meets Excellence</span>
              </h1>

              <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
                A comprehensive academic programme following the Tamil Nadu State Board curriculum, 
                enriched with modern teaching methodologies and digital learning tools for holistic development.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link
                  to="/admissions"
                  className="px-6 py-3 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-all duration-300 flex items-center gap-2 w-fit group"
                >
                  <span>Apply Now</span>
                  <HiOutlineArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300 w-fit"
                >
                  Visit Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 max-w-md"
            >
              {[
                { value: '100%', label: 'Board Pass Rate' },
                { value: '200+', label: 'Expert Faculty' },
                { value: '4:1', label: 'Student-Teacher' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
                  <p className="text-accent-400 font-black text-xl">{item.value}</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: Curriculum Pillars */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-300 via-accent-500 to-primary-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-accent-400 rounded-full" />
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-widest">Curriculum Framework</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              Our Academic
              <span className="block text-primary-500">Foundation Pillars</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className={`${pillar.lightColor} rounded-2xl p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-500`}>
                  <div className={`w-14 h-14 ${pillar.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <pillar.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{pillar.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{pillar.desc}</p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-primary-500 group-hover:text-accent-500 transition-colors">
                    <HiOutlineCheckBadge className="w-4 h-4" />
                    <span>{pillar.stats}</span>
                  </div>
                </div>

                <div className={`absolute bottom-0 left-8 right-8 h-0.5 ${pillar.color === 'bg-accent-500' ? 'bg-accent-400' : 'bg-primary-300'} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-primary-50 via-accent-50 to-primary-50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary-100"
          >
            <div className="flex items-center gap-3">
              <HiOutlineAcademicCap className="w-8 h-8 text-primary-500" />
              <div>
                <p className="font-heading font-bold text-gray-900">Tamil Nadu State Board</p>
                <p className="text-sm text-gray-500">Enriched with modern teaching methodologies</p>
              </div>
            </div>
            <Link
              to="/admissions"
              className="px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all whitespace-nowrap text-sm"
            >
              Download Curriculum
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Academic Programs (Vertical Stepper) */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary-50 rounded-full blur-[120px] translate-x-1/3" />
          <div className="absolute bottom-10 left-0 w-80 h-80 bg-accent-50 rounded-full blur-[100px] -translate-x-1/4" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-accent-400 rounded-full" />
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-widest">Program Levels</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              Academic
              <span className="block text-primary-500">Programs Offered</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[23px] md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-accent-300 to-primary-200 hidden sm:block" />

            <div className="space-y-10 md:space-y-0">
              {programs.map((program, index) => (
                <motion.div
                  key={program.level}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative md:flex items-stretch gap-8 group"
                >
                  <div className="hidden sm:flex w-16 flex-shrink-0 justify-center relative z-10 pt-8">
                    <div className={`w-16 h-16 ${program.accent} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white font-black text-lg">0{index + 1}</span>
                    </div>
                  </div>

                  <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    <div className="md:flex">
                      <div className="md:w-56 lg:w-72 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                        <img
                          src={program.image}
                          alt={program.level}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-primary-700 rounded-lg shadow-lg">
                            {program.grades}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex-1">
                        <div className="flex items-center gap-2 mb-1 sm:hidden">
                          <div className={`w-8 h-8 ${program.accent} rounded-lg flex items-center justify-center`}>
                            <span className="text-white font-bold text-xs">0{index + 1}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-md">{program.grades}</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{program.level}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">{program.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {program.subjects.map((sub) => (
                            <span
                              key={sub}
                              className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Subject Categories */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-accent-400 rounded-full" />
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-widest">Subject Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              Subjects
              <span className="block text-primary-500">We Offer</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {subjectGroups.map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${group.bgLight} rounded-2xl border ${group.borderColor} overflow-hidden hover:shadow-lg transition-all duration-500`}
              >
                <div className={`${group.color} px-6 py-4 flex items-center gap-3`}>
                  <div className="w-2 h-2 bg-white/70 rounded-full" />
                  <h3 className="font-heading font-bold text-white text-lg">{group.category}</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {group.items.map((subject) => (
                      <div
                        key={subject}
                        className="bg-white rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 border border-gray-100 hover:border-primary-200 hover:text-primary-700 transition-all duration-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" />
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Teaching Methodology */}
      <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-50/60 to-accent-50/60 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-accent-400 rounded-full" />
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-widest">How We Teach</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              Teaching
              <span className="block text-primary-500">Methodology</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {methodologies.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

                  <div className="absolute top-5 left-5">
                    <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-heading font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      {item.desc}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 shadow-2xl"
          >
            <div className="md:flex items-stretch">
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1734542380831-1b843c852c5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2Nob29sJTIwdGVhY2hpbmd8ZW58MHx8MHx8fDA%3D"
                  alt="Students"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-800/80 via-primary-700/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <HiOutlineAcademicCap className="w-10 h-10 text-accent-400 mb-2" />
                  <p className="text-white/80 text-sm font-medium">Shaping futures since 1982</p>
                </div>
              </div>

              <div className="md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  Begin Your Academic Journey
                </h2>
                <p className="text-white/70 mb-8 leading-relaxed max-w-lg">
                  Give your child the gift of quality education. Admissions for the academic year 2025-26 are now open. 
                  Join St. Paul's and unlock your child's full potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/admissions"
                    className="px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all duration-300 text-center shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <HiOutlineUserGroup className="w-5 h-5" />
                    Apply Now
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Academics;
