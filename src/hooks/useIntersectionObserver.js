import { useInView } from "react-intersection-observer";

// Custom hook for intersection observer with common configurations
export const useIntersectionObserver = (options = {}) => {
  const defaultOptions = {
    triggerOnce: true,
    threshold: 0.1,
  };

  return useInView({ ...defaultOptions, ...options });
};

// Predefined configurations for common use cases
export const useTitleObserver = () => useIntersectionObserver({ threshold: 0.3 });
export const useContentObserver = () => useIntersectionObserver({ threshold: 0.2 });
export const useSkillsObserver = () => useIntersectionObserver({ threshold: 0.2 });
