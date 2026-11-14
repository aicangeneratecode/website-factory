import Image from "./Image";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const TransformSection = () => {
  return (
    <section id="transform" className="relative py-20 overflow-hidden w-full">
      <div className="relative w-full mt-18 mb-0">
        <div className="absolute inset-0 z-0">
        {/* Background Image with smooth fade downwards */}
        <Image
            src="/images/lifeevo/transform/background-texture.jpg"
            alt="Fitness background"
            fill
            className="object-cover opacity-30"
            style={{
                WebkitMaskImage: 'linear-gradient(to top, transparent, black 40%, black 60%, transparent)',
                maskImage: 'linear-gradient(to top, transparent, black 40%, black 60%, transparent)'
            }}
        />
        </div>


        <div className="relative z-30 w-full px-8 md:px-200 lg:px-32 py-16 md:py-24 lg:py-32">
          {/* Text Content */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-oswald text-[12rem] font-black mb-0 text-transparent stroke-text-primary mx-auto w-full leading-none"
              style={{
                WebkitTextStroke: '4px #00D4FF',
                textStroke: '1px #00D4FF',
                color: 'transparent',
                WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)'
              }}
            >
              TRANSFORM
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[#00D4FF] mb-6"
            >
              YOUR BODY, YOUR LIFE
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[#CCCCCC] text-lg max-w-2xl mx-auto"
            >
              Whether you're a beginner or an experienced fitness enthusiast, our app offers personalized workout plans and nutrition advice tailored to your individual needs and preferences.
            </motion.p>
          </div>
          {/* CTA above the phone image */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <a href="#app-features"
                className="relative overflow-hidden border-2 border-accent2 text-white font-bold py-4 px-10 hover:bg-primary/10 transition-all duration-300 shadow-[0_0_8px_2px_rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_4px_rgba(0,212,255,0.6)]"
                style={{ borderRadius: '12px 0 12px 0' }}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" style={{ borderRadius: '12px 0 12px 0' }}></span>
                <span className="relative z-10">Download App</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Phone image and effects below, outside the background wrapper */}
      <div className="flex justify-center items-end mb-16 relative mt-0 pt-0">
        {/* Curved SVG line as background */}
        <svg
          className="absolute left-0 bottom-0 w-full z-0"
          height="300"
          viewBox="0 0 1920 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.1, pointerEvents: 'none' }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="300" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#00D4FF" />
              <stop offset="100%" stop-color="#8f00ff" />
            </linearGradient>
          </defs>
          <path
            d="M0 260 Q320 180 480 220 T960 120 T1440 200 T1920 40"
            stroke="url(#waveGradient)"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* White glow circles: top left and bottom right */}
        <div className="absolute left-1/4 top-0 w-80 h-80 bg-white opacity-30 blur-[140px] rounded-full z-0"></div>
        <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-white opacity-20 blur-[80px] rounded-full z-0"></div>
        {/* Even larger workout image */}
        <Image
          src="/images/lifeevo/transform/workout-screen.png"
          alt="Workout interface"
          width={800}
          height={1734}
          className="object-cover relative z-10"
        />
      </div>

      {/* Store buttons below the phone */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2 bg-white/10 border border-white/30 px-6 py-3 rounded-full backdrop-blur-xl shadow-lg hover:border-primary/60 transition-colors glassy-gradient">
          <FaApple className="text-2xl" />
          <span>App Store</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 border border-white/30 px-6 py-3 rounded-full backdrop-blur-xl shadow-lg hover:border-primary/60 transition-colors glassy-gradient">
          <FaGooglePlay className="text-xl" />
          <span>Google Play</span>
        </div>
      </div>
    </section>
  );
};

export default TransformSection;
