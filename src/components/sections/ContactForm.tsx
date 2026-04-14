import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
// Local API used for message submission

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-10 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have a question or want to collaborate? Send me a message and I'll get back to you soon!</p>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-blue-100/50 border border-gray-50"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-800 font-medium"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-800 font-medium"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-3">
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Message</label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none text-gray-800 font-medium"
                placeholder="How can I help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-5 rounded-[1.5rem] font-extrabold text-white shadow-xl shadow-blue-100 flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                status === 'loading' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {status === 'loading' ? (
                <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  <span className="text-lg">Send Message</span>
                </>
              )}
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center space-x-3 text-green-600 font-bold bg-green-50 py-4 rounded-2xl border border-green-100"
                >
                  <CheckCircle className="w-6 h-6" />
                  <span>Message sent successfully!</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center space-x-3 text-red-600 font-bold bg-red-50 py-4 rounded-2xl border border-red-100"
                >
                  <AlertCircle className="w-6 h-6" />
                  <span>Error sending message. Please try again.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
