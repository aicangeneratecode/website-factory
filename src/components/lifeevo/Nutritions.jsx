import Image from "./Image";
import { motion } from "framer-motion";
import { FaUtensils, FaBullseye, FaPlayCircle, FaChartBar } from "react-icons/fa";

const NutritionSection = () => {
  const features = [
    {
      icon: <FaUtensils className="text-3xl text-[#00D4FF]" />, // Fork and knife
      title: "Track Macros",
      description: "Monitor your protein, carbs, and fats for optimal results."
    },
    {
      icon: <FaBullseye className="text-3xl text-[#00D4FF]" />, // Target
      title: "Diet Preferences",
      description: "Personalize your nutrition to fit your dietary needs."
    },
    {
      icon: <FaPlayCircle className="text-3xl text-[#00D4FF]" />, // Video play
      title: "Recipe Videos",
      description: "Follow step-by-step video recipes for healthy meals."
    },
    {
      icon: <FaChartBar className="text-3xl text-[#00D4FF]" />, // Bar chart
      title: "500+ Recipes",
      description: "Access a vast database of delicious, nutritious recipes."
    }
  ];

  return (
    <section id="nutritions" className="relative py-20 overflow-hidden w-full">
      <div className="relative w-full mt-18 mb-0">
        <div className="absolute inset-0 z-0">
          {/* Background Image with smooth fade downwards */}
          <Image
            src="/images/lifeevo/nutritions/background-texture.jpg"
            alt="Nutrition background"
            fill
            className="object-cover opacity-20"
            style={{
              WebkitMaskImage: 'linear-gradient(to top, transparent, black 40%, black 60%, transparent)',
              maskImage: 'linear-gradient(to top, transparent, black 40%, black 60%, transparent)'
            }}
          />
        </div>
        <div className="relative z-30 w-full px-4 py-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="font-oswald text-[12rem] font-black mb-0 text-transparent stroke-text-primary mx-auto w-full leading-none"
              style={{
                WebkitTextStroke: '4px #00D4FF',
                textStroke: '1px #00D4FF',
                color: 'transparent',
                WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)'
              }}
            >
              NUTRITIONS
            </h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              MAINTAINING A HEALTHY LIFESTYLE
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[#CCCCCC] text-lg max-w-2xl mx-auto"
            >
              Nutrition is essential for the body to function properly, repair tissues, and provide daily energy. Our app empowers you to track macros, personalize your diet, follow video recipes, and access a vast recipe database—helping you maintain a healthy lifestyle with ease.
            </motion.p>
          </motion.div>

          {/* Feature Cards */}
          <div className="relative">
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="relative overflow-hidden p-6 text-white bg-[#00D4FF]/5 backdrop-blur-md border border-[#00D4FF]/20 rounded-lg shadow-[inset_0_1px_0px_rgba(0,212,255,0.15),0_0_9px_rgba(0,0,0,0.1),0_3px_8px_rgba(0,0,0,0.10)] hover:bg-[#00D4FF]/10 transition-all duration-300 flex flex-col items-center text-center"
                    style={{
                      position: 'relative',
                    }}
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
                    <div className="w-16 h-16 bg-[#00D4FF]/20 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 justify-center">{feature.title}</h3>
                    <p className="text-sm opacity-90">{feature.description}</p>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSection;
