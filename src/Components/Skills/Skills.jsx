import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Marquee from "react-fast-marquee";
import { FaReact, FaNodeJs, FaDatabase, FaTools } from 'react-icons/fa';
import { SiRedux, SiTailwindcss, SiExpress, SiMongodb, SiMongoose, SiJavascript, SiHtml5, SiCss3, SiGit, SiGithub, SiPostman, SiFirebase, SiVercel } from 'react-icons/si';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
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

  const allSkills = [
    // Frontend skills - blue
    { name: "React.js", level: 90, icon: <FaReact className="text-2xl" />, category: "frontend" },
    // { name: "Redux", level: 80, icon: <SiRedux className="text-2xl" />, category: "frontend" },
    { name: "JavaScript", level: 85, icon: <SiJavascript className="text-2xl" />, category: "frontend" },
    { name: "Tailwind CSS", level: 85, icon: <SiTailwindcss className="text-2xl" />, category: "frontend" },
    { name: "HTML5", level: 90, icon: <SiHtml5 className="text-2xl" />, category: "frontend" },
    { name: "CSS3", level: 85, icon: <SiCss3 className="text-2xl" />, category: "frontend" },
    
    // Backend skills - green
    { name: "Node.js", level: 85, icon: <FaNodeJs className="text-2xl" />, category: "backend" },
    { name: "Express.js", level: 80, icon: <SiExpress className="text-2xl" />, category: "backend" },
    { name: "REST API", level: 85, icon: <div className="text-xl font-bold">API</div>, category: "backend" },
    { name: "JWT", level: 75, icon: <div className="text-xl font-bold">JWT</div>, category: "backend" },
    
    // Database skills - indigo
    { name: "MongoDB", level: 85, icon: <SiMongodb className="text-2xl" />, category: "database" },
    // { name: "Mongoose", level: 80, icon: <SiMongoose className="text-2xl" />, category: "database" },
    
    // Tools skills - gray
    { name: "Git", level: 85, icon: <SiGit className="text-2xl" />, category: "tools" },
    { name: "GitHub", level: 90, icon: <SiGithub className="text-2xl" />, category: "tools" },
    { name: "Postman", level: 70, icon: <SiPostman className="text-2xl" />, category: "tools" },
    { name: "Firebase", level: 80, icon: <SiFirebase className="text-2xl" />, category: "tools" },
    { name: "Vercel", level: 80, icon: <SiVercel className="text-2xl" />, category: "tools" }
  ];

  const getColorClass = (category) => {
    switch(category) {
      case 'frontend': return 'bg-blue-900/30';
      case 'backend': return 'bg-green-900/30';
      case 'database': return 'bg-indigo-900/30';
      case 'tools': return 'bg-gray-800/30';
      default: return 'bg-blue-900/30';
    }
  };

  const SkillItem = ({ skill }) => (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center justify-center p-4 m-2 rounded-lg ${getColorClass(skill.category)} min-w-[120px] h-[120px] backdrop-blur-sm`}
    >
      <div className="mb-2 text-white">
        {skill.icon}
      </div>
      <h4 className="text-sm font-medium text-center mb-1 text-white">{skill.name}</h4>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${
            skill.category === 'frontend' ? 'bg-blue-500' :
            skill.category === 'backend' ? 'bg-green-500' :
            skill.category === 'database' ? 'bg-indigo-500' : 'bg-gray-400'
          }`} 
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
      <span className="text-xs mt-1 text-gray-300">{skill.level}%</span>
    </motion.div>
  );

  return (
    <section id="skills" className="bg-black text-white py-16 px-4 sm:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-red-500">
            Technical Skills
          </h2>
        </motion.div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={container}
          className="space-y-8"
        >
          {/* First row - scroll right to left */}
          <motion.div variants={item}>
            <Marquee 
              gradient={false}
              speed={40}
              pauseOnHover={true}
              direction="right"
            >
              {allSkills.map((skill, index) => (
                <SkillItem key={`right-${index}`} skill={skill} />
              ))}
            </Marquee>
          </motion.div>

          {/* Second row - scroll left to right */}
          <motion.div variants={item}>
            <Marquee 
              gradient={false}
              speed={40}
              pauseOnHover={true}
              direction="left"
            >
              {[...allSkills].reverse().map((skill, index) => (
                <SkillItem key={`left-${index}`} skill={skill} />
              ))}
            </Marquee>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;