import { useEffect, useRef, useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NavigationLink = ({ href, children, cta, onNavigate }) => {
  const isActive = false;
  if (cta) {
    // Programs button: copy Explore Plans style
    return (
      <a
        href={href} onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={`relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-secondary text-white font-bold py-2 px-5 transition-all duration-300 shadow-[0_0_8px_2px_rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_4px_rgba(0,212,255,0.6)] border-2 border-accent2 focus:outline-none focus-visible:outline-cyan-500 rounded-[12px_0_12px_0] flex items-center justify-center ${isActive ? "ring-2 ring-[#00D4FF]" : ""}`}
        style={{ borderRadius: '12px 0 12px 0' }}
      >
        <span className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" style={{ borderRadius: '12px 0 12px 0' }}></span>
        <span className="relative z-10">{children}</span>
      </a>
    );
  }
  // Other nav links: liquid oil hover effect
  return (
    <a
      href={href} onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`relative text-white text-[16px] font-medium px-4 py-2 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:outline-cyan-500 rounded-md
        ${isActive ? "text-[#00D4FF] underline underline-offset-4 bg-[#1A1F3A]" : "hover:text-[#00D4FF]"}
        group flex items-center justify-center`}
      style={{ overflow: 'hidden' }}
    >
      <span className="relative z-10">{children}</span>
      {/* Liquid oil hover effect */}
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
    </a>
  );
};

const Header = ({ factoryDemo = false }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const signInRef = useRef(null);
  const signUpRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event) => {
    if (signInRef.current && !signInRef.current.contains(event.target)) {
      setIsSignInOpen(false);
    }
    if (signUpRef.current && !signUpRef.current.contains(event.target)) {
      setIsSignUpOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && navbarOpen) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  return (
    <header
      className={`fixed ${factoryDemo ? "top-[var(--factory-bar-height)] bg-[#0A0E27]" : "top-0"} z-[100] w-full border-b border-[#1A1F3A] transition-all duration-300 ${
        sticky
          ? "backdrop-blur-sm shadow-lg h-[70px]"
          : "backdrop-blur-sm h-[70px]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center relative">
        {/* Left Nav */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center h-full">
          <ul className="flex items-center h-full space-x-1">
            <li><NavigationLink href="#hero" exact>Home</NavigationLink></li>
            <li><NavigationLink href="#transform">Workouts</NavigationLink></li>
            <li><NavigationLink href="#nutritions">Nutrition</NavigationLink></li>
          </ul>
        </nav>
        {/* Centered Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 select-none">
          <a href="/lifeevo/" className="flex items-center group focus:outline-none focus-visible:outline-cyan-500">
            <span className="text-white text-[28px] font-semibold tracking-tight font-lifeevo">Life</span>
            <span className="text-[#00D4FF] text-[28px] font-semibold tracking-tight font-lifeevo">Evo</span>
            <sup className="text-white text-xs ml-0.5 group-hover:text-[#00D4FF]">™</sup>
          </a>
        </div>
        {/* Right Nav */}
        <nav className="hidden lg:flex items-center h-full ml-auto">
          <ul className="flex items-center h-full space-x-1">
            <li><NavigationLink href="#app-features">Features</NavigationLink></li>
            <li><NavigationLink href="#testimonials">Testimonials</NavigationLink></li>
            <li><NavigationLink href="#programs" cta>Programs</NavigationLink></li>
          </ul>
        </nav>
        {/* Mobile Hamburger */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="lg:hidden p-2 text-white hover:text-[#00D4FF] transition-colors z-20 ml-auto"
          aria-label="Toggle mobile menu"
        >
          {navbarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* Mobile Menu */}
        <AnimatePresence>
          {navbarOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              ref={mobileMenuRef}
              className="lg:hidden fixed right-0 bottom-0 w-4/5 bg-[#0A0E27] shadow-lg z-50 p-6 flex flex-col" style={{ top: factoryDemo ? "var(--factory-bar-height)" : 0 }}
            >
              <div className="flex justify-between items-center mb-8">
                <a href="/lifeevo/" onClick={() => setNavbarOpen(false)} className="flex items-center">
                  <span className="text-white text-2xl font-semibold tracking-tight">Life</span>
                  <span className="text-[#00D4FF] text-2xl font-semibold tracking-tight">Evo</span>
                  <sup className="text-white text-xs ml-0.5">™</sup>
                </a>
                <button
                  onClick={() => setNavbarOpen(false)}
                  className="text-white hover:text-[#00D4FF] transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
                <NavigationLink onNavigate={() => setNavbarOpen(false)} href="#hero" exact>{"Home"}</NavigationLink>
                <NavigationLink onNavigate={() => setNavbarOpen(false)} href="#transform">{"Workouts"}</NavigationLink>
                <NavigationLink onNavigate={() => setNavbarOpen(false)} href="#nutritions">{"Nutrition"}</NavigationLink>
                <NavigationLink onNavigate={() => setNavbarOpen(false)} href="#app-features">{"Features"}</NavigationLink>
                <NavigationLink onNavigate={() => setNavbarOpen(false)} href="#testimonials">{"Testimonials"}</NavigationLink>
                <NavigationLink onNavigate={() => setNavbarOpen(false)} href="#programs" cta>{"Programs"}</NavigationLink>
              </nav>
              <div className="mt-auto flex flex-col space-y-4 pt-8">
                <button
                  onClick={() => {
                    setIsSignInOpen(true);
                    setNavbarOpen(false);
                  }}
                  className="text-white hover:text-[#00D4FF] transition-colors py-3 text-left"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsSignUpOpen(true);
                    setNavbarOpen(false);
                  }}
                  className="bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-white font-medium py-3 px-6 rounded-lg transition-all"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Auth Modals */}
        <AnimatePresence>
          {isSignInOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                ref={signInRef}
                className="bg-[#0A0E27] rounded-lg p-8 max-w-md w-full mx-4 relative"
              >
                <button
                  onClick={() => setIsSignInOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-[#00D4FF] transition-colors"
                  aria-label="Close Sign In Modal"
                >
                  <FaTimes size={20} />
                </button>
                <p role="status">Sign-in is unavailable in this demo.</p>
              </motion.div>
            </div>
          )}
          {isSignUpOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                ref={signUpRef}
                className="bg-[#0A0E27] rounded-lg p-8 max-w-md w-full mx-4 relative"
              >
                <button
                  onClick={() => setIsSignUpOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-[#00D4FF] transition-colors"
                  aria-label="Close Sign Up Modal"
                >
                  <FaTimes size={20} />
                </button>
                <p role="status">Registration is unavailable in this demo.</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
