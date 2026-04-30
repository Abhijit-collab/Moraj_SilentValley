import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '../../styles/theme';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'stagger';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fadeUp',
}) => {
  const getAnimation = () => {
    switch (animation) {
      case 'fadeIn':
        return {
          ...animations.fadeIn,
          transition: { ...animations.fadeIn.transition, delay },
        };
      case 'stagger':
        return animations.stagger.container;
      default:
        return {
          ...animations.fadeUp,
          transition: { ...animations.fadeUp.transition, delay },
        };
    }
  };

  return (
    <motion.div
      className={className}
      {...getAnimation()}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div className={className} {...animations.stagger.item}>
    {children}
  </motion.div>
);

export default AnimatedSection; 