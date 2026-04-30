import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="w-16 h-px bg-black mb-8"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <motion.h2 
              className="text-4xl md:text-5xl font-light text-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Moraj represents a new paradigm in urban living, where 
              architectural excellence meets uncompromising comfort. Each residence 
              is meticulously crafted to embody sophistication and tranquility.
            </motion.h2>
            
            <motion.div 
              className="space-y-6 text-lg text-gray-600 leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                Our commitment extends beyond mere accommodation—we create sanctuaries 
                that reflect the discerning tastes of our residents, offering an 
                elevated lifestyle in the heart of the city.
              </p>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-light text-black mb-2">28</div>
                <div className="text-sm text-gray-500 font-light tracking-wide">Floors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-black mb-2">15+</div>
                <div className="text-sm text-gray-500 font-light tracking-wide">Amenities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-black mb-2">2029</div>
                <div className="text-sm text-gray-500 font-light tracking-wide">Completion</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-[3/5] overflow-hidden bg-gray-100 shadow-sm">
              <img
                src="https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_VerticalShot2.png"
                alt="Moraj Silent Valley — award-winning architecture at dusk"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-white p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-2xl font-light text-black mb-2 leading-snug">
                Adjacent to
                <br />
                Nerul Joggers Park
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;