import React from 'react';
import { Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-black text-blue-400 mb-6">SWARNIMA <span className="text-white font-light lowercase opacity-50">Joshi</span></h3>
            <p className="text-gray-400 leading-relaxed font-medium">
              Physics Faculty & Academic Specialist dedicated to simplifying science and inspiring students.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a></li>
              <li><a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a></li>
              <li><a href="#videos" className="hover:text-blue-400 transition-colors">Videos</a></li>
              <li><a href="#books" className="hover:text-blue-400 transition-colors">Books</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <span>joshiswarnima1207@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Swarnima Joshi. All rights reserved.</p>
          <p className="flex items-center mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> for Physics Education
          </p>
        </div>
      </div>
    </footer>
  );
}
