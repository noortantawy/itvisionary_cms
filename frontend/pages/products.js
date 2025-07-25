'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

export default function Products() {
  // Products data
  const products = [
    {
      title: 'Robotic Process Automation (RPA)',
      description: 'Our RPA solution automates repetitive, rule-based tasks across your infrastructure, from data entry to invoice processing. Leveraging cutting-edge technology, it ensures seamless integration with existing systems, enhances efficiency, and reduces operational costs while maintaining high accuracy and scalability.',
      picture: '/rpa.jpg',
    },
    {
      title: 'Machine Learning & Artificial Intelligence (ML/AI)',
      description: 'Our ML/AI product empowers your business with advanced analytics and decision-making capabilities. It drives intelligent monitoring, predicts trends, and optimizes processes like cloud security and SAP transformations, ensuring resilience against cyber threats and scalability for future growth.',
      picture: '/ai.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#E6F0FA] overflow-hidden">
      <ParticleBackground selector=".main-content" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 pointer-events-none z-0" />
      <Header />
      <main className="main-content flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-20 pt-20 pb-16 gap-12 z-10 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C6CA4]"
            style={{ lineHeight: '1.2' }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="text-2xl text-[#2C6CA4]/80 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover ITVisionary’s innovative RPA and ML/AI solutions designed to transform your business with cutting-edge technology
          </motion.p>

          <div className="space-y-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="bg-[#E6F0FA]/30 backdrop-blur-sm border border-[#2C6CA4]/20 rounded-xl p-6 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <div className="w-2/3 pr-4">
                  <h2 className="text-2xl font-semibold text-[#2C6CA4] mb-4">{product.title}</h2>
                  <p className="text-lg text-[#2C6CA4]/70">{product.description}</p>
                </div>
                <Image
                  src={product.picture}
                  alt={`${product.title} image`}
                  width={128}
                  height={128}
                  className="object-cover rounded-lg"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12"
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-[#3B5998] text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              Explore Solutions
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}