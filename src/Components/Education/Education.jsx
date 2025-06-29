import React from "react";
import { FaGraduationCap, FaSchool, FaLaptopCode } from "react-icons/fa";
import { Motion, spring } from "react-motion";
import { useInView } from "react-intersection-observer";
import uttaraLogo from "../../assets/UttaraUniversityLogo.jpg";
import rcpscLogo from "../../assets/rcpscLogo.png";

const Education = () => {
  // Animation configurations
  const fadeInConfig = { stiffness: 150, damping: 20 };
  const slideUpConfig = { stiffness: 100, damping: 20 };

  // Intersection Observer hooks
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Skill color mapping
  const skillColors = {
    // Web Development
    "React.js": "bg-blue-500 text-white",
    "MERN Stack": "bg-green-600 text-white",
    "Express.js": "bg-gray-700 text-white",
    "Node.js": "bg-green-800 text-white",
    "MongoDB": "bg-green-500 text-white",
    
    // Design
    "HTML": "bg-orange-500 text-white",
    "CSS": "bg-blue-400 text-white",
    "Adobe Photoshop": "bg-blue-700 text-white",
    
    // Office
    "Microsoft Office Suite": "bg-red-600 text-white",
    "Typing": "bg-purple-600 text-white"
  };

  const educationData = [
    {
      id: 1,
      logo: uttaraLogo,
      icon: <FaGraduationCap className="text-red-500 text-2xl" />,
      degree: "Bachelor of Science in Computer Science and Engineering",
      institution: "Uttara University",
      duration: "Jun 2025 (Expected)",
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
    <section className="bg-black text-white py-16 px-4 sm:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Animated Title */}
        <div ref={titleRef}>
          <Motion
            defaultStyle={{ opacity: 0, y: 20 }}
            style={{
              opacity: titleInView ? spring(1, fadeInConfig) : spring(0),
              y: titleInView ? spring(0, slideUpConfig) : spring(20),
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
                <span className="pb-2">Education Journey</span>
              </h2>
            )}
          </Motion>
        </div>

        {/* Timeline with Cards */}
        <div ref={cardsRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 h-full w-0.5 bg-gray-700 transform -translate-x-1/2 hidden lg:block"></div>

          <div className="space-y-12 lg:space-y-16">
            {educationData.map((item, index) => (
              <Motion
                key={item.id}
                defaultStyle={{ opacity: 0, y: 50 }}
                style={{
                  opacity: cardsInView
                    ? spring(1, {
                        ...fadeInConfig,
                        delay: index * 150,
                      })
                    : spring(0),
                  y: cardsInView
                    ? spring(0, {
                        ...slideUpConfig,
                        delay: index * 150,
                      })
                    : spring(50),
                }}
              >
                {({ opacity, y }) => (
                  <div
                    className={`relative flex flex-col lg:flex-row ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center gap-8`}
                    style={{
                      opacity,
                      transform: `translateY(${y}px)`,
                    }}
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

                        <p className="text-gray-300 mb-4">{item.description}</p>

                        <div className="mt-4">
                          <h5 className="text-sm font-semibold text-gray-400 mb-2">
                            SKILLS DEVELOPED:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  skillColors[skill] || "bg-gray-700 text-gray-300"
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Motion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;