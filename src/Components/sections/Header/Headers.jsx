import React from "react";
import {
  FaGithub, FaLinkedin, FaFacebook, FaFileDownload, FaEye,
  FaCode, FaTerminal, FaDatabase, FaReact, FaNodeJs, FaHtml5, FaCss3Alt
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiJavascript } from "react-icons/si";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { photo } from "../../../assets/images";
import resumePdf from "../../../assets/Tushar_Resume.pdf";

const Header = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "Ibrahim_Khalil_Tushar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Advanced Animation Variants
  const floatingVariants = (d, duration = 4) => ({
    animate: {
      y: [0, -15, 0],
      x: [0, 10, 0],
      rotate: [0, 10, -10, 0],
      transition: { duration, repeat: Infinity, delay: d, ease: "easeInOut" }
    }
  });

  const previewCV = () => {
    window.open("https://drive.google.com/file/d/1Ju_WWEwLEy-14gIPQPpNy3Doys7bDMRI/view?usp=sharing", "_blank");
  };

  return (
    <motion.header
      id="home"
      className="bg-[#020202] text-white flex items-center justify-center px-6 py-20 relative overflow-hidden min-h-screen"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
        {/* Radial Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* --- AMBIENT FLOATING ICONS --- */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div variants={floatingVariants(0, 5)} animate="animate" className="absolute top-[15%] left-[5%] text-white/10 text-7xl"><FaReact /></motion.div>
        <motion.div variants={floatingVariants(1, 6)} animate="animate" className="absolute bottom-[20%] left-[10%] text-red-500/10 text-5xl"><SiMongodb /></motion.div>
        <motion.div variants={floatingVariants(0.5, 4)} animate="animate" className="absolute top-[10%] right-[10%] text-blue-500/10 text-6xl"><SiTailwindcss /></motion.div>
        <motion.div variants={floatingVariants(2, 7)} animate="animate" className="absolute bottom-[15%] right-[5%] text-white/10 text-8xl"><FaNodeJs /></motion.div>
        <motion.div variants={floatingVariants(1.5, 5)} animate="animate" className="absolute top-[40%] right-[15%] text-yellow-500/10 text-4xl"><SiJavascript /></motion.div>
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 z-20">

        {/* --- LEFT SIDE: IMAGE WITH HUD FRAME --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative group flex-shrink-0"
        >
          {/* HUD Corner Accents */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-red-600 z-30" />
          <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-white/20 z-30" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-white/20 z-30" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-red-600 z-30" />

          {/* HUD Scanning Line */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.8)] z-30 pointer-events-none"
          />

          <div className="relative z-20 overflow-hidden rounded-lg bg-neutral-900 border border-white/5 shadow-2xl">
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={photo}
              alt="Profile"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
            />
            {/* HUD Data Text Overlay */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-red-500/70 z-30 uppercase tracking-tighter leading-none">
              System.Status: Active<br />
              Loc: 23.8103° N, 90.4125° E<br />
              Dev_Mode: Enabled
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="flex-1 text-center md:text-left">
          <Fade direction="right" triggerOnce>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-red-500 font-mono text-xs mb-6 uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Full Stack Developer
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-4 tracking-tighter leading-none">
              TUSHAR<span className="text-red-600">.</span>
            </h1>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl mb-8 relative overflow-hidden group">
              {/* Decorative background text */}
              <div className="absolute -right-4 -bottom-4 text-7xl font-black text-white/[0.02] pointer-events-none">CODE</div>

              <h3 className="text-2xl font-bold text-gray-100 mb-3">FULL STACK DEVELOPER</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Specialized in building high-performance decentralized architectures and scalable web systems.
                Focusing on <span className="text-white border-b border-red-600">React Ecosystems</span> and <span className="text-white border-b border-red-600">Node Logic</span>.
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#b91c1c" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-full flex items-center gap-3 transition-colors shadow-lg shadow-red-600/20"
              >
                GET RESUME <FaFileDownload />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "#3b82f6", color: "#3b82f6" }}
                whileTap={{ scale: 0.95 }}
                onClick={previewCV}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl flex items-center gap-3 transition-all"
              >
                VIEW CV <FaEye />
              </motion.button>


              <button
                onClick={() => window.open('https://github.com/iktushar01')}
                className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-xl"
              >
                <FaGithub />
              </button>

            </div>
          </Fade>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;