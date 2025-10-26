// Certificate images
import programingHero from '../assets/CertificatesImg/programingHero.png';
import webflow from '../assets/CertificatesImg/webflow.png';

// Certificate data
export const certificatesData = [
  {
    id: 1,
    title: "Complete Web Development Course with Jhankar Mahbub",
    issuer: "Programming Hero",
    date: "2024",
    description: "Successfully completed an intensive full-stack web development bootcamp covering React.js, Node.js, Express.js, MongoDB, and modern JavaScript. Gained hands-on experience building real-world projects and mastering industry-standard best practices.",
    image: programingHero,
    skills: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "REST API", "Firebase", "JWT"],
    credentialUrl: "https://web.programming-hero.com/", // Update with actual credential URL if available
  },
  {
    id: 2,
    title: "Webflow Professional Certification",
    issuer: "Webflow",
    date: "2023",
    description: "Certified in Webflow platform mastery, demonstrating proficiency in no-code web design, responsive layouts, CMS integration, and creating production-ready websites with advanced interactions and animations.",
    image: webflow,
    skills: ["Webflow", "Web Design", "Responsive Design", "CMS", "UI/UX", "No-Code"],
    credentialUrl: "https://webflow.com/", // Update with actual credential URL if available
  },
];

