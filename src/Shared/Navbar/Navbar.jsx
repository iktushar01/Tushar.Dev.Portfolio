import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaBoxOpen, FaUser, FaCog, FaTimes, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const navItems = [
    { icon: <FaHome />, label: "Home" },
    { icon: <FaBoxOpen />, label: "Projects" },
    { icon: <FaUser />, label: "About" },
    { icon: <FaCog />, label: "Settings" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between bg-black text-white border-b border-red-600">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-12 object-contain"
            />
            <img
              src="/src/assets/text-logo2.png"
              alt="Brand Name"
              className="w-24 object-contain hidden sm:block"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex gap-1 px-2 py-1 rounded-full bg-black border border-gray-800"
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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeItem === item.label 
                  ? "bg-red-600 text-white" 
                  : "text-gray-300 hover:text-white"
              }`}
              title={item.label}
              onClick={() => setActiveItem(item.label)}
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
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
            className="hidden md:block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-all text-sm font-medium"
          >
            Contact
          </motion.button>
          <button
            onClick={toggleMenu}
            className="md:hidden text-xl focus:outline-none text-gray-300 hover:text-white"
          >
            <FaBars />
          </button>
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
              className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden"
              onClick={closeMenu}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-64 h-full bg-black z-50 shadow-2xl md:hidden border-l border-red-600"
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <img
                    src="/src/assets/logo.png"
                    alt="Logo"
                    className="h-8 object-contain"
                  />
                  <img
                    src="/src/assets/text-logo2.png"
                    alt="Brand Name"
                    className="w-20 object-contain"
                  />
                </div>
                <button
                  onClick={closeMenu}
                  className="text-xl text-gray-200 hover:text-white p-2"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex flex-col gap-1 p-2 mt-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ backgroundColor: "#1a1a1a" }}
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
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 mx-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-all text-sm font-medium"
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