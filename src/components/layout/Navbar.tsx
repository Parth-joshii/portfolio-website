import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { LogIn, LogOut, User as UserIcon, Lock, Menu, X } from 'lucide-react';

interface NavbarProps {
  user: any | null;
  isAdmin: boolean;
  onLogin: (userData: any, token: string) => void;
  onLogout: () => void;
}

export default function Navbar({ user, isAdmin, onLogin, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Videos', href: '#videos' },
    { name: 'Books', href: '#books' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogin = async () => {
    const email = window.prompt("Email:");
    if (!email) return;
    const password = window.prompt("Password:");
    if (!password) return;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.user, data.token);
      } else {
        alert("Login failed: " + (data.error || "Incorrect email or password"));
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      alert("System error: Could not connect to the server. Please check your internet or wait for the server to wake up.");
    }
  };

  const handleLogout = async () => {
    onLogout();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[60]"
        style={{ scaleX }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${
              isScrolled ? 'text-blue-600' : 'text-gray-900'
            }`}>
              SWARNIMA <span className="text-blue-600 font-light lowercase">Joshi</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-indigo-600 ${
                    isScrolled ? 'text-gray-600' : 'text-gray-800'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="ml-4 pl-4 border-l border-gray-200 flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                      {isAdmin ? 'Admin' : 'User'}
                    </span>
                    <span className="text-[10px] text-gray-400 max-w-[100px] truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Admin
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-gray-900'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100 pb-2">
                {user ? (
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500 uppercase">
                        {isAdmin ? 'Admin' : 'User'}
                      </span>
                      <span className="text-xs text-gray-400 truncate max-w-[200px]">
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-400 hover:text-red-500 flex items-center"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-3 text-base font-bold text-gray-400 hover:text-indigo-600 transition-all uppercase tracking-widest"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Admin Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
