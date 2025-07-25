import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

export default function About() {
  const [activeTab, setActiveTab] = useState('vision');

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#E6F0FA] overflow-hidden">
      <ParticleBackground selector=".main-content" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E6F0FA]/50 to-white/30 pointer-events-none z-0" />
      <Header />
      <main className="main-content flex-1 px-4 sm:px-8 md:px-20 py-16 sm:py-24 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#2C6CA4]"
              style={{ lineHeight: '1.2' }}
            >
              Redefining Digital Transformation
            </motion.h1>
            <motion.p
              className="text-xl text-[#2C6CA4]/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We combine cutting-edge technology with strategic insight to propel businesses into the future
            </motion.p>
          </motion.section>

          <motion.section
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex w-full lg:flex-row gap-12 items-start">
              <div className="flex-[2] min-w-0">
                <h2 className="text-3xl font-bold text-[#2C6CA4] mb-8">Who We Are</h2>
                <p className="text-xl text-[#2C6CA4]/80 leading-relaxed">
                  IT Visionary is a premier technology consulting firm that bridges the gap between business strategy and digital innovation. Founded in 2015, we've grown from a small Dubai-based team to a global partner for enterprises seeking transformative solutions.
                </p>
              </div>
              <div className="flex flex-row gap-8 flex-[1] min-w-[120px] ml-auto">
                {['150+', '95%', '40+'].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-6 min-w-[150px]"
                    whileHover={{ y: -5, backgroundColor: 'rgba(59, 89, 152, 0.1)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-3xl font-bold text-[#2C6CA4]">{stat}</p>
                    <p className="text-sm text-[#2C6CA4]/70 mt-2">
                      {index === 0 ? 'Projects Delivered' : index === 1 ? 'Client Retention' : 'Global Partners'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            className="mb-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-4 mb-8 border-b border-[#2C6CA4]/20 pb-4">
              {['vision', 'mission', 'values'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab ? 'bg-[#3B5998] text-white' : 'text-[#2C6CA4]/80 hover:bg-[#E6F0FA]/30'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-2xl p-8"
            >
              {activeTab === 'vision' && (
                <>
                  <h3 className="text-2xl font-bold text-[#2C6CA4] mb-4">Our Vision</h3>
                  <p className="text-[#2C6CA4]/80 leading-relaxed">
                    To be the catalyst for digital revolution, empowering organizations to harness technology not just as a tool, but as a strategic advantage that reshapes industries and creates new possibilities.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#3B5998]/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <p className="text-[#2C6CA4]/80 font-medium">"See beyond the horizon of what's possible"</p>
                  </div>
                </>
              )}
              {activeTab === 'mission' && (
                <>
                  <h3 className="text-2xl font-bold text-[#2C6CA4] mb-4">Our Mission</h3>
                  <p className="text-[#2C6CA4]/80 leading-relaxed">
                    To deliver transformative solutions that optimize operations, enhance decision-making, and position businesses for long-term success through strategic partnerships and innovative technologies.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#3B5998]/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <p className="text-[#2C6CA4]/80 font-medium">"Every solution begins with understanding your unique challenges"</p>
                  </div>
                </>
              )}
              {activeTab === 'values' && (
                <>
                  <h3 className="text-2xl font-bold text-[#2C6CA4] mb-4">Our Core Values</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: '💡', title: 'Innovation', desc: 'We challenge the status quo to pioneer groundbreaking solutions' },
                      { icon: '🤝', title: 'Integrity', desc: 'We build trust through transparency and ethical practices' },
                      { icon: '🌐', title: 'Collaboration', desc: 'We believe the best results come from teamwork' },
                      { icon: '🏆', title: 'Excellence', desc: "We're committed to delivering exceptional quality in everything we do" },
                    ].map((value, index) => (
                      <motion.div
                        key={index}
                        className="bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-6 hover:border-[#3B5998]/30 transition-all duration-300"
                        whileHover={{ y: -5 }}
                      >
                        <div className="text-3xl mb-3">{value.icon}</div>
                        <h4 className="text-lg font-bold text-[#2C6CA4] mb-2">{value.title}</h4>
                        <p className="text-[#2C6CA4]/80">{value.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.section>

          <motion.section
            className="bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-3xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-[#2C6CA4] mb-6">Ready to Transform Your Business?</h2>
            <p className="text-[#2C6CA4]/80 max-w-2xl mx-auto mb-8">
              Let's discuss how our expertise can drive your digital transformation journey forward.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-[#3B5998] text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              Schedule a Consultation
            </Link>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}