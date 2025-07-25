import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

export default function Partners() {
  const partners = [
    { name: 'AWS', logo: '/logos/aws.png', description: 'Leading cloud computing platform for scalable solutions.', href: '/partners/aws' },
    { name: 'Microsoft Azure', logo: '/logos/microsoft.png', description: 'Empowering businesses with cloud and AI services.', href: '/partners/azure' },
    { name: 'Huawei', logo: '/logos/huawei.png', description: 'Innovative telecommunications and technology solutions.', href: '/partners/huawei' },
    { name: 'Fortinet', logo: '/logos/fortinet.png', description: 'Advanced cybersecurity for enterprise networks.', href: '/partners/fortinet' },
    { name: 'UiPath', logo: '/logos/uipath.png', description: 'Automation platform for streamlined business processes.', href: '/partners/uipath' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#E6F0FA] text-[#2C6CA4]">
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
              Our Partners
            </motion.h1>
            <motion.p
              className="text-xl text-[#2C6CA4]/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We collaborate with industry leaders to deliver cutting-edge technology solutions that drive business transformation.
            </motion.p>
          </motion.section>
          <motion.section
            className="mb-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <Link key={partner.name} href={partner.href}>
                  <motion.div
                    className="bg-[#E6F0FA] border border-[#2C6CA4]/20 rounded-xl p-6 hover:border-[#3B5998]/30 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 1, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={120}
                      height={60}
                      className="mb-4 object-contain"
                    />
                    <h3 className="text-xl font-bold text-[#2C6CA4] mb-2">{partner.name}</h3>
                    <p className="text-[#2C6CA4]/70">{partner.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
          <motion.section
            className="bg-[#3B5998]/20 border border-[#2C6CA4]/10 rounded-3xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-[#2C6CA4] mb-6">Partner with Us</h2>
            <p className="text-[#2C6CA4]/80 max-w-2xl mx-auto mb-8">
              Join our ecosystem of innovative partners to drive your digital transformation journey forward.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-[#3B5998] text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </Link>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}