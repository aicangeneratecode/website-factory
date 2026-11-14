import Image from "./Image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaDumbbell, FaTimes, FaFire,
  FaVideo,
  FaBed,
  FaWeight,
  FaRunning,
  FaUtensils
} from "react-icons/fa";
import LightRays from "./LightRays";

const Hero = () => {
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsPlansOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isPlansOpen ? "hidden" : "";
  }, [isPlansOpen]);

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const stats = [
    { value: '220 kcal', label: 'Body weight', icon: <FaFire className="text-[#00D4FF] text-2xl" /> },
    { value: '4 Videos', label: 'Available', icon: <FaVideo className="text-[#00D4FF] text-2xl" /> },
    { value: '12 hours', label: 'Sleep tracking', icon: <FaBed className="text-[#00D4FF] text-2xl" /> },
    { value: '88.7', label: 'Body Weight', icon: <FaWeight className="text-[#00D4FF] text-2xl" /> },
    { value: '3.4 hours', label: 'Activity', icon: <FaRunning className="text-[#00D4FF] text-2xl" /> },
    { value: '500+', label: 'Recipes', icon: <FaUtensils className="text-[#00D4FF] text-2xl" /> }
  ];

  return (
    <section id="hero" className="relative pt-40 pb-0 overflow-hidden">
      {/* Light Rays BG Effect - overlay, not replacing main bg */}
      <div style={{ width: '100%', height: '600px', position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={0.8}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="container mx-auto lg:max-w-screen-xl px-4 relative z-10">
        {/* Main content: text and image side by side */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left Column - Text Content */}
          <motion.div {...leftAnimation} className="flex-1 w-full">
            <div className="flex gap-4 items-center lg:justify-start justify-center mb-6">
              <FaDumbbell className="text-[#00D4FF] text-4xl" />
              <p className="text-white text-xl sm:text-2xl font-bold">
                FITNESS ON THE <span className="text-[#00D4FF]">GO</span>
              </p>
            </div>

            <h1 className="font-bebas font-black lg:text-9xl md:text-8xl text-7xl lg:text-start text-center text-white mb-8 leading-tight">
              START YOUR<br />
              <span className="block bg-gradient-to-b from-[#00D4FF] to-[#0099CC] bg-clip-text text-transparent">LIFEEVO.</span>
            </h1>

            <p className="text-[#CCCCCC] text-lg lg:text-start text-center max-w-lg mx-auto lg:mx-0 mb-10 font-medium">
              Bodyweight. Weight. Cardio. Pick any home or gym workouts that fits your goals.
              Sign up for the free LifeEvo app.
            </p>

            <div className="flex flex-wrap items-center gap-4 md:justify-start justify-center mb-8">
              <button
                className="relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-secondary text-white font-bold py-4 px-10 transition-all duration-300 shadow-[0_0_8px_2px_rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_4px_rgba(0,212,255,0.6)] border-2 border-accent2"
                style={{
                  borderRadius: '12px 0 12px 0'
                }}
                onClick={() => setIsPlansOpen(true)}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" style={{ borderRadius: '12px 0 12px 0' }}></span>
                <span className="relative z-10">Explore Plans</span>
              </button>
              <a href="#app-features"
                className="relative overflow-hidden border-2 border-accent2 text-white font-bold py-4 px-10 hover:bg-primary/10 transition-all duration-300 shadow-[0_0_8px_2px_rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_4px_rgba(0,212,255,0.6)]"
                style={{
                  borderRadius: '12px 0 12px 0'
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" style={{ borderRadius: '12px 0 12px 0' }}></span>
                <span className="relative z-10">Download App</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Phone Image, aligned to top and limited in height */}
          <motion.div
            {...rightAnimation}
            className="flex-1 w-full flex justify-center lg:justify-end mt-8 lg:mt-0 items-stretch"
          >
            <div className="w-full flex items-stretch">
              <Image
                src="/images/lifeevo/hero/banner-image.png"
                alt="Fitness App Preview" priority
                width={1000}
                height={1500}
                className="drop-shadow-2xl w-full h-full max-w-lg"
                style={{ objectFit: 'contain', height: '100%' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid with Glass Effect - now full width below main content */}
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden p-4 text-white bg-[#00D4FF]/5 border border-[#00D4FF]/20 rounded-lg backdrop-blur-md shadow-[inset_0_1px_0px_rgba(0,212,255,0.15),0_0_9px_rgba(0,0,0,0.1),0_3px_8px_rgba(0,0,0,0.10)] hover:bg-[#00D4FF]/10 transition-all duration-300"
                style={{ position: 'relative' }}
              >
                {/* Layered gradients for glass shine */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    background: 'linear-gradient(135deg,rgba(0,212,255,0.18) 0%,transparent 70%)',
                    opacity: 0.5,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    background: 'linear-gradient(45deg,rgba(0,123,255,0.10) 0%,transparent 70%)',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />
                <span style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                  <div className="flex items-center gap-2 mb-2">
                    {stat.icon}
                    <p className="text-[#00D4FF] font-extrabold text-2xl">{stat.value}</p>
                  </div>
                  <p className="text-[#CCCCCC] text-base font-semibold pl-8">{stat.label}</p>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating animated elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-[#00D4FF] blur-[20px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-20 w-6 h-6 rounded-full bg-[#007BFF] blur-[30px] opacity-50 animate-pulse delay-1000"></div>

      {/* Plans Modal */}
      {isPlansOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="relative w-full max-w-md mx-4 p-8 bg-[#0A0E27]/90 border border-[#00D4FF]/30 backdrop-blur-lg"
            style={{
              borderRadius: '12px 0 0 12px',
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)'
            }}
          >
            <button
              onClick={() => setIsPlansOpen(false)}
              className="absolute top-6 right-6 text-[#CCCCCC] hover:text-[#00D4FF] transition-colors"
              aria-label="Close Plans Modal"
            >
              <FaTimes className="text-2xl" />
            </button>
            <h3 className="text-2xl font-extrabold text-white mb-6">Choose Your Plan</h3>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 border border-[#00D4FF]/30 hover:border-[#00D4FF]/60 transition-colors bg-[#0A0E27]/50 backdrop-blur-sm"
                style={{ borderRadius: '12px 0 0 12px' }}
              >
                <h4 className="text-[#00D4FF] font-extrabold text-xl">Basic</h4>
                <p className="text-[#CCCCCC] font-medium">Free workout plans</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 border border-[#00D4FF]/30 hover:border-[#00D4FF]/60 transition-colors bg-[#0A0E27]/50 backdrop-blur-sm"
                style={{ borderRadius: '12px 0 0 12px' }}
              >
                <h4 className="text-[#00D4FF] font-extrabold text-xl">Premium</h4>
                <p className="text-[#CCCCCC] font-medium">Personalized training & nutrition</p>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
