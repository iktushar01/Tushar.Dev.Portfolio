// Shared animation configurations and utilities
export const fadeInConfig = { stiffness: 150, damping: 20 };
export const slideUpConfig = { stiffness: 100, damping: 20 };

// Responsive animation variants
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

// Responsive text animation variants
export const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Responsive card animation variants
export const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Responsive button animation variants
export const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Responsive icon animation variants
export const iconVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0,
    rotate: -180
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  }
};

// Responsive animation delays based on device type
export const getResponsiveDelay = (baseDelay = 0, multiplier = 0.1) => {
  return {
    mobile: baseDelay,
    tablet: baseDelay + (multiplier * 1),
    desktop: baseDelay + (multiplier * 2)
  };
};

// Responsive stagger delays
export const getResponsiveStagger = (baseStagger = 0.05) => {
  return {
    mobile: baseStagger * 0.5,
    tablet: baseStagger * 0.8,
    desktop: baseStagger
  };
};

// Responsive viewport configurations
export const viewportConfig = {
  mobile: { once: true, amount: 0.1 },
  tablet: { once: true, amount: 0.2 },
  desktop: { once: true, amount: 0.3 }
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
