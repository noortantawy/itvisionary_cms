// frontend/pages/services.js
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

export default function Services() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const CustomBullet = ({ className = '' }) => (
    <svg className={`w-4 h-4 flex-shrink-0 text-[#3B5998] ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="6" strokeWidth="2" />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#E6F0FA] text-[#2C6CA4]">
      <ParticleBackground selector=".hero-section" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E6F0FA]/50 to-white/30 pointer-events-none z-0" />
      <Header />
      <main className="hero-section flex-1 flex flex-col items-center justify-center px-5 sm:px-13 md:px-28 pt-0 pb-16 gap-12 z-10 text-center relative overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
          <br /><br /><br />
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C6CA4]" style={{ lineHeight: '1.2' }}>
            Our Services
          </motion.h1>
          <motion.p className="text-xl text-[#2C6CA4]/80 max-w-5xl mx-auto mb-12 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            At ITVisionary, we drive digital transformation with tailored solutions that integrate intelligent technologies to optimize operations, enhance decision-making, and ensure sustainability. Explore our offerings below.
          </motion.p>
          <div className="space-y-6">
            {[
              {
                title: 'Elevate: Strategic enhancements for your infrastructure',
                icon: '🌐',
                content: (
                  <div className="space-y-4">
                    <ul className="list-none space-y-5">
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Environment Assessment: Comprehensive evaluation of networks, storage, and security with actionable recommendations</span>
                      </li>
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Cloud Adoption: Seamless migration to optimized cloud platforms, scalable for future needs</span>
                      </li>
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Cloud Security:/machinery
                        Advanced protection against threats with AI-driven monitoring</span>
                      </li>
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">SAP Migration: Effortless transition to cloud with continuous optimization</span>
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                title: 'Operate: Enhance and automate your processes for efficiency',
                icon: '⚙️',
                content: (
                  <div className="space-y-4">
                    <ul className="list-none space-y-3">
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Digital Transformation: Agile, data-driven processes for competitive growth</span>
                      </li>
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Robotic Process Automation (RPA): Eliminate repetitive tasks with scalable automation</span>
                      </li>
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Managed Services: Expert cloud management with AI-driven optimization</span>
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                title: 'Innovate: Unlock new possibilities with cutting-edge strategies',
                icon: '💡',
                content: (
                  <div className="space-y-4">
                    <ul className="list-none space-y-3">
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Artificial Intelligence & Machine Learning: Data-driven insights for smarter decisions</span>
                      </li>
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Analytics: Predictive models and real-time insights to anticipate market shifts</span>
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                title: 'GenAI: Reimagine possibilities with generative AI solutions',
                icon: '🧠',
                content: (
                  <div className="space-y-4">
                    <ul className="list-none space-y-3">
                      <li className="flex items-center">
                        <CustomBullet className="mr-2" />
                        <span className="text-xl text-[#2C6CA4]/70">Harness the power of GenAI to transform your digital landscape and drive innovation</span>
                      </li>
                    </ul>
                  </div>
                ),
              },
            ].map((service, index) => (
              <motion.div key={index} className="bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.6 }}>
                <button onClick={() => toggleSection(service.title)} className="w-full flex items-center justify-between text-left text-xl font-semibold text-[#2C6CA4] hover:text-[#3B5998] transition-colors">
                  <span className="flex items-center gap-2">{service.icon} {service.title}</span>
                  <svg className={`w-5 h-5 transition-transform ${activeSection === service.title ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: activeSection === service.title ? 'auto' : 0, opacity: activeSection === service.title ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  {service.content}
                </motion.div>
              </motion.div>
            ))}
          </div>
          <section className="py-12 px-4 z-10 text-center">
            <h2 className="text-3xl font-bold text-[#2C6CA4] mb-6">Industries We Transform</h2>
            <h4 className="text-xl font-bold text-[#2C6CA4] mb-8 max-w-4xl mx-auto">
              IT Visionary empowers diverse industries with cloud-powered innovation, driving operational excellence and sustainable growth through intelligent digital solutions.
            </h4>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { name: 'Automotive', desc: 'Accelerating innovation with cloud-based IoT solutions, automated processes, and smart manufacturing for next-gen vehicles' },
                { name: 'Oil & Gas', desc: 'Optimizing upstream to downstream operations with cloud technologies that reduce costs and drive operational excellence' },
                { name: 'Retail', desc: 'Transforming customer experiences through cloud-powered analytics and seamless omnichannel commerce solutions' },
                { name: 'Wholesale', desc: 'Revolutionizing distribution with infinite inventory visibility, smart logistics, and automated supply chains' },
                { name: 'Education', desc: 'Shaping fourth-generation universities that fuel economic growth through globalized, cloud-enabled learning ecosystems' },
                { name: 'Manufacturing', desc: 'Building smart factories of tomorrow with cloud-connected safety systems and optimized production workflows' },
                { name: 'Smart Shipping', desc: 'Navigating digital transformation with operational apps that enhance efficiency and reduce maintenance overhead' },
                { name: 'Healthcare', desc: 'Pioneering connected care through secure cloud platforms that enhance patient outcomes and operational workflows' },
              ].map((industry, index) => (
                <motion.div key={index} className="bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-6 hover:bg-[#E6F0FA]/50 transition-all duration-300 text-left" whileHover={{ scale: 1.03 }}>
                  <h3 className="text-xl font-semibold text-[#2C6CA4] mb-3">{industry.name}</h3>
                  <p className="text-l text-[#2C6CA4]/90">{industry.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>
          <Link href="/contact" className="inline-block px-8 py-4 bg-[#3B5998] text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
            Contact Us to Get Started
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}