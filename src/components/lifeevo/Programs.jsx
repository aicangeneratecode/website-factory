import Image from "./Image";
import { motion } from "framer-motion";

const ProgramsSection = () => {
  const programs = [
    {
      title: "Boost 2.0",
      subtitle: "Booty x Body",
      image: "/images/lifeevo/programs/boost2.jpg",
      featured: false,
      details: []
    },
    {
      title: "Shred 2.0",
      subtitle: "TOTAL SHRED",
      image: "/images/lifeevo/programs/shred2.jpg",
      featured: true,
      details: [
        "5 days per week",
        "Gym equipment + bands needed",
        "Focus: Building Glutes",
        "Level: Moderate"
      ]
    },
    {
      title: "Boost 1.0",
      subtitle: "Booty x Body",
      image: "/images/lifeevo/programs/boost1.jpg",
      featured: false,
      details: []
    }
  ];

  return (
    <section id="programs" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
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
            PROGRAMS
          </h2>
          <p className="text-[#CCCCCC] text-lg max-w-2xl mx-auto">
            Whether you prefer to do a quick workout during your lunch break, or you have a busy schedule that requires you to exercise early in the morning
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="relative">
          {/* Blue blurred gradient shape behind cards */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[550px] z-0" style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #007BFF 0%, transparent 100%)',
            filter: 'blur(140px)',
            opacity: 0.25
          }}></div>
          <div className="relative z-10">
            <div id="program-list" className="scroll-mt-[90px] grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: program.featured ? 1.05 : 1.02 }}
                  className={`relative aspect-[4/5] rounded-2xl overflow-hidden group ${program.featured ? 'ring-4 ring-[#00D4FF]' : 'ring-1 ring-[#00D4FF]/30'}`}
                >
                  {/* Background Image with Layered Effects */}
                  <div className="absolute inset-0">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className={`object-cover transition-all duration-500 ${program.featured ? 'group-hover:scale-105' : 'group-hover:scale-103'}`}
                      unoptimized
                    />
                    {/* Multi-layer Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27]/90 via-[#0A0E27]/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00D4FF]/20 via-[#00D4FF]/5 to-transparent"></div>
                    {program.featured && (
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#00D4FF/10%)]"></div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className={`p-5 rounded-xl transition-all duration-300 ${
                      program.featured
                        ? 'backdrop-blur-lg bg-[#0A0E27]/60 border border-[#00D4FF]/30 shadow-[0_0_30px_-5px_rgba(0,212,255,0.3)]'
                        : 'backdrop-blur-sm bg-[#0A0E27]/50 border border-white/10'
                    }`}>
                      {/* Title with animated underline */}
                      <div className="relative pb-2 mb-2">
                        <h3 className="text-lg font-semibold text-[#00D4FF] tracking-wide">
                          {program.title}
                        </h3>
                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#00D4FF] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </div>

                      <div className="text-2xl font-bold text-white mb-3 leading-tight">
                        {program.subtitle}
                      </div>

                      {program.featured && (
                        <ul className="space-y-2 mt-3 border-t border-[#00D4FF]/20 pt-3">
                          {program.details.map((detail, i) => (
                            <li key={i} className="text-white/90 text-sm flex items-center">
                              <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Featured Badge with shine effect */}
                  {program.featured && (
                    <div className="absolute top-5 right-5 bg-gradient-to-br from-[#00D4FF] to-[#007BFF] text-[#0A0E27] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <span className="relative z-10">FEATURED</span>
                      <span className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></span>
                    </div>
                  )}

                  {/* Hover shine effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -inset-20 bg-[conic-gradient(from_0deg,transparent_0deg,#00D4FF/30%_180deg,transparent_360deg)] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#program-list"
            className="relative overflow-hidden border-2 border-[#00D4FF] text-white font-bold py-4 px-10 hover:bg-[#00D4FF]/10 transition-all duration-300 shadow-[0_0_8px_2px_rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_4px_rgba(0,212,255,0.6)]"
            style={{ borderRadius: '12px 0 12px 0' }}
          >
            <span className="absolute inset-0 bg-gradient-to-b from-[#00D4FF]/20 to-transparent pointer-events-none" style={{ borderRadius: '12px 0 12px 0' }}></span>
            <span className="relative z-10">View All Programs</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
