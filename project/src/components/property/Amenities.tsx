import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Dumbbell, School as Pool, ShieldCheck, Trees, Utensils, Wifi, ParkingMeter as Parking } from 'lucide-react';

const Amenities: React.FC = () => {
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const amenitiesList = [
    {
      category: 'Health & Wellness',
      items: [
        { icon: <Dumbbell className="w-5 h-5" />, label: 'State-of-the-art fitness center' },
        { icon: <Pool className="w-5 h-5" />, label: 'Rooftop infinity pool' },
        { icon: <Trophy className="w-5 h-5" />, label: 'Yoga and meditation studio' },
      ],
    },
    {
      category: 'Safety & Convenience',
      items: [
        { icon: <ShieldCheck className="w-5 h-5" />, label: '24-hour security and concierge' },
        { icon: <Wifi className="w-5 h-5" />, label: 'Smart home technology' },
        { icon: <Parking className="w-5 h-5" />, label: 'Secure underground parking' },
      ],
    },
    {
      category: 'Leisure & Lifestyle',
      items: [
        { icon: <Trees className="w-5 h-5" />, label: 'Landscaped rooftop garden' },
        { icon: <Utensils className="w-5 h-5" />, label: 'Resident lounge with kitchen' },
        { icon: <Trophy className="w-5 h-5" />, label: 'Private event space' },
      ],
    },
  ];

  return (
    <div ref={ref} className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Building Amenities</h2>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {amenitiesList.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {category.category}
            </h3>
            <ul className="space-y-4">
              {category.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 mt-1">{item.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-blue-900 font-medium text-center">
          Residents enjoy exclusive access to all building amenities included in monthly HOA fees.
        </p>
      </div>
    </div>
  );
};

export default Amenities;