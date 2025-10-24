// Shared animation configurations and utilities
export const fadeInConfig = { stiffness: 150, damping: 20 };
export const slideUpConfig = { stiffness: 100, damping: 20 };

// Common animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export const imageVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

// Intersection Observer configuration
export const useInViewConfig = {
  triggerOnce: true,
  threshold: 0.1,
};

export const useInViewConfigStrict = {
  triggerOnce: true,
  threshold: 0.3,
};
