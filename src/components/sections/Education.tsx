import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Education (B.Ed.) : Physics',
    institution: 'Arihant Institute of Technology DAVV INDORE(M.P)',
    year: '2021',
    score: '79%'
  },
  {
    degree: 'Master in Physics',
    institution: 'School Of Physics, DAVV INDORE(M.P)',
    year: '2019',
    score: 'CGPA- 8.9'
  },
  {
    degree: 'Bachelor in Science',
    institution: 'Govt. Holkar Science College, DAVV INDORE(M.P)',
    year: '2017',
    score: 'CGPA- 8.2'
  },
  {
    degree: 'Grade 12th - PCM',
    institution: 'Aaditya Vidya Vihar Hr. Sec. School KHARGONE',
    year: '2013',
    score: '85%'
  },
  {
    degree: 'Grade 10th',
    institution: 'Aaditya Vidya Vihar Hr. Sec. School KHARGONE',
    year: '2011',
    score: '91%'
  }
];

export default function Education() {
  return (
    <section id="education" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Education Background</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 flex flex-col h-full transition-all group"
            >
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-6 self-start group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight">{edu.degree}</h3>
                <p className="text-gray-600 font-bold mb-6">{edu.institution}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest">
                  {edu.year}
                </span>
                <span className="text-blue-600 font-extrabold text-lg">{edu.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
