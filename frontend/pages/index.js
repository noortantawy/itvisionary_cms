// frontend/pages/index.js
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import ParticleBackground from '../components/ParticleBackground';
import { useRouter } from 'next/router';

export default function Home() {
  const { query } = useRouter();
  const isPreview = query.preview === 'true';

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-gradient-to-br from-[#ffffff] to-[#3B5998] text-[#2C6CA4]">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 pointer-events-none z-0" />
      
      {!isPreview && <Header />}
      <main className="main-content flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-20 pt-20 pb-16 gap-12 z-10 text-center overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto relative z-10">
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C6CA4] text-center" style={{ lineHeight: '1.2' }}>
            Transform Your Business with ITVisionary
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-base md:text-lg text-[#2C6CA4]/80 max-w-xl mx-auto leading-tight mb-6">
            Unleash innovation with cutting-edge solutions. Embrace the cloud for efficiency and sustainability.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/about" className="relative overflow-hidden rounded-full bg-[#3B5998] hover:shadow-xl hover:shadow-blue-500/50 px-6 py-3 text-white font-medium transition-all duration-300 group">
              <span className="relative z-10 flex items-center gap-2">
                Get to Know Us
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
            <Link href="/services" className="relative overflow-hidden rounded-full bg-[#3B5998] hover:shadow-xl hover:shadow-blue-500/50 px-6 py-3 text-white font-medium transition-all duration-300 group">
              <span className="relative z-10 flex items-center gap-2">
                Our Services
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
        <section className="py-12 px-4 z-10 text-center">
          <h2 className="text-3xl font-bold text-[#2C6CA4] mb-6">Why Choose Us</h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Expertise', desc: 'Decades of experience in tech and sustainable solutions.' },
              { title: 'Innovation', desc: 'Cutting-edge strategies tailored to your needs.' },
              { title: 'Sustainability', desc: 'Committed to eco-friendly business practices.' },
              { title: 'Support', desc: '24/7 dedicated support for your success.' },
            ].map(({ title, desc }, index) => (
              <motion.div key={index} className="bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-6 hover:bg-[#E6F0FA]/50 transition-all duration-300" whileHover={{ scale: 1.05 }}>
                <h3 className="text-xl font-semibold text-[#2C6CA4] mb-2">{title}</h3>
                <p className="text-[#2C6CA4]/70">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
        <section className="py-12 px-4 z-10 text-center">
          <h2 className="text-3xl font-bold text-[#2C6CA4] mb-6">What We Offer</h2>
          <motion.div initial={{ opacity: 0.8, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { href: '/services/cloud', label: 'Cloud Solutions', desc: 'Seamless cloud migration and management.' },
              { href: '/services/consulting', label: 'Tech Consulting', desc: 'Expert advice for your tech needs.' },
              { href: '/services/transformation', label: 'Digital Transformation', desc: 'Accelerate your business with cutting-edge tech.' },
            ].map(({ href, label, desc }, index) => (
              <Link key={index} href={href} className="group">
                <motion.div
                  className="relative bg-[#E6F0FA]/30 backdrop-blur-md border border-[#2C6CA4]/20 rounded-xl p-6 h-40 flex items-center justify-center transition-all duration-500 group-hover:bg-[#E6F0FA]/50 group-hover:shadow-xl group-hover:shadow-[#2C6CA4]/40"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-[#2C6CA4]">{label}</h3>
                    <p className="text-sm text-[#2C6CA4]/70 mt-2">{desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </section>
        <section className="py-12 px-4 z-10 text-center">
          <h2 className="text-3xl font-bold text-[#2C6CA4] mb-6">Trusted by Customers</h2>
          <div className="max-w-6xl mx-auto">
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
              {['1', '2', '3', '4', '5'].map((client) => (
                <div key={client} className="w-24 h-24 flex items-center justify-center bg-[#E6F0FA]/30 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Image src={`/clients/${client}.png`} alt={`${client} logo`} width={80} height={80} className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      
      <section className="py-8 px-4 bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-6 z-10 overflow-hidden rounded-3xl max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#2C6CA4]">Partners</h2>
        <motion.div
          className="flex items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 px-8">
              {['aws', 'microsoft', 'huawei', 'uipath', 'fortinet'].map((logo) => (
                <div key={logo} className="transition-all duration-300">
                  <Image src={`/logos/${logo}.png`} alt={`${logo} logo`} width={120} height={60} className="object-contain h-12 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>
      
{!isPreview && <Footer />}
      
    </div>
  );
}