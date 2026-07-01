import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative mt-20 min-h-screen flex items-center overflow-hidden bg-white pt-20 pb-16 lg:pt-0 lg:pb-0">
      
      {/* Background Ambience (Removed the solid split block, using subtle blurs instead) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-maroon-50 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-gray-50 rounded-full blur-[100px]" />
        {/* Subtle grid pattern overlay for texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAwLCAwLCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 mask-image-gradient-to-b" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)]">
          
          {/* ================= LEFT COLUMN ================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 text-center lg:text-left flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-100 rounded-full text-sm font-bold text-maroon-800 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto lg:mx-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-maroon-600"></span>
              </span>
              <span className="tracking-wide uppercase text-xs">Established 2000</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-6 leading-[1.05] tracking-tight">
              St. Paul's
              <span className="block text-maroon-800 mt-2 pb-2">
                Matriculation School
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Empowering young minds with quality education, rigorous character building, and holistic development. Where every child's potential is nurtured with dedication.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/admissions"
                className="w-full sm:w-auto px-8 py-4 bg-maroon-800 text-white font-bold rounded-xl hover:bg-maroon-900 transition-all duration-300 shadow-[0_8px_20px_rgba(128,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(128,0,0,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Explore Admissions
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 font-bold rounded-xl hover:border-black hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants} className="mt-14 pt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Secure Campus" },
                { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Rich Library" },
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Smart Classes" },
                { icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9", label: "Sports" },
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start gap-3">
                  <div className="p-3 bg-maroon-50 rounded-xl text-maroon-800 transition-colors hover:bg-maroon-100 cursor-default">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{f.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Image Composition ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block lg:col-span-6 relative h-[650px] w-full mt-10 lg:mt-0"
          >
            {/* Decorative background frame */}
            <div className="absolute top-8 right-8 w-[80%] h-[80%] rounded-[2rem] border-2 border-gray-100 -z-10" />

            {/* Main Primary Image */}
            <div className="absolute top-0 right-0 w-[85%] h-[75%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] group">
              <div className="absolute inset-0 bg-black/5 z-10 transition-colors group-hover:bg-transparent" />
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                alt="School campus"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Secondary Overlapping Image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-4 left-0 w-[55%] h-[45%] rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80"
                alt="Classroom learning"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Stat Card 1 (White Theme) */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] -left-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-5 min-w-[200px] border border-gray-100 z-30"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-maroon-50 rounded-xl text-maroon-800">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">25+</h4>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mt-0.5">Years Legacy</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Stat Card 2 (Maroon Theme) */}
            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[15%] -right-4 bg-maroon-800 rounded-2xl shadow-[0_8px_30px_rgba(128,0,0,0.3)] p-5 min-w-[180px] z-30"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">5,000+</span>
                <span className="text-maroon-100 text-xs font-medium uppercase tracking-wider mt-1">Active Students</span>
                
                {/* Avatar Stack */}
                <div className="mt-4 flex -space-x-2">
                  {[10, 11, 12, 13].map((num) => (
                    <img 
                      key={num} 
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-maroon-800 object-cover bg-white" 
                      src={`https://i.pravatar.cc/100?img=${num}`} 
                      alt="Student"
                    />
                  ))}
                  <div className="h-8 w-8 rounded-full ring-2 ring-maroon-800 bg-maroon-950 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">+</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;