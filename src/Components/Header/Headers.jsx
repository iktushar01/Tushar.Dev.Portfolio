import React from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaFileDownload, FaEnvelope } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-black text-white flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 py-12 md:py-16 relative overflow-hidden">
      {/* Decorative red elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-red-600 opacity-10 blur-xl"></div>

      {/* Content container */}
      <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-0 lg:gap-12 xl:gap-16 z-10">
        {/* Text content */}
        <div className="text-center md:text-left max-w-2xl order-2 md:order-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
            Hello I'm
          </h1>

          <div className="mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-red-500">
              Ibrahim Khalil Tushar
            </h2>
            <p className="text-lg font-bold sm:text-xl md:text-2xl text-gray-300">
              MERN Stack Developer
            </p>
          </div>

          <p className="text-gray-200 text-base sm:text-lg mb-8">
            I specialize in building full-stack web applications using MongoDB,
            Express.js, React, and Node.js. Focused on creating efficient,
            scalable solutions with clean code architecture.
          </p>

          <div className="flex flex-col items-center md:items-start gap-4">
            {/* Social Icons Row */}
            <div className="flex gap-4 sm:gap-5">
              <a
                href="#github"
                className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="#linkedin"
                className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="#facebook"
                className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <span>Download Resume</span>
                <FaFileDownload />
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-600 text-gray-300 rounded-sm hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                <span>Contact Me</span>
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Image container */}
        <div className="mb-8 md:mb-0 order-1 md:order-2 z-10">
          <div className="overflow-hidden bg-black flex items-center justify-center">
            <img
              src="/src/assets/photo.png"
              alt="Ibrahim Khalil Tushar"
              className="w-full md:w-[65%] h-96 md:h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></div>
    </header>
  );
};

export default Header;