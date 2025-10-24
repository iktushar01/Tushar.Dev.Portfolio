import { FaGraduationCap, FaSchool } from "react-icons/fa";
import { uttaraUniversityLogo, rcpscLogo } from '../assets/images';

export const educationData = [
  {
    id: 1,
    logo: uttaraUniversityLogo,
    icon: <FaGraduationCap className="text-red-500 text-2xl" />,
    degree: "Bachelor of Science in Computer Science and Engineering",
    institution: "Uttara University",
    duration: "2025 – Expected Graduation: 2029",
    description: "Currently pursuing a Bachelor's in Computer Science and Engineering. Passionate about software development, web technologies, and problem-solving. Actively learning full-stack web development and participating in coding challenges.",
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
    description: "Completed with perfect GPA of 5.00. Developed foundational skills in technology and computer applications.",
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
