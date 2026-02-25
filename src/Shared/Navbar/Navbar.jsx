import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FaHome,
  FaBoxOpen,
  FaUser,
  FaTimes,
  FaBars,
  FaCode,
  FaGraduationCap,
  FaEnvelope,
  FaAward,
  FaArrowRight
} from "react-icons/fa";
import { logo } from "../../assets/images";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { icon: <FaHome />, label: "Home", id: "home" },
    { icon: <FaUser />, label: "About", id: "about" },
    { icon: <FaCode />, label: "Skills", id: "skills" },
    { icon: <FaGraduationCap />, label: "Education", id: "education" },
    { icon: <FaBoxOpen />, label: "Projects", id: "projects" },
    { icon: <FaAward />, label: "Certificates", id: "certificates" },
    { icon: <FaEnvelope />, label: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20, // Small buffer
        behavior: "smooth"
      });
      setActiveItem(id);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navItems.map(item => document.getElementById(item.id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= 300;
      });
      
      if (currentSection) setActiveItem(currentSection.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu Animation Variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    closed: { opacity: 0, x: 20 }
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
          scrolled 
            ? "py-3 bg-black/60 backdrop-blur-xl border-b border-white/10" 
            : "py-5 bg-transparent"
        }`}
      >
        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="relative">
              <img src={logo} alt="Logo" className="h-10 w-auto z-10 relative" />
              <div className="absolute inset-0 bg-red-600 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
            <span className="text-white font-bold tracking-widest text-xl hidden sm:block">
              PORTFOLIO<span className="text-red-600">.</span>
            </span>
          </motion.div>

          {/* Universal Hamburger Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection("contact")}
              className="hidden md:flex px-5 py-2 border border-white/20 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Let's Talk
            </button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="relative group p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors"
            >
              <div className="flex flex-col gap-1.5 items-end">
                <span className="w-8 h-[2px] bg-white group-hover:bg-red-500 transition-colors" />
                <span className="w-5 h-[2px] bg-white group-hover:bg-red-500 transition-colors" />
                <span className="w-7 h-[2px] bg-white group-hover:bg-red-500 transition-colors" />
              </div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70]"
            />

            {/* Side Drawer */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-neutral-950 border-l border-white/10 z-[80] p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-gray-500">Navigation</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:rotate-90 transition-transform duration-300 text-white text-2xl"
                >
                  <FaTimes />
                </button>
              </div>

              <motion.div 
                className="flex flex-col gap-6"
                variants={itemVariants}
              >
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 20 }
                    }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`group flex items-center justify-between w-full text-left transition-all ${
                        activeItem === item.id ? "text-red-500" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-gray-600">0{idx + 1}</span>
                        <span className="text-3xl font-light tracking-tight">{item.label}</span>
                      </div>
                      <FaArrowRight className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all`} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}