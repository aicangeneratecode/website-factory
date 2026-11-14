import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const FooterNavLink = ({ href, children, cta }) => (
  <a
    href={href}
    className={`relative text-white text-[16px] font-medium px-4 py-2 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:outline-cyan-500 rounded-md group flex items-center justify-center
      ${cta ? "overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-secondary text-white font-bold py-2 px-5 shadow-[0_0_8px_2px_rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_4px_rgba(0,212,255,0.6)] border-2 border-accent2 rounded-[12px_0_12px_0]" : "hover:text-[#00D4FF]"}
    `}
    style={cta ? { borderRadius: '12px 0 12px 0' } : { overflow: 'hidden' }}
  >
    <span className="relative z-10">{children}</span>
    {!cta && (
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          borderRadius: '8px',
          background: 'linear-gradient(120deg,rgba(0,212,255,0.10) 0%,rgba(0,153,204,0.10) 100%)',
          boxShadow: '0 0 16px 2px rgba(0,212,255,0.10)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
    )}
    {cta && (
      <span className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" style={{ borderRadius: '12px 0 12px 0' }}></span>
    )}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-black border-t border-[#1A1F3A] text-white pt-16 pb-8 px-4">
      <div className="max-w-[900px] mx-auto flex flex-col items-center">
        {/* Centered Logo */}
        <a href="/lifeevo/" className="flex items-center group focus:outline-none focus-visible:outline-cyan-500 mb-8 select-none">
          <span className="text-white text-[28px] font-semibold tracking-tight font-lifeevo">Life</span>
          <span className="text-[#00D4FF] text-[28px] font-semibold tracking-tight font-lifeevo">Evo</span>
          <sup className="text-white text-xs ml-0.5 group-hover:text-[#00D4FF]">™</sup>
        </a>
        {/* Navigation Links */}
        <nav aria-label="Footer Navigation" className="mb-8">
          <ul className="flex flex-wrap justify-center gap-2">
            <li><FooterNavLink href="#hero">Home</FooterNavLink></li>
            <li><FooterNavLink href="#transform">Workouts</FooterNavLink></li>
            <li><FooterNavLink href="#nutritions">Nutrition</FooterNavLink></li>
            <li><FooterNavLink href="#app-features">Features</FooterNavLink></li>
            <li><FooterNavLink href="#testimonials">Testimonials</FooterNavLink></li>
            <li><FooterNavLink href="#programs" cta>Programs</FooterNavLink></li>
          </ul>
        </nav>
        {/* Social Icons */}
        <div className="flex gap-4 mb-8">
          <a href="#" className="text-white/80 hover:text-[#00D4FF] transition-colors"><FaFacebook size={22} /></a>
          <a href="#" className="text-white/80 hover:text-[#00D4FF] transition-colors"><FaInstagram size={22} /></a>
          <a href="#" className="text-white/80 hover:text-[#00D4FF] transition-colors"><FaTwitter size={22} /></a>
          <a href="#" className="text-white/80 hover:text-[#00D4FF] transition-colors"><FaYoutube size={22} /></a>
        </div>
        {/* Copyright */}
        <div className="text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} LifeEvo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
