// frontend/components/Footer.js
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col gap-10 py-10 px-6 md:px-12 border-t border-[#2C6CA4]/40 bg-[#1A2344] z-10 relative">
      <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start justify-between">
        <div className="flex flex-col sm:flex-row gap-52 items-center sm:items-start">
          <div className="flex gap-6 flex-nowrap justify-center sm:justify-start">
            {[
              { href: '/about', label: 'About Us', icon: 'file.svg' },
              { href: '/blog', label: 'Blog', icon: 'globe.svg' },
            ].map(({ href, label, icon }) => (
              <Link
                key={label}
                className="flex items-center gap-2 text-[#F0F7FF]/90 hover:text-[#F0F7FF] hover:underline transition-all duration-300"
                href={href}
                aria-label={`Go to ${label} page`}
              >
                <Image aria-hidden src={`/${icon}`} alt={`${label} icon`} width={20} height={20} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col text-[#F0F7FF]/90 bg-[#2C6CA4]/10 rounded-lg w-[750px] p-6">
            <h3 className="text-lg font-semibold text-[#F0F7FF] mb-4">Contact Us</h3>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-2">📍 71 Second District, Northern Lotus, New Cairo, Egypt</span>
                <span className="flex items-center gap-2">
                  ✉️
                  <a href="mailto:info@it-visionary.com" className="hover:underline hover:text-[#F0F7FF]">
                    info@it-visionary.com
                  </a>
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-2">
                  <Image aria-hidden src="/phone.png" alt="Phone icon" width={20} height={20} />
                  +20 2 25306225
                </span>
                <span className="flex items-center gap-2">
                  <Image aria-hidden src="/phone.png" alt="Phone icon" width={20} height={20} />
                  +2010000410205
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href="https://www.linkedin.com/company/it-visionary/"
              className="text-[#F0F7FF]/90 hover:text-[#F0F7FF] transition-all duration-300"
              aria-label="Visit our LinkedIn page"
            >
              <div className="bg-[#2C6CA4]/20 hover:bg-[#2C6CA4]/40 p-3 rounded-full hover:scale-110 transition-all">
                <Image src="/logos/linkedin-logo.png" alt="LinkedIn logo" width={24} height={24} />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-[#F0F7FF]/60 text-sm font-medium">
        © {new Date().getFullYear()} IT Visionary. All rights reserved.
      </div>
    </footer>
  );
}