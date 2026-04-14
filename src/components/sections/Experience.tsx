import React from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    company: 'Physics Wallah (PW)',
    role: 'Physics Faculty',
    period: 'Dec 2022 - Present',
    description: [
      'Conducting Classes In Ranker\'s JEE/NEET Batch',
      'Solving Doubts of JEE/NEET aspirants',
      'Making Daily Practice Paper(DPP) for JEE/NEET aspirants',
      'Making Lecture PPTs',
      'Conducting counselling and Seminar Sessions',
      'Mentorship for AIR and Gurukul Batches',
      'Preparing Video solutions for Question Papers'
    ]
  },
  {
    company: 'BYJU\'S - The Learning App',
    role: 'Academic Success Lead-Tutoring',
    period: 'Mar 2022 - Dec 2022',
    description: [
      'Monitor employee activities and provide guidance where needed',
      'Look at recent performance and identify Growth areas',
      'Prepare reports on the above information and communicate insights to higher management',
      'Make important planning and strategy decisions',
      'Manage a team of Academic and Sr. Academic specialists',
      'Design training modules for AS, Sr. AS, Teachers and conduct training sessions'
    ]
  },
  {
    company: 'BYJU\'S - The Learning App',
    role: 'Sr. Academic Specialist',
    period: 'Oct 2021 - Mar 2022',
    description: [
      'Managed a team of 10-20 tutors from different subject backgrounds',
      'Observed academic performance and identified growth and improvement areas',
      'Prepared reports on the above information and reported insights',
      'Conducted Concept/Doubt Classes LIVE',
      'Successfully taken 1500+ Sessions (LIVE Classroom) on NEO Platform',
      'Tutor Ratings of 4.92/5 and 97% NPS Score'
    ]
  },
  {
    company: 'BYJU\'S - The Learning App',
    role: 'Learning and Development Specialist',
    period: 'Feb 2020 - Oct 2021',
    description: [
      'Prepared subject matter documentation and disseminated for internal and external use',
      'Delineated procedures and standards based on in-depth experience with subject',
      'Conducted chat based sessions for the K12 grade physics aka PREMIUM SESSIONS',
      'Conducted and managed call based doubt sessions aka SETMORE'
    ]
  },
  {
    company: 'CSIR Square Coaching Classes',
    role: 'Physics Faculty',
    period: '2019 - 2020',
    description: [
      'Taught Physics for Foundation batches',
      'Taught Atomic Physics and Nuclear Physics to IIT JAM students',
      'Taught Physics to GATE-PH batches'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-10 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Professional Experience</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-blue-50 rounded-full" />
          
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-4 border-blue-600 rounded-full z-10 flex items-center justify-center shadow-xl shadow-blue-100">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                
                {/* Content Card */}
                <div className={`w-full md:w-[45%] ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 hover:border-blue-100 transition-all"
                  >
                    <div className="flex flex-col mb-6">
                      <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-3 self-start">
                        {exp.period}
                      </span>
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{exp.role}</h3>
                      <p className="text-lg font-bold text-blue-600">{exp.company}</p>
                    </div>
                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
                
                {/* Spacer for desktop */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
