import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaBoxOpen,
  FaUser,
  FaTimes,
  FaBars,
  FaCode,
  FaGraduationCap,
  FaEnvelope
} from "react-icons/fa";
import Logo from "../../assets/logo.png";

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  const navItems = [
    { icon: <FaHome size={16} />, label: "Home", id: "home" },
    { icon: <FaUser size={16} />, label: "About", id: "about" },
    { icon: <FaCode size={16} />, label: "Skills", id: "skills" },
    { icon: <FaGraduationCap size={16} />, label: "Education", id: "education" },
    { icon: <FaBoxOpen size={16} />, label: "Projects", id: "projects" },
  ];

  const contactItem = { icon: <FaEnvelope size={16} />, label: "Contact", id: "contact" };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // No navbar height offset for mobile
      const offsetPosition = element.offsetTop;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveItem(id);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrolled(window.scrollY > 10);
      
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px 0px 0px', // No offset for mobile
        threshold: 0.3
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id);
          }
        });
      }, observerOptions);

      [...navItems, contactItem].forEach(item => {
        const section = document.getElementById(item.id);
        if (section) observer.observe(section);
      });

      return () => {
        [...navItems, contactItem].forEach(item => {
          const section = document.getElementById(item.id);
          if (section) observer.unobserve(section);
        });
      };
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div 
      ref={navbarRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14"> {/* Adjusted height */}
          {/* Logo - Left */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-auto cursor-pointer" // Adjusted logo size
              onClick={() => scrollToSection("home")}
            />
          </motion.div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2"> {/* Increased space between items */}
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ 
                    y: -2,
                    color: "#ffffff"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                    activeItem === item.id
                      ? "text-white bg-red-600/90 shadow-md"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`} // Increased padding and font size
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Contact Button - Right */}
          <div className="hidden md:flex items-center">
            <motion.button
              whileHover={{ 
                y: -2,
                color: "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all bg-red-600 ${
                activeItem === contactItem.id
                  ? "text-white bg-red-600/90 shadow-md"
                  : "text-gray-100 hover:text-white hover:bg-gray-800/50"
              }`} // Increased padding and font size
              onClick={() => scrollToSection(contactItem.id)}
            >
              {contactItem.icon}
              <span>{contactItem.label}</span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-label="Main menu"
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <FaTimes className="block h-5 w-5" /> // Adjusted icon size
              ) : (
                <FaBars className="block h-5 w-5" /> // Adjusted icon size
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="px-3 pt-2 pb-4 space-y-2"> {/* Increased padding and spacing */}
              {[...navItems, contactItem].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-base font-medium ${
                    activeItem === item.id
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`} // Increased padding and font size
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="mr-3">{item.icon}</span> {/* Increased icon margin */}
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}