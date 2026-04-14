import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function About() {
  const [aboutData] = useState({
    aboutText: 'Dedicated and creative Teacher. Eager to Provide vision, guidance, and simplify the underlying science in a way that makes the subject so much pleasure to learn.',
    stats: {
      selections: '500+',
      experience: '7+',
      sessions: '1500+',
      rating: '4.92/5',
      nps: '97%'
    }
  });

  return (
    <section id="about" className="py-10 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Me</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="text-xl leading-relaxed font-medium text-gray-700">
                {aboutData.aboutText}
              </p>
            </div>
            
            <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100">
                <span className="text-blue-700 font-bold">Physics Specialist</span>
              </div>
              <div className="px-6 py-3 bg-purple-50 rounded-2xl border border-purple-100">
                <span className="text-purple-700 font-bold">Gold Medalist</span>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100">
                <span className="text-blue-700 font-bold">JEE/NEET Mentor</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { label: 'JEE/NEET Selections', value: aboutData.stats.selections || '500+', color: 'orange' },
              { label: 'Years Experience', value: aboutData.stats.experience, color: 'blue' },
              { label: 'Sessions Taken', value: aboutData.stats.sessions, color: 'purple' },
              { label: 'Tutor Rating', value: aboutData.stats.rating, color: 'blue' },
              { label: 'NPS Score', value: aboutData.stats.nps, color: 'pink' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 text-center transition-all"
              >
                <span className={`block text-4xl font-extrabold text-${stat.color}-600 mb-2`}>
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
