// frontend/components/Header.js
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState({
    services: false,
    partners: false,
    products: false,
  });
  const timeoutRefs = useRef({
    services: null,
    partners: null,
    products: null,
  });

  const handleDropdown = (menu, isOpen) => {
    if (timeoutRefs.current[menu]) clearTimeout(timeoutRefs.current[menu]);
    if (isOpen) {
      setDropdownOpen((prev) => ({ ...prev, [menu]: true }));
    } else {
      timeoutRefs.current[menu] = setTimeout(() => {
        setDropdownOpen((prev) => ({ ...prev, [menu]: false }));
      }, 200);
    }
  };

  return (
    <header className="relative z-50 w-full sticky top-0 bg-transparent backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="z-50 hover:scale-105 transition-transform duration-300">
          <Image
            src="/itVisionaryLogo.png"
            alt="ITVisionary logo"
            width={280}
            height={100}
            className="object-contain"
            priority
          />
        </Link>
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-8 bg-[#3B5998] backdrop-blur-xl border border-white/10 rounded-full shadow-xl px-10 py-3 text-lg font-medium z-40">
          {[
            { href: '/about', label: 'About Us' },
            {
              href: '/products',
              label: 'Products',
              dropdown: [
                { href: '/products/rpa', label: 'RPA' },
                { href: '/products/ai-ml', label: 'AI/ML' },
              ],
            },
            { href: '/services', label: 'Services' },
            {
              href: '/partners',
              label: 'Partners',
              dropdown: [
                { href: '/partners/aws', label: 'AWS' },
                { href: '/partners/huawei', label: 'HUAWEI' },
                { href: '/partners/azure', label: 'Microsoft Azure' },
                { href: '/partners/fortinet', label: 'Fortinet' },
                { href: '/partners/uipath', label: 'UiPath' },
              ],
            },
          ].map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && handleDropdown(item.label.toLowerCase(), true)}
              onMouseLeave={() => item.dropdown && handleDropdown(item.label.toLowerCase(), false)}
            >
              <Link href={item.href} className="flex items-center gap-1 text-white hover:text-blue-200 transition-all duration-300 group">
                <span>{item.label}</span>
                {item.dropdown && (
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
              {item.dropdown && dropdownOpen[item.label.toLowerCase()] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-4 w-56 bg-white/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {item.dropdown.map((subItem, index) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className={`block px-6 py-3 text-gray-800 hover:bg-blue-50/50 transition-colors duration-300 ${
                        index === 0 ? 'rounded-t-xl' : index === item.dropdown.length - 1 ? 'rounded-b-xl' : ''
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="z-50">
          <Link href="/contact" className="bg-[#3B5998] text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
            <span>Connect Now</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}