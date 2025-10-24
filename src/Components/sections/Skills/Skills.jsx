import React from 'react';
import { motion } from 'framer-motion';
import Marquee from "react-fast-marquee";
import { Fade } from 'react-awesome-reveal';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../../../utils/animations';
import { skillsData } from '../../../data/skills.jsx';

const Skills = () => {
  const [ref, inView] = useIntersectionObserver();

  const allSkills = skillsData;

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
    id='skills'
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
    <Fade delay={100}>
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