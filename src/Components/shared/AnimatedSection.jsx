import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../../utils/animations';

const AnimatedSection = ({ 
  children, 
  id, 
  className = "bg-black text-white py-16 px-4 sm:px-8 relative overflow-hidden",
  delay = 100,
  enableFade = true 
}) => {
  const [ref, inView] = useIntersectionObserver();

  const content = (
    <section id={id} className={className}>
      <div className="container mx-auto max-w-6xl relative z-10">
        {children}
      </div>
    </section>
  );

  if (enableFade) {
    return (
      <Fade delay={delay}>
        {content}
      </Fade>
    );
  }

  return content;
};

export default AnimatedSection;
