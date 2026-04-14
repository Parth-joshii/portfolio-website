import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, GraduationCap } from 'lucide-react';

export default function Hero() {
  const [siteInfo] = useState({
    name: 'Swarnima Joshi',
    title: 'Physics Faculty & Academic Specialist',
    email: 'joshiswarnima1207@gmail.com',
    bio: 'M.Sc. Physics (Gold Medalist) | B.Ed.',
    aboutText: '',
    stats: {
      experience: '7+',
      sessions: '1500+',
      rating: '4.92/5',
      nps: '97%',
      selections: '500+'
    }
  });

  return (
    <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* High-performance background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot Grid */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-40" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        
        {/* Animated Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60 animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-60 animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-4000" />

        {/* Floating Physics Elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-24 h-24 border-2 border-indigo-100 rounded-full opacity-40 hidden md:block"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-10 w-32 h-32 border-2 border-purple-100 rounded-full opacity-40 hidden md:block"
        />
        <div className="absolute top-1/2 left-1/4 w-40 h-px bg-gradient-to-r from-transparent via-indigo-100 to-transparent opacity-60 transform -rotate-45 hidden lg:block" />
        <div className="absolute top-1/3 right-1/4 w-40 h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent opacity-60 transform rotate-45 hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl cursor-default"
          >
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-block px-4 py-1.5 mb-2 text-xs font-black tracking-[0.2em] text-blue-600 uppercase bg-blue-50/50 rounded-full"
              >
                Welcome to my Portfolio
              </motion.div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.95]">
                {siteInfo.name.split(' ')[0]} <span className="text-blue-600 underline decoration-blue-100 underline-offset-8 decoration-4">{siteInfo.name.split(' ')[1]}</span>
              </h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {siteInfo.title}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            >
              <div className="flex items-center text-gray-600 bg-gray-50/50 px-6 py-3 rounded-2xl backdrop-blur-sm border border-gray-100">
                <Mail className="w-5 h-5 mr-3 text-indigo-500" />
                <span className="font-medium">{siteInfo.email}</span>
              </div>
              <div className="flex items-center text-gray-600 bg-gray-50/50 px-6 py-3 rounded-2xl backdrop-blur-sm border border-gray-100">
                <GraduationCap className="w-5 h-5 mr-3 text-indigo-500" />
                <span className="font-medium">{siteInfo.bio}</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href="#contact"
                className="px-10 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95"
              >
                Get in Touch
              </a>
              <a
                href="#videos"
                className="px-10 py-4 border-2 border-indigo-600 text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 active:scale-95"
              >
                View Demo Videos
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Unused modal code removed to eliminate external dependencies and keep the code clean.
