import React from "react";
import { FaCode, FaPaintBrush, FaBook } from "react-icons/fa";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { useTitleObserver, useContentObserver, useSkillsObserver } from "../../../hooks/useIntersectionObserver";
import { textVariants, cardVariants } from "../../../utils/animations";
import { useResponsiveAnimation } from "../../../hooks/useResponsiveAnimation";

const AboutMe = () => {
  // Intersection Observer hooks for scroll-triggered animations
  const [titleRef, titleInView] = useTitleObserver();
  const [contentRef, contentInView] = useContentObserver();
  const [skillsRef, skillsInView] = useSkillsObserver();
  const { getResponsiveDelay, getResponsiveDuration } = useResponsiveAnimation();

  return (
    <Fade delay={100}>
      <section
        id="about"
        className="bg-black text-white py-16 px-4 sm:px-8 relative overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Animated Title */}
          <div ref={titleRef}>
            <motion.h2
              variants={textVariants}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              transition={{ delay: getResponsiveDelay(0.1), duration: getResponsiveDuration(0.6) }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-red-500"
            >
              <span className="pb-2">About Me</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content with staggered animations */}
            <div ref={contentRef} className="space-y-6">
              {[
                {
                  icon: (
                    <FaCode className="text-red-500 text-2xl mt-1 flex-shrink-0" />
                  ),
                  title: "My Coding Journey",
                  content:
                    "My programming adventure began at college when I built my first website using a WordPress theme. Since then, I've fallen in love with the problem-solving aspect of development. Currently specializing in the MERN stack, I enjoy creating full-stack applications that solve real-world problems. What excites me most is learning new technologies and pushing the boundaries of what I can build.",
                },
                {
                  icon: (
                    <FaPaintBrush className="text-red-500 text-2xl mt-1 flex-shrink-0" />
                  ),
                  title: "Creative Problem Solver",
                  content:
                    "I thrive on projects that require both technical skills and creative thinking. Whether it's designing intuitive user interfaces or architecting efficient backend systems, I approach each challenge with enthusiasm. My happy place? That moment when all the components come together to create something greater than the sum of its parts.",
                },
                {
                  icon: (
                    <FaBook className="text-red-500 text-2xl mt-1 flex-shrink-0" />
                  ),
                  title: "Beyond the Keyboard",
                  content:
                    "When I'm not coding, you'll find me watching movies, experimenting with playing online game like valorant , Free Fire, PUBG. I believe diverse interests fuel creativity in programming. I'm also passionate about tech education and regularly mentor aspiring developers in my community.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={textVariants}
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  transition={{ 
                    delay: getResponsiveDelay(index * 0.1), 
                    duration: getResponsiveDuration(0.6) 
                  }}
                  className="flex items-start gap-4"
                >
                  {item.icon}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills visualization with animation */}
            <div ref={skillsRef}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={skillsInView ? "visible" : "hidden"}
                transition={{ delay: getResponsiveDelay(0.2), duration: getResponsiveDuration(0.6) }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-red-500">
                  My Approach
                </h3>
                <ul className="space-y-4">
                  {[
                    { skill: "Clean Code", level: 90 },
                    { skill: "Problem Solving", level: 80 },
                    { skill: "UI/UX Design", level: 90 },
                    { skill: "Continuous Learning", level: 100 },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={skillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ 
                        delay: getResponsiveDelay(index * 0.1 + 0.3), 
                        duration: getResponsiveDuration(0.5) 
                      }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">
                          {item.skill}
                        </span>
                        <span className="text-red-500">
                          {item.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-red-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={skillsInView ? { width: `${item.level}%` } : { width: 0 }}
                          transition={{ 
                            delay: getResponsiveDelay(index * 0.1 + 0.5), 
                            duration: 1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default AboutMe;