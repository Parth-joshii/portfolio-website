/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Videos from './components/sections/Videos';
import Books from './components/sections/Books';
import ContactForm from './components/sections/ContactForm';
import Footer from './components/layout/Footer';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check local storage for token on mount
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsAdmin(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const login = (userData: any, token: string) => {
    setUser(userData);
    setIsAdmin(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} isAdmin={isAdmin} onLogin={login} onLogout={logout} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Videos user={user} isAdmin={isAdmin} />
        <Books user={user} isAdmin={isAdmin} />
        <ContactForm />
      </main>
      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-24 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

