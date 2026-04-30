import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Home, BedDouble, Bath, Square as SquareFoot, Car, Building, Zap, DollarSign } from 'lucide-react';

const PropertySpecs: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  return (
    <div ref={ref} className="mb-12">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-gray-900 mb-6 relative"
      >
        Property Overview
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent-dark origin-left"
          style={{ width: '60px' }}
        />
      </motion.h2>
      
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <SpecItem
            variants={itemVariants}
            icon={<BedDouble className="w-5 h-5 text-blue-900" />}
            label="Bedrooms"
            value="2-4"
            delay={0}
          />
          <SpecItem
            variants={itemVariants}
            icon={<Bath className="w-5 h-5 text-blue-900" />}
            label="Bathrooms"
            value="2-3"
            delay={0.1}
          />
          <SpecItem
            variants={itemVariants}
            icon={<SquareFoot className="w-5 h-5 text-blue-900" />}
            label="Area"
            value="1,200-2,800 sq ft"
            delay={0.2}
          />
          <SpecItem
            variants={itemVariants}
            icon={<Car className="w-5 h-5 text-blue-900" />}
            label="Parking"
            value="1-2 spaces"
            delay={0.3}
          />
          <SpecItem
            variants={itemVariants}
            icon={<Building className="w-5 h-5 text-blue-900" />}
            label="Year Built"
            value="2024"
            delay={0.4}
          />
          <SpecItem
            variants={itemVariants}
            icon={<Home className="w-5 h-5 text-blue-900" />}
            label="Property Type"
            value="Luxury Condos"
            delay={0.5}
          />
          <SpecItem
            variants={itemVariants}
            icon={<Zap className="w-5 h-5 text-blue-900" />}
            label="Energy Rating"
            value="A+"
            delay={0.6}
          />
          <SpecItem
            variants={itemVariants}
            icon={<DollarSign className="w-5 h-5 text-blue-900" />}
            label="Starting Price"
            value="$850,000"
            delay={0.7}
          />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.h3 
          className="text-xl font-semibold text-gray-900 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Description
        </motion.h3>
        <motion.div 
          className="prose max-w-none text-gray-600"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.p 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Moraj Silent Valley offers an unparalleled living experience in the heart of the city. Our luxury condominiums blend contemporary design with exceptional craftsmanship to create spaces that are both sophisticated and welcoming.
          </motion.p>
          <motion.p 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Each residence features premium finishes including Italian marble countertops, engineered hardwood flooring, floor-to-ceiling windows, and smart home technology. The open-concept layouts maximize both space and natural light, while providing stunning views of the city skyline.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Residents enjoy access to a comprehensive suite of amenities including a state-of-the-art fitness center, rooftop infinity pool, resident lounge, and 24-hour concierge service. The building's prime location provides easy access to shopping, dining, entertainment, and major transportation hubs.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

interface SpecItemProps {
  variants: any;
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}

const SpecItem: React.FC<SpecItemProps> = ({ variants, icon, label, value, delay }) => {
  return (
    <motion.div
      variants={variants}
      className="flex flex-col items-center text-center p-3 group cursor-pointer"
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="bg-blue-50 p-3 rounded-full mb-3 group-hover:bg-blue-100 transition-all duration-300"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10">
          {icon}
        </div>
      </motion.div>
      <motion.span 
        className="text-sm text-gray-500 mb-1 group-hover:text-gray-700 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {label}
      </motion.span>
      <motion.span 
        className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
};

export default PropertySpecs;