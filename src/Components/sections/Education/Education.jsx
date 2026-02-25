import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaGraduationCap, FaSchool } from "react-icons/fa";
import { FiCalendar, FiAward, FiZap } from "react-icons/fi";

// ─── Replace with your real imports ──────────────────────────────────────────
import { uttaraUniversityLogo, rcpscLogo } from '../../../assets/images';
import { educationData } from '../../../data/education.jsx';
// import { getTechColor } from '../../../utils/techColors';


const TECH_COLORS = {
  "React.js":               "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
  MongoDB:                  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  "Express.js":             "bg-gray-500/10 text-gray-300 border border-gray-500/30",
  "Node.js":                "bg-green-500/10 text-green-400 border border-green-500/30",
  "MERN Stack":             "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  HTML:                     "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  CSS:                      "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  "Adobe Photoshop":        "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",
  "Microsoft Office Suite": "bg-red-500/10 text-red-400 border border-red-500/30",
  Typing:                   "bg-purple-500/10 text-purple-400 border border-purple-500/30",
  default:                  "bg-red-500/10 text-red-400 border border-red-500/30",
};
const getTechColor = (t) => TECH_COLORS[t] || TECH_COLORS.default;

// ─── Glitch Text ──────────────────────────────────────────────────────────────
const GlitchText = ({ children }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{children}</span>
    <span aria-hidden className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-50 translate-x-[2px] -translate-y-[1px] pointer-events-none select-none"
      style={{ clipPath: "polygon(0 25%, 100% 25%, 100% 45%, 0 45%)" }}>{children}</span>
    <span aria-hidden className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-50 -translate-x-[2px] translate-y-[1px] pointer-events-none select-none"
      style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 85%, 0 85%)" }}>{children}</span>
  </span>
);

// ─── Tilt Card ────────────────────────────────────────────────────────────────
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 25 });
  const sry = useSpring(ry, { stiffness: 200, damping: 25 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}>
      {children}
    </motion.div>
  );
};

// ─── BG Grid ──────────────────────────────────────────────────────────────────
const BgGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{ backgroundImage: "radial-gradient(circle, #ef4444 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
);

// ─── Education Row ────────────────────────────────────────────────────────────
const EducationRow = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col lg:flex-row ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center gap-8 lg:gap-12`}
    >
      {/* ── Logo ── */}
      <div className={`lg:w-1/3 flex justify-center ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.25, type: "spring", stiffness: 200, damping: 18 }}
          whileHover={{ scale: 1.07, rotate: [0, -3, 3, 0], transition: { duration: 0.5 } }}
          className={`relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl flex items-center justify-center border bg-white/5 backdrop-blur-sm overflow-hidden flex-shrink-0 ${
            item.current
              ? "border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.18)]"
              : "border-white/10"
          }`}
        >
          <img src={item.logo} alt={`${item.institution} logo`} className="w-4/5 h-4/5 object-contain" />
          {item.current && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/8 to-transparent pointer-events-none" />
          )}
        </motion.div>
      </div>


      {/* ── Card ── */}
      <div className="w-full lg:w-2/3">
        <TiltCard>
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-black/95 backdrop-blur-md overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(6,182,212,0.06) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(239,68,68,0.35), 0 0 50px rgba(239,68,68,0.1)",
              }}
            />

            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
              item.current
                ? "bg-gradient-to-b from-red-500 via-red-600/50 to-transparent"
                : "bg-gradient-to-b from-gray-600/60 to-transparent"
            }`} />

            {/* Badges */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              {item.current && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                  Current
                </span>
              )}
              {item.gpa && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 tracking-widest uppercase flex items-center gap-1">
                  <FiAward size={10} /> GPA {item.gpa}
                </span>
              )}
            </div>

            <div className="p-6 md:p-8 pl-7 md:pl-9" style={{ transform: "translateZ(18px)" }}>
              {/* Icon + heading */}
              <div className="flex items-start gap-4 mb-4 pr-28">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg border mt-0.5 ${
                  item.current
                    ? "bg-red-600/20 border-red-500/30 text-red-400"
                    : "bg-gray-800 border-gray-700 text-gray-400"
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg sm:text-xl font-bold leading-snug mb-1 tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    <GlitchText>{item.degree}</GlitchText>
                  </h3>
                  <h4 className="text-base font-semibold text-gray-300 mb-1">{item.institution}</h4>
                  <p className="text-gray-500 text-xs flex items-center gap-1.5">
                    <FiCalendar size={10} /> {item.duration}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{item.description}</p>

              {/* Skills */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2.5 flex items-center gap-1.5">
                  <FiZap size={10} className="text-red-500" /> Skills Developed
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 + i * 0.05 }}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${getTechColor(skill)}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Education = () => (
  <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`}</style>

    <section
      id="education"
      className="relative py-24 px-4 sm:px-8 bg-[#050505] text-white overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <BgGrid />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-red-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-5xl">

        {/* ── Responsive heading — identical style to Projects ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-4 block">
            — Background
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Education{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #ef4444, #f97316)" }}
            >
              Journey
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-sm max-w-xs mx-auto">
            Academic milestones that shaped my foundation in technology.
          </p>
          <motion.div
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ width: "200px" }}
          />
        </motion.div>

        {/* ── Original alternating layout ── */}
        <div className="relative">
          {/* Vertical spine — desktop */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-px hidden lg:block"
            style={{
              background: "linear-gradient(to bottom, rgba(239,68,68,0.5), rgba(107,114,128,0.25), transparent)",
              top: 0, bottom: 0,
            }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.2, ease: "easeInOut" }}
          />

          <div className="space-y-12 lg:space-y-16">
            {educationData.map((item, index) => (
              <EducationRow key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* ── Footer flourish ── */}
        <motion.div
          className="flex flex-col items-center mt-14 gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-red-500/40 to-transparent" />
          <span className="text-xs text-gray-600 tracking-widest uppercase">Ongoing</span>
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-red-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  </>
);

export default Education;