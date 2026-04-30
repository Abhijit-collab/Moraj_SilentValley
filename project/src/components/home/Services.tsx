import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Car, Dumbbell, Trophy, ShoppingBag, Waves } from 'lucide-react';

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security & Privacy",
      description: "Advanced security systems with controlled access and privacy protection"
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Valet Parking",
      description: "Professional valet service with secure underground parking facilities"
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      title: "Wellness Center",
      description: "State-of-the-art fitness center with personal training services"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Sports Facilities",
      description: "Mini cricket, Badminton and Lawn Tennis Courts"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Premium Shopping",
      description: "High-end retail and daily essentials just minutes away"
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: "Infinity Swimming Pool",
      description: "Elegant infinity pool designed for relaxation and skyline views"
    }
  ];

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-16 h-px bg-black mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
            Curated
            <br />
            <span className="font-normal">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Every detail thoughtfully considered to enhance your living experience 
            with unparalleled service and attention
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-6 text-black group-hover:text-gray-600 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-light text-black mb-4 group-hover:text-gray-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;