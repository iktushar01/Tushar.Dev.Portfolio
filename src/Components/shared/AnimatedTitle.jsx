import React from 'react';
import { motion } from 'framer-motion';
import { useTitleObserver } from '../../hooks/useIntersectionObserver';
import { fadeInConfig, slideUpConfig } from '../../utils/animations';

const AnimatedTitle = ({ 
  children, 
  className = "text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-red-500",
  delay = 0 
}) => {
  const [titleRef, titleInView] = useTitleObserver();

  return (
    <div ref={titleRef}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          ...fadeInConfig,
          delay: delay * 0.1 
        }}
        className={className}
      >
        {children}
      </motion.h2>
    </div>
  );
};

export default AnimatedTitle;
