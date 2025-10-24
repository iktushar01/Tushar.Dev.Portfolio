import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiJavascript, SiHtml5, SiCss3, SiGit, SiGithub, SiPostman, SiFirebase, SiVercel } from 'react-icons/si';

export const skillsData = [
  // Frontend skills - blue
  { name: "React.js", level: 90, icon: <FaReact className="text-2xl" />, category: "frontend" },
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
  
  // Tools skills - gray
  { name: "Git", level: 85, icon: <SiGit className="text-2xl" />, category: "tools" },
  { name: "GitHub", level: 90, icon: <SiGithub className="text-2xl" />, category: "tools" },
  { name: "Postman", level: 70, icon: <SiPostman className="text-2xl" />, category: "tools" },
  { name: "Firebase", level: 80, icon: <SiFirebase className="text-2xl" />, category: "tools" },
  { name: "Vercel", level: 80, icon: <SiVercel className="text-2xl" />, category: "tools" }
];
