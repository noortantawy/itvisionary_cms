import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`, formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#E6F0FA] text-[#2C6CA4]">
      <ParticleBackground selector=".main-content" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E6F0FA]/50 to-white/30 pointer-events-none z-0" />
      <Header />
      <main className="main-content flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-20 pt-20 pb-16 gap-12 z-10 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C6CA4]">Get in Touch</h1>
          <p className="text-base md:text-lg text-[#2C6CA4]/80 max-w-xl mx-auto leading-tight mb-8">
            We're here to help you transform your business. Fill out the form below or reach out directly using our contact details.
          </p>
        </motion.div>
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-1 bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-[#2C6CA4] mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-[#2C6CA4] font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#E6F0FA]/50 border border-[#2C6CA4]/30 focus:outline-none focus:ring-2 focus:ring-[#2C6CA4] text-[#2C6CA4]"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="block text-[#2C6CA4] font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#E6F0FA]/50 border border-[#2C6CA4]/30 focus:outline-none focus:ring-2 focus:ring-[#2C6CA4] text-[#2C6CA4]"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-[#2C6CA4] font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#E6F0FA]/50 border border-[#2C6CA4]/30 focus:outline-none focus:ring-2 focus:ring-[#2C6CA4] text-[#2C6CA4]"
                  placeholder="Subject"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[#2C6CA4] font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#E6F0FA]/50 border border-[#2C6CA4]/30 focus:outline-none focus:ring-2 focus:ring-[#2C6CA4] text-[#2C6CA4] resize-y"
                  rows={5}
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3B5998] text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 mx-auto"
                data-testid="submit-button"
              >
                Send Message
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
              {status && <p className="text-center text-[#2C6CA4]">{status}</p>}
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex-1 flex flex-col text-[#2C6CA4]/90 bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-[#2C6CA4] mb-6">Contact Details</h2>
            <div className="flex flex-col gap-4 text-lg">
              <span className="flex items-center gap-2">
                📍 71 Second District, Northern Lotus, New Cairo, Egypt
              </span>
              <span className="flex items-center gap-2">
                <Image
                  src="/phone.png"
                  alt="Phone icon"
                  width={20}
                  height={20}
                  style={{ filter: 'invert(38%) sepia(99%) saturate(1350%) hue-rotate(185deg) brightness(95%) contrast(90%)' }}
                />
                +20 2 25306225
              </span>
              <span className="flex items-center gap-2">
                <Image
                  src="/phone.png"
                  alt="Phone icon"
                  width={20}
                  height={20}
                  style={{ filter: 'invert(38%) sepia(99%) saturate(1350%) hue-rotate(185deg) brightness(95%) contrast(90%)' }}
                />
                +2010000410205
              </span>
              <span className="flex items-center gap-2">
                ✉️
                <a href="mailto:info@it-visionary.com" className="hover:underline">info@it-visionary.com</a>
              </span>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}