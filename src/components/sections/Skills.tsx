import React from 'react';
import { motion } from 'motion/react';
import { Code, BookOpen, Users, Layout, Terminal, Database } from 'lucide-react';

const hardSkills = [
  { name: 'Performance Evaluation', icon: <Users className="w-5 h-5" /> },
  { name: 'G-Sheets & Analysis', icon: <Database className="w-5 h-5" /> },
  { name: 'Auditing Performance', icon: <Layout className="w-5 h-5" /> },
  { name: 'MS Office Suite', icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Lesson Planning', icon: <Terminal className="w-5 h-5" /> },
  { name: 'C/C++/Python/MATLAB', icon: <Code className="w-5 h-5" /> },
];

const softSkills = [
  'Observation',
  'Decision making',
  'Communication',
  'Multi tasking',
  'Problem solving',
];

export default function Skills() {
  return (
    <section id="skills" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-10 flex items-center">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-4 text-sm">01</span>
              Hard Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hardSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all group"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {skill.icon}
                  </div>
                  <span className="text-gray-800 font-bold tracking-tight">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-10 flex items-center">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-4 text-sm">02</span>
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-4">
              {softSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-8 py-4 bg-white text-gray-800 rounded-2xl font-bold shadow-sm border border-gray-100 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-100 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
