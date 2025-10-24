import React from "react";
import { FaGraduationCap, FaSchool } from "react-icons/fa";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { useTitleObserver, useContentObserver } from "../../hooks/useIntersectionObserver";
import { textVariants, cardVariants } from "../../utils/animations";
import { getTechColor } from "../../utils/techColors";
import { uttaraUniversityLogo, rcpscLogo } from "../../assets/images";
import { useResponsiveAnimation } from "../../hooks/useResponsiveAnimation";

const Education = () => {
  // Intersection Observer hooks
  const [titleRef, titleInView] = useTitleObserver();
  const [cardsRef, cardsInView] = useContentObserver();
  const { getResponsiveDelay, getResponsiveDuration } = useResponsiveAnimation();

  const educationData = [
    {
      id: 1,
      logo: uttaraUniversityLogo,
      icon: <FaGraduationCap className="text-red-500 text-2xl" />,
      degree: "Bachelor of Science in Computer Science and Engineering",
      institution: "Uttara University",
      duration: "2025 – Expected Graduation: 2029",
      description:
        "Currently pursuing a Bachelor's in Computer Science and Engineering. Passionate about software development, web technologies, and problem-solving. Actively learning full-stack web development and participating in coding challenges.",
      skills: ["React.js", "MongoDB", "Express.js", "Node.js", "MERN Stack"],
      current: true,
    },
    {
      id: 2,
      logo: rcpscLogo,
      icon: <FaSchool className="text-red-500 text-2xl" />,
      degree: "Higher Secondary Certificate (HSC), Science",
      institution: "Rajendrupur Cantonment Public School & College",
      duration: "Feb 2023 - Aug 2024",
      description:
        "Completed with perfect GPA of 5.00. Developed foundational skills in technology and computer applications.",
      skills: [
        "HTML",
        "CSS",
        "Adobe Photoshop",
        "Microsoft Office Suite",
        "Typing",
      ],
      current: false,
    },
  ];

  return (
    <Fade delay={100}>
      <section
        id="education"
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
              <span className="pb-2">Education Journey</span>
            </motion.h2>
          </div>

          {/* Timeline with Cards */}
          <div ref={cardsRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 h-full w-0.5 bg-gray-700 transform -translate-x-1/2 hidden lg:block"></div>

            <div className="space-y-12 lg:space-y-16">
              {educationData.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate={cardsInView ? "visible" : "hidden"}
                  transition={{ 
                    delay: getResponsiveDelay(index * 0.15), 
                    duration: getResponsiveDuration(0.6) 
                  }}
                  className={`relative flex flex-col lg:flex-row ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8`}
                >
                      {/* Institution Logo */}
                      <div className="lg:w-1/3 flex justify-center lg:justify-end">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center overflow-hidden">
                          <img
                            src={item.logo}
                            alt={`${item.institution} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Education Card */}
                      <div className="lg:w-2/3">
                        <div
                          className={`relative bg-gray-800 p-6 rounded-lg ${
                            item.current ? "ring-2 ring-red-500" : ""
                          }`}
                        >
                          {item.current && (
                            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              Current
                            </div>
                          )}

                          <div className="flex items-start gap-4 mb-4">
                            {item.icon}
                            <div>
                              <h3 className="text-xl font-bold text-red-500">
                                {item.degree}
                              </h3>
                              <h4 className="text-lg font-semibold">
                                {item.institution}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {item.duration}
                              </p>
                            </div>
                          </div>

                          <p className="text-gray-300 mb-4">
                            {item.description}
                          </p>

                          <div className="mt-4">
                            <h5 className="text-sm font-semibold text-gray-400 mb-2">
                              SKILLS DEVELOPED:
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className={`px-3 py-1 rounded-full text-sm ${getTechColor(skill)}`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default Education;
