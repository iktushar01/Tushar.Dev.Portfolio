// Technology color mapping for consistent styling across components
export const techColors = {
  // Frontend
  "React.js": "bg-blue-500 text-white",
  React: "bg-blue-500 text-white",
  "Tailwind CSS": "bg-cyan-500 text-white",
  TailwindCSS: "bg-cyan-500 text-white",
  HTML: "bg-orange-500 text-white",
  "HTML5": "bg-orange-500 text-white",
  CSS: "bg-blue-400 text-white",
  "CSS3": "bg-blue-400 text-white",
  JavaScript: "bg-yellow-500 text-black",
  "React Router": "bg-red-500 text-white",
  
  // Backend
  "Node.js": "bg-green-600 text-white",
  "Express.js": "bg-gray-500 text-white",
  Express: "bg-gray-500 text-white",
  "REST API": "bg-purple-500 text-white",
  JWT: "bg-indigo-500 text-white",
  
  // Database
  MongoDB: "bg-green-700 text-white",
  "MERN Stack": "bg-green-600 text-white",
  
  // Tools & Services
  Firebase: "bg-yellow-500 text-black",
  "Firebase Auth": "bg-orange-500 text-white",
  DaisyUI: "bg-purple-500 text-white",
  Git: "bg-gray-700 text-white",
  GitHub: "bg-gray-800 text-white",
  Postman: "bg-orange-600 text-white",
  Vercel: "bg-black text-white",
  
  // Design
  "Adobe Photoshop": "bg-blue-700 text-white",
  
  // Office
  "Microsoft Office Suite": "bg-red-600 text-white",
  Typing: "bg-purple-600 text-white",
};

export const getTechColor = (tech) => {
  return techColors[tech] || "bg-gray-700 text-white";
};
