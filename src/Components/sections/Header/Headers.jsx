import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaFileDownload,
  FaEye,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import { containerVariants, itemVariants, imageVariants, textVariants, buttonVariants, iconVariants } from "../../../utils/animations";
import { useResponsiveAnimation } from "../../../hooks/useResponsiveAnimation";
import { photo } from "../../../assets/images";

const Header = () => {
  // Intersection Observer hooks
  const [ref, inView] = useIntersectionObserver();
  const { deviceType, isReducedMotion, getResponsiveDelay, getResponsiveScale, getResponsiveDuration } = useResponsiveAnimation();

  // Function to handle download
  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = "/src/assets/Tushar Resume(2).pdf";
    link.download = "Ibrahim_Khalil_Tushar_Resume.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Drive link for preview
  const previewCV = () => {
    window.open(
      "https://drive.google.com/file/d/1bRuVbnABTWPNAQPVsg7pQSnKd9-5YbKy/view",
      "_blank"
    );
  };

  return (
    <Fade delay={100}>
      <motion.header
        id="home"
        initial="hidden"
        animate="show"
        className="bg-black text-white flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 py-12 md:py-20 relative overflow-hidden min-h-screen"
      >
        {/* Content container */}
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-12 lg:gap-16 z-10">
          {/* Text content */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center md:text-left max-w-2xl order-2 md:order-1 w-full"
          >
              <motion.h1
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: getResponsiveDelay(0.1), duration: getResponsiveDuration(0.6) }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white"
              >
                Hello I'm
              </motion.h1>

              <motion.div 
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: getResponsiveDelay(0.2), duration: getResponsiveDuration(0.6) }}
                className="mb-6"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-red-500">
                  Ibrahim Khalil Tushar
                </h2>
                <h3 className="text-lg font-bold sm:text-xl md:text-3xl text-gray-200">
                  MERN Stack Developer
                </h3>
              </motion.div>

              <motion.p
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: getResponsiveDelay(0.4), duration: getResponsiveDuration(0.6) }}
                className="text-gray-200 text-base sm:text-lg mb-8 leading-relaxed"
              >
                I specialize in building full-stack web applications using
                MongoDB, Express.js, React, and Node.js. Focused on creating
                efficient, scalable solutions with clean code architecture.
              </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center md:items-start gap-4"
            >
                {/* Social Icons Row */}
                <motion.div 
                  variants={itemVariants}
                  className="flex gap-4 sm:gap-5"
                >
                  <motion.a
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    whileHover={{ 
                      y: -3, 
                      scale: 1.15,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    href="https://github.com/iktushar01"
                    className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    whileHover={{ 
                      y: -3, 
                      scale: 1.15,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    href="https://www.linkedin.com/in/iktushar01/"
                    className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    whileHover={{ 
                      y: -3, 
                      scale: 1.15,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    href="https://www.facebook.com/ibrahim.khalil.tushar.2024"
                    className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </motion.a>
                </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 sm:gap-4 flex-wrap justify-center md:justify-start"
              >
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  <span>Download CV</span>
                  <FaFileDownload />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 10px 25px rgba(107, 114, 128, 0.3)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={previewCV}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-sm hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
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
            animate="show"
            variants={imageVariants}
            className="mb-8 md:mb-0 order-1 md:order-2 z-10 w-full md:w-auto flex justify-center"
          >
            <div className="relative overflow-hidden rounded-lg flex items-center justify-center">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={photo}
                alt="Ibrahim Khalil Tushar"
                className="w-full max-w-md md:max-w-lg h-auto object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </motion.header>
    </Fade>
  );
};

export default Header;
