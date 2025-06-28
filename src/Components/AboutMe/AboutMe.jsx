import React from "react";
import { FaCode, FaPaintBrush, FaBook, FaFutbol } from "react-icons/fa";
import { Motion, spring } from "react-motion";
import { useInView } from "react-intersection-observer";

const AboutMe = () => {
  // Animation configurations
  const fadeInConfig = { stiffness: 150, damping: 20 };
  const slideUpConfig = { stiffness: 100, damping: 20 };
  
  // Intersection Observer hooks for scroll-triggered animations
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-black text-white py-16 px-4 sm:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Animated Title */}
        <div ref={titleRef}>
          <Motion
            defaultStyle={{ opacity: 0, y: 20 }}
            style={{
              opacity: titleInView ? spring(1, fadeInConfig) : spring(0),
              y: titleInView ? spring(0, slideUpConfig) : spring(20)
            }}
          >
            {({ opacity, y }) => (
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-red-500"
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                }}
              >
                <span className="border-b-2 border-red-600 pb-2">About Me</span>
              </h2>
            )}
          </Motion>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content with staggered animations */}
          <div ref={contentRef} className="space-y-6">
            {[
              {
                icon: <FaCode className="text-red-500 text-2xl mt-1 flex-shrink-0" />,
                title: "My Coding Journey",
                content: "My programming adventure began at college when I built my first website using a WordPress theme. Since then, I've fallen in love with the problem-solving aspect of development. Currently specializing in the MERN stack, I enjoy creating full-stack applications that solve real-world problems. What excites me most is learning new technologies and pushing the boundaries of what I can build."
              },
              {
                icon: <FaPaintBrush className="text-red-500 text-2xl mt-1 flex-shrink-0" />,
                title: "Creative Problem Solver",
                content: "I thrive on projects that require both technical skills and creative thinking. Whether it's designing intuitive user interfaces or architecting efficient backend systems, I approach each challenge with enthusiasm. My happy place? That moment when all the components come together to create something greater than the sum of its parts."
              },
              {
                icon: <FaBook className="text-red-500 text-2xl mt-1 flex-shrink-0" />,
                title: "Beyond the Keyboard",
                content: "When I'm not coding, you'll find me watching movies, experimenting with playing online game like valorant , Free Fire, PUBG. I believe diverse interests fuel creativity in programming. I'm also passionate about tech education and regularly mentor aspiring developers in my community."
              }
            ].map((item, index) => (
              <Motion
                key={index}
                defaultStyle={{ opacity: 0, x: -20 }}
                style={{
                  opacity: contentInView ? spring(1, {
                    ...fadeInConfig,
                    delay: index * 100
                  }) : spring(0),
                  x: contentInView ? spring(0, {
                    ...slideUpConfig,
                    delay: index * 100
                  }) : spring(-20)
                }}
              >
                {({ opacity, x }) => (
                  <div 
                    className="flex items-start gap-4"
                    style={{
                      opacity,
                      transform: `translateX(${x}px)`
                    }}
                  >
                    {item.icon}
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  </div>
                )}
              </Motion>
            ))}
          </div>

          {/* Skills visualization with animation */}
          <div ref={skillsRef}>
            <Motion
              defaultStyle={{ opacity: 0, scale: 0.95 }}
              style={{
                opacity: skillsInView ? spring(1, fadeInConfig) : spring(0),
                scale: skillsInView ? spring(1, slideUpConfig) : spring(0.95)
              }}
            >
              {({ opacity, scale }) => (
                <div 
                  className="bg-gray-800 p-8 rounded-lg border border-gray-700"
                  style={{
                    opacity,
                    transform: `scale(${scale})`
                  }}
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
                      <Motion
                        key={index}
                        defaultStyle={{ width: 0 }}
                        style={{
                          width: skillsInView ? spring(item.level, {
                            stiffness: 150,
                            damping: 20,
                            delay: index * 100
                          }) : spring(0)
                        }}
                      >
                        {({ width }) => (
                          <li>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{item.skill}</span>
                              <span className="text-red-500">{Math.round(width)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-red-600 h-2.5 rounded-full"
                                style={{ width: `${width}%` }}
                              ></div>
                            </div>
                          </li>
                        )}
                      </Motion>
                    ))}
                  </ul>
                </div>
              )}
            </Motion>
          </div>
        </div>
      </div>

      {/* Animated bottom border */}
      <Motion
        defaultStyle={{ scaleX: 0 }}
        style={{ scaleX: spring(1, { stiffness: 60, damping: 15 }) }}
      >
        {({ scaleX }) => (
          <div 
            className="absolute bottom-0 left-0 w-full h-1 bg-red-600"
            style={{ transform: `scaleX(${scaleX})`, transformOrigin: 'left' }}
          ></div>
        )}
      </Motion>
    </section>
  );
};

export default AboutMe;