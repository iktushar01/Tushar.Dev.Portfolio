import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaFileDownload, FaTimes, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Photo from "../../assets/photo.png";
import CV from "../../assets/Full_Stack_Developer_Application_Email.pdf";

const Header = () => {
  const [showPreview, setShowPreview] = useState(false);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  // Intersection Observer hooks
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Function to handle download
  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = CV;
    link.download = 'Ibrahim_Khalil_Tushar_Resume.pdf'; // You can set the filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to toggle preview modal
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <motion.header 
      id="home"
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="bg-black text-white flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 py-12 md:py-16 relative overflow-hidden"
    >
      {/* Content container */}
      <div className="container max-w-6xl  mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-0 lg:gap-12 xl:gap-16 z-10">
        {/* Text content */}
        <motion.div 
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center md:text-left max-w-2xl order-2 md:order-1"
        >
          <motion.h1 variants={item} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
            Hello I'm
          </motion.h1>

          <motion.div variants={item} className="mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-red-500">
              Ibrahim Khalil Tushar
            </h2>
            <h3 className="text-lg font-bold sm:text-xl md:text-3xl text-gray-200">
              MERN Stack Developer
            </h3>
          </motion.div>

          <motion.p variants={item} className="text-gray-200 text-base sm:text-lg mb-8">
            I specialize in building full-stack web applications using MongoDB,
            Express.js, React, and Node.js. Focused on creating efficient,
            scalable solutions with clean code architecture.
          </motion.p>

          <motion.div variants={container} className="flex flex-col items-center md:items-start gap-4">
            {/* Social Icons Row */}
            <motion.div variants={item} className="flex gap-4 sm:gap-5">
              <motion.a
                whileHover={{ y: -3 }} target="_blank"
                href="https://github.com/iktushar01"
                className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }} target="_blank"
                href="https://www.linkedin.com/in/iktushar01/"
                className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }} target="_blank"
                href="https://www.facebook.com/ibrahim.khalil.tushar.2024"
                className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </motion.a>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={item} className="flex gap-3 sm:gap-4 flex-wrap justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <span>Download CV</span>
                <FaFileDownload />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePreview}
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-600 text-gray-300 rounded-sm hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                <span>Preview CV</span>
                <FaEye />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image container */}
        <motion.div 
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={imageVariants}
          className="mb-8 md:mb-0 order-1 md:order-2 z-10"
        >
          <div className="overflow-hidden bg-black flex items-center justify-center">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={Photo}
              alt="Ibrahim Khalil Tushar"
              className="w-full md:w-[65%] h-96 md:h-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-full max-h-screen">
            <button 
              onClick={togglePreview}
              className="absolute top-4 right-4 text-white hover:text-red-500 z-50"
              aria-label="Close preview"
            >
              <FaTimes size={24} />
            </button>
            <div className="h-full w-full flex items-center justify-center">
              <iframe 
                src={CV}
                className="w-full h-full border-none"
                title="CV Preview"
              />
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;