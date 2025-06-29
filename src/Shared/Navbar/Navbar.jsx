import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, 
  FaBoxOpen, 
  FaUser, 
  FaTimes, 
  FaBars,
  FaCode,
  FaGraduationCap,
} from "react-icons/fa";

// Import your images properly (make sure these paths are correct)
import Logo from "../../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const navItems = [
    { icon: <FaHome />, label: "Home" },
    { icon: <FaUser />, label: "About" },
    { icon: <FaCode />, label: "Skills" },
    { icon: <FaGraduationCap />, label: "Education" },
    { icon: <FaBoxOpen />, label: "Projects" },
   
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Hamburger icon variants for animation
  const hamburgerVariants = {
    open: { rotate: 90, scale: 1.1 },
    closed: { rotate: 0, scale: 1 }
  };

  return (
    <div className="bg-black sticky top-0 z-50 w-full border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between bg-black">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 sm:h-10 object-contain"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex gap-1 px-2 py-1 rounded-full bg-black border border-gray-200/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ 
                backgroundColor: "#1a1a1a",
                color: "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeItem === item.label 
                  ? "bg-red-600 text-white" 
                  : "text-gray-300 hover:text-white"
              }`}
              title={item.label}
              onClick={() => setActiveItem(item.label)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </motion.button>
          ))}
        </motion.nav>

        {/* Contact Button and Mobile Menu */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block bg-red-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-red-700 transition-all text-sm font-medium"
          >
            Contact
          </motion.button>
          
          {/* Enhanced Hamburger Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-xl focus:outline-none p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={hamburgerVariants}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-72 h-full bg-gray-900 z-50 shadow-2xl md:hidden border-l border-red-600/30 flex flex-col"
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-8 object-contain"
                  />
                </div>
                <motion.button
                  onClick={closeMenu}
                  className="text-xl text-gray-200 hover:text-white p-2"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>
              
              <div className="flex flex-col gap-1 p-4 overflow-y-auto flex-grow">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ 
                      backgroundColor: "#1a1a1a",
                      x: 5
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-all ${
                      activeItem === item.label ? "bg-red-600 text-white" : ""
                    }`}
                    onClick={() => {
                      setActiveItem(item.label);
                      closeMenu();
                    }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-all text-sm font-medium"
                  onClick={closeMenu}
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}