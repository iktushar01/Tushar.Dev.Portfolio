import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020202] text-gray-500 py-12 border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* LEFT: System Status */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">
                System_Live // v2.0.26
              </span>
            </div>
            <p className="text-sm font-light tracking-widest text-white/80 uppercase">
              © {currentYear} <span className="text-red-600 font-bold">IBRAHIM KHALIL TUSHAR</span>
            </p>
          </div>

          {/* CENTER: Social Cluster */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-6">
              {[
                { icon: <FaGithub />, link: "https://github.com/iktushar01" },
                
                { icon: <FaFacebook />, link: "https://facebook.com/iktushar01" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  whileHover={{ y: -3, color: "#dc2626" }}
                  className="text-xl transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-[10px] font-mono tracking-tighter opacity-40">MERN_STACK_ENGINEER // DHAKA_BD</p>
          </div>

          {/* RIGHT: Time & Top Button */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="text-right font-mono">
              <span className="text-[10px] block text-gray-600 uppercase tracking-widest">Runtime_Clock</span>
              <span className="text-lg text-white font-bold">{formatTime(currentTime)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#dc2626" }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-3 bg-white/5 border border-white/10 rounded-lg transition-all"
            >
              <FaArrowUp className="text-white" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
            <p className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.8em]">
                Built_with_React_and_Framer_Motion
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;