import React from 'react';
import { motion } from 'framer-motion';
import Marquee from "react-fast-marquee";
import { FaReact, FaNodeJs, FaPython, FaLinux, FaWindows } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiJavascript, SiHtml5, SiCss3, SiGit, SiGithub, SiPostman, SiFirebase, SiVercel, SiNextdotjs, SiC, SiFigma, SiNetlify, SiNotion, SiJsonwebtokens } from 'react-icons/si';
import { BiServer } from 'react-icons/bi';
import { VscCode } from 'react-icons/vsc';
import { Fade } from 'react-awesome-reveal';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../../../utils/animations';

const Skills = () => {
  const [ref, inView] = useIntersectionObserver();

  const allSkills = [
    // Frontend skills - blue
    { name: "React.js", level: 90, icon: <FaReact className="text-2xl" />, category: "frontend" },
    { name: "Next.js", level: 75, icon: <SiNextdotjs className="text-2xl" />, category: "frontend" },
    { name: "JavaScript", level: 85, icon: <SiJavascript className="text-2xl" />, category: "frontend" },
    { name: "Tailwind CSS", level: 85, icon: <SiTailwindcss className="text-2xl" />, category: "frontend" },
    { name: "HTML5", level: 90, icon: <SiHtml5 className="text-2xl" />, category: "frontend" },
    { name: "CSS3", level: 85, icon: <SiCss3 className="text-2xl" />, category: "frontend" },
    
    // Backend skills - green
    { name: "Node.js", level: 85, icon: <FaNodeJs className="text-2xl" />, category: "backend" },
    { name: "Express.js", level: 80, icon: <SiExpress className="text-2xl" />, category: "backend" },
    { name: "REST API", level: 85, icon: <BiServer className="text-2xl" />, category: "backend" },
    { name: "JWT", level: 75, icon: <SiJsonwebtokens className="text-2xl" />, category: "backend" },
    
    // Database skills - indigo
    { name: "MongoDB", level: 85, icon: <SiMongodb className="text-2xl" />, category: "database" },
    
    // Programming Languages - purple
    { name: "Python", level: 70, icon: <FaPython className="text-2xl" />, category: "language" },
    { name: "C", level: 65, icon: <SiC className="text-2xl" />, category: "language" },
    
    // Tools skills - gray
    { name: "Git", level: 85, icon: <SiGit className="text-2xl" />, category: "tools" },
    { name: "GitHub", level: 90, icon: <SiGithub className="text-2xl" />, category: "tools" },
    { name: "VS Code", level: 90, icon: <VscCode className="text-2xl" />, category: "tools" },
    { name: "Figma", level: 75, icon: <SiFigma className="text-2xl" />, category: "tools" },
    { name: "Postman", level: 70, icon: <SiPostman className="text-2xl" />, category: "tools" },
    { name: "Firebase", level: 80, icon: <SiFirebase className="text-2xl" />, category: "tools" },
    { name: "Vercel", level: 80, icon: <SiVercel className="text-2xl" />, category: "tools" },
    { name: "Netlify", level: 80, icon: <SiNetlify className="text-2xl" />, category: "tools" },
    { name: "Notion", level: 85, icon: <SiNotion className="text-2xl" />, category: "tools" },
    { name: "Linux", level: 70, icon: <FaLinux className="text-2xl" />, category: "tools" },
    { name: "Windows", level: 85, icon: <FaWindows className="text-2xl" />, category: "tools" }
  ];

  const getColorClass = (category) => {
    switch(category) {
      case 'frontend': return 'bg-blue-900/30';
      case 'backend': return 'bg-green-900/30';
      case 'database': return 'bg-indigo-900/30';
      case 'language': return 'bg-purple-900/30';
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
            skill.category === 'database' ? 'bg-indigo-500' :
            skill.category === 'language' ? 'bg-purple-500' : 'bg-gray-400'
          }`} 
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
      <span className="text-xs mt-1 text-gray-300">{skill.level}%</span>
    </motion.div>
  );

  return (
    <Fade delay={100}>
      <section id="skills" className="bg-black text-white py-16 px-4 sm:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-red-500">
            Technical Skills
          </h2>
        </motion.div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={containerVariants}
          className="space-y-8"
        >
          {/* First row - scroll right to left */}
          <motion.div variants={itemVariants}>
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
          <motion.div variants={itemVariants}>
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
    </Fade>
  );
};

export default Skills;