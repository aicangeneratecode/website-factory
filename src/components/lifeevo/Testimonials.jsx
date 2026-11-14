import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "./Image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Took my group classes to the next level thanks to real-time leaderboards. I trust PunchLab to count my punches for 24 hours non-stop.",
      author: "Ricardo Serravalle",
      role: "Boxing Coach",
      avatar: "/images/lifeevo/testimonials/ricardo.jpg",
      program: "LADIES FIGHT CLUB"
    },
    {
      id: 2,
      quote: "The glute-focused programs transformed my physique in just 8 weeks. The video demonstrations made all the difference.",
      author: "Maya Johnson",
      role: "Fitness Trainer",
      avatar: "/images/lifeevo/testimonials/maya.jpg",
      program: "BOOTY BUILDERS"
    },
    {
      id: 3,
      quote: "Never missed a workout thanks to the achievement system. The progress tracking kept me motivated through the entire program.",
      author: "Alex Chen",
      role: "Athlete",
      avatar: "/images/lifeevo/testimonials/alex.jpg",
      program: "90-DAY CHALLENGE"
    },
    {
      id: 4,
      quote: "The heart rate zone training helped me break through my plateau. I've never been this lean before!",
      author: "Sarah Williams",
      role: "Cardio Enthusiast",
      avatar: "/images/lifeevo/testimonials/sarah.jpg",
      program: "CARDIO BLAST"
    },
    {
      id: 5,
      quote: "As a former athlete, I appreciate the mobility-focused routines. My joints have never felt better.",
      author: "David Kim",
      role: "Physical Therapist",
      avatar: "/images/lifeevo/testimonials/david.jpg",
      program: "MOBILITY MASTERY"
    },
    {
      id: 6,
      quote: "The nutrition guidance was a game changer for my energy levels. Highly recommend to anyone serious about results!",
      author: "Priya Patel",
      role: "Nutritionist",
      avatar: "/images/lifeevo/testimonials/priya.jpg",
      program: "NUTRITION PRO"
    },
    {
      id: 7,
      quote: "I love the community challenges! Competing with friends keeps me motivated week after week.",
      author: "Liam O'Connor",
      role: "Fitness App User",
      avatar: "/images/lifeevo/testimonials/liam.jpg",
      program: "COMMUNITY FIT"
    },
    {
      id: 8,
      quote: "The app's workout variety means I never get bored. There's something new every day!",
      author: "Sofia Rossi",
      role: "Yoga Instructor",
      avatar: "/images/lifeevo/testimonials/sofia.jpg",
      program: "VARIETY PACK"
    }
  ];

  const carouselRef = useRef();
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const [scrollStartX, setScrollStartX] = useState(null);

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const threshold = 50; // Minimum px to be considered a swipe
    if (distance > threshold) {
      // Swipe left (next)
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      }
    } else if (distance < -threshold) {
      // Swipe right (prev)
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setScrollStartX(carouselRef.current ? carouselRef.current.scrollLeft : 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (carouselRef.current) {
      const dx = e.clientX - dragStartX;
      carouselRef.current.scrollLeft = scrollStartX - dx;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section id="testimonials" className="relative w-screen min-h-[500px] overflow-hidden">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lifeevo/testimonials/background.jpg"
          alt="Fitness background"
          fill
          className="object-cover blur-sm opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="font-oswald text-6xl md:text-7xl font-black mb-0 text-transparent stroke-text-primary mx-auto w-full leading-none"
            style={{
              WebkitTextStroke: '2px #00D4FF',
              textStroke: '2px #00D4FF',
              color: 'transparent',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}
          >
            What <span style={{ color: '#00D4FF', WebkitTextStroke: '0', textStroke: '0', textShadow: '0 2px 16px #00D4FF44' }}>Fitness Geek</span> Says
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 font-semibold max-w-2xl mx-auto mb-0">
            Real members share their transformation stories
          </p>

        </motion.div>

        {/* Testimonial Cards Carousel (swipeable + arrows) */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#0A0E27]/80 p-3 rounded-full border border-[#00D4FF]/30 hover:bg-[#00D4FF]/10 transition-all -ml-4"
            style={{ touchAction: 'none' }}
            onClick={() => carouselRef.current && carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' })}
            aria-label="Scroll testimonials left"
          >
            <FaChevronLeft className="text-[#00D4FF] text-xl" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#0A0E27]/80 p-3 rounded-full border border-[#00D4FF]/30 hover:bg-[#00D4FF]/10 transition-all -mr-4"
            style={{ touchAction: 'none' }}
            onClick={() => carouselRef.current && carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' })}
            aria-label="Scroll testimonials right"
          >
            <FaChevronRight className="text-[#00D4FF] text-xl" />
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-10 px-4 py-8 scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: 'x mandatory' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="flex-shrink-0 w-[90vw] max-w-xl h-[420px] snap-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              >
                <div className="relative overflow-hidden p-12 text-white bg-[#00D4FF]/5 backdrop-blur-md border border-[#00D4FF]/20 rounded-lg shadow-[inset_0_1px_0px_rgba(0,212,255,0.15),0_0_9px_rgba(0,0,0,0.1),0_3px_8px_rgba(0,0,0,0.10)] hover:bg-[#00D4FF]/10 transition-all duration-300 flex flex-col items-center justify-between h-full group">
                  {/* NEW: Quotation mark */}
                  <div className="absolute top-8 left-8 text-[#00D4FF] text-4xl font-serif opacity-80">
                    "
                  </div>
                  {/* NEW: Program badge */}
                  <div className="absolute top-6 right-6 bg-[#00D4FF]/10 px-3 py-1 rounded-full border border-[#00D4FF]/30">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {testimonial.program}
                    </span>
                  </div>
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
                  <div className="relative z-10 flex flex-col items-center text-center h-full justify-center w-full py-8">
                    <blockquote className="text-2xl md:text-3xl font-bold mb-4 leading-relaxed text-white/90 max-w-lg">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex flex-col items-center mt-auto">
                      <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-1">{testimonial.author}</h3>
                      <p className="text-lg md:text-xl text-[#00D4FF] font-semibold mb-1">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
