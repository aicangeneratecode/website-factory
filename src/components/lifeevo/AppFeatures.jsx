import Image from "./Image";
import { motion } from "framer-motion";
import { FaCheck, FaQrcode } from "react-icons/fa";

const AppFeaturesSection = () => {
  const features = [
    "App Integrations",
    "Achievements and Badges",
    "Progress Tracking",
    "Community Sharing",
    "Video Instructions",
    "Recipe Following"
  ];

  return (
    <section id="app-features" className="relative py-20 overflow-hidden">
      {/* Background lighting effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00D4FF] opacity-10 blur-[80px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#007BFF] opacity-10 blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-screen-xl">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#00D4FF] font-semibold tracking-wider">DOWNLOAD APP</span>
              <h2 className="font-bebas font-black text-5xl md:text-7xl lg:text-8xl mt-2 mb-6 leading-tight text-white">
                ALL YOUR<br />
                <span className="block bg-gradient-to-b from-[#00D4FF] to-[#0099CC] bg-clip-text text-transparent">FITNESS IN ONE APP.</span>
              </h2>
              <p className="text-[#E6E6E6] text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                LifeEvo combines workouts, nutrition tracking, progress monitoring, and community features into one powerful platform designed to help you achieve your fitness goals.
              </p>

              <ul className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-[#00D4FF] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-[#E6E6E6]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* QR Code */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg inline-flex">
                  <FaQrcode className="text-4xl text-black" />
                </div>
                <span className="text-[#CCCCCC] text-sm">Scan to download<br/>the LifeEvo app</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Phone Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center relative"
          >
            {/* Hollow Gradient Circle - Positioned behind phone */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] flex items-center justify-center -z-10">
              <div className="w-full h-full rounded-full border-[40px] border-transparent border-opacity-50"
                   style={{
                     background: 'linear-gradient(#0A0E27, #0A0E27) padding-box, linear-gradient(to bottom, #00D4FF, #0099CC) border-box',
                     mask: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
                     maskComposite: 'exclude',
                     WebkitMaskComposite: 'xor'
                   }}>
              </div>
            </div>

            {/* Phone Image */}
            <div className="relative max-w-xs z-10">
              <Image
                src="/images/lifeevo/app-features/phone-mockup.png"
                alt="LifeEvo app dashboard"
                width={400}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppFeaturesSection;
