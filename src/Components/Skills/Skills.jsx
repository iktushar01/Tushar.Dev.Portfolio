import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  FaReact, FaNodeJs, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaFire,
} from "react-icons/fa";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiJavascript,
  SiPostman, SiVercel, SiJsonwebtokens, SiVite, SiNpm,
  
} from "react-icons/si";

// ─── Skill Data ───────────────────────────────────────────────────────────────
const skills = [
  { name: "React.js",     icon: <FaReact />,            color: "#61DAFB", glow: "rgba(97,218,251,0.35)",   level: 90, category: "Frontend" },
  { name: "JavaScript",   icon: <SiJavascript />,        color: "#F7DF1E", glow: "rgba(247,223,30,0.35)",   level: 85, category: "Frontend" },
  { name: "HTML5",        icon: <FaHtml5 />,             color: "#E34F26", glow: "rgba(227,79,38,0.35)",    level: 90, category: "Frontend" },
  { name: "CSS3",         icon: <FaCss3Alt />,           color: "#1572B6", glow: "rgba(21,114,182,0.35)",   level: 85, category: "Frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />,       color: "#38BDF8", glow: "rgba(56,189,248,0.35)",   level: 85, category: "Frontend" },
  { name: "Vite",         icon: <SiVite />,              color: "#A78BFA", glow: "rgba(167,139,250,0.35)",  level: 80, category: "Frontend" },
  { name: "Node.js",      icon: <FaNodeJs />,            color: "#68A063", glow: "rgba(104,160,99,0.35)",   level: 85, category: "Backend"  },
  { name: "Express.js",   icon: <SiExpress />,           color: "#CCCCCC", glow: "rgba(200,200,200,0.25)",  level: 80, category: "Backend"  },
  { name: "REST API",     icon: <span className="font-black text-[11px] tracking-tighter leading-none">REST</span>, color: "#FB923C", glow: "rgba(251,146,60,0.35)", level: 85, category: "Backend" },
  { name: "JWT Auth",     icon: <SiJsonwebtokens />,     color: "#FB923C", glow: "rgba(251,146,60,0.30)",   level: 75, category: "Backend"  },
  { name: "MongoDB",      icon: <SiMongodb />,           color: "#4DB33D", glow: "rgba(77,179,61,0.35)",    level: 85, category: "Database" },
  { name: "Firebase",     icon: <FaFire />,              color: "#FFA000", glow: "rgba(255,160,0,0.35)",    level: 80, category: "Database" },
  { name: "Git",          icon: <FaGitAlt />,            color: "#F05032", glow: "rgba(240,80,50,0.35)",    level: 85, category: "Tools"    },
  { name: "GitHub",       icon: <FaGithub />,            color: "#E6EDF3", glow: "rgba(230,237,243,0.25)",  level: 90, category: "Tools"    },
  { name: "Postman",      icon: <SiPostman />,           color: "#FF6C37", glow: "rgba(255,108,55,0.35)",   level: 70, category: "Tools"    },
  { name: "Vercel",       icon: <SiVercel />,            color: "#FFFFFF", glow: "rgba(255,255,255,0.20)",  level: 80, category: "Tools"    },
  { name: "npm",          icon: <SiNpm />,               color: "#CB3837", glow: "rgba(203,56,55,0.35)",    level: 85, category: "Tools"    },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools"];

const CAT_META = {
  All:      { color: "#ef4444", label: "All Skills" },
  Frontend: { color: "#22d3ee", label: "Frontend" },
  Backend:  { color: "#4ade80", label: "Backend" },
  Database: { color: "#34d399", label: "Database" },
  Tools:    { color: "#9ca3af", label: "Tools" },
};

// ─── BG Grid ──────────────────────────────────────────────────────────────────
const BgGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(circle, rgba(239,68,68,0.07) 1px, transparent 1px)",
      backgroundSize: "36px 36px",
      opacity: 1,
    }}
  />
);

// ─── Magnetic wrapper ─────────────────────────────────────────────────────────
const Magnetic = ({ children, strength = 0.25 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
};

// ─── Animated ring SVG ────────────────────────────────────────────────────────
const RingProgress = ({ pct, color, size = 56 }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <svg width={size} height={size} className="absolute inset-0" style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ - dash }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
};

// ─── Skill Card ───────────────────────────────────────────────────────────────
const SkillCard = ({ skill }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Magnetic strength={0.2}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -8, scale: 1.06 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="relative mx-2.5 flex flex-col items-center justify-between p-3.5 rounded-2xl cursor-default select-none"
        style={{
          width: 108,
          height: 136,
          background: hovered
            ? `linear-gradient(145deg, ${skill.color}18, rgba(0,0,0,0.85))`
            : "rgba(14,14,14,0.85)",
          border: hovered
            ? `1px solid ${skill.color}55`
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered
            ? `0 8px 32px ${skill.glow}, 0 0 0 1px ${skill.color}30`
            : "0 2px 12px rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Shimmer sweep on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg, transparent 30%, ${skill.color}18 50%, transparent 70%)`,
              transform: "translateX(-100%)",
            }}
            animate={hovered ? { transform: "translateX(100%)" } : { transform: "translateX(-100%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Ring + icon */}
        <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
          <RingProgress pct={skill.level} color={skill.color} size={56} />
          <motion.div
            className="relative z-10 flex items-center justify-center w-9 h-9 rounded-xl"
            style={{
              background: hovered ? `${skill.color}22` : "rgba(255,255,255,0.05)",
              color: skill.color,
              fontSize: "1.25rem",
              transition: "background 0.3s",
              filter: hovered ? `drop-shadow(0 0 6px ${skill.color}bb)` : "none",
            }}
            animate={hovered ? { rotate: [0, -10, 10, -5, 5, 0] } : { rotate: 0 }}
            transition={{ duration: 0.55 }}
          >
            {skill.icon}
          </motion.div>
        </div>

        {/* Name */}
        <p
          className="text-[11px] font-bold text-center leading-tight px-0.5 transition-colors duration-300"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: hovered ? skill.color : "rgba(255,255,255,0.75)",
            textShadow: hovered ? `0 0 12px ${skill.color}80` : "none",
          }}
        >
          {skill.name}
        </p>

        {/* Level pill */}
        <div
          className="px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest transition-all duration-300"
          style={{
            background: hovered ? `${skill.color}25` : "rgba(255,255,255,0.05)",
            border: `1px solid ${hovered ? skill.color + "60" : "rgba(255,255,255,0.08)"}`,
            color: hovered ? skill.color : "rgba(255,255,255,0.35)",
          }}
        >
          {skill.level}%
        </div>

        {/* Category dot */}
        <motion.div
          className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full"
          style={{ background: skill.color }}
          animate={hovered ? { scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
        />
      </motion.div>
    </Magnetic>
  );
};

// ─── Filter pill ──────────────────────────────────────────────────────────────
const FilterPill = ({ cat, active, onClick }) => {
  const meta = CAT_META[cat];
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-4 py-2 rounded-full text-[11px] font-black tracking-[0.15em] uppercase transition-all duration-200 overflow-hidden"
      style={{
        background: active ? `${meta.color}20` : "rgba(255,255,255,0.04)",
        border: active ? `1px solid ${meta.color}60` : "1px solid rgba(255,255,255,0.08)",
        color: active ? meta.color : "rgba(255,255,255,0.4)",
        boxShadow: active ? `0 0 20px ${meta.color}25` : "none",
      }}
    >
      {active && (
        <motion.div
          layoutId="pill-bg"
          className="absolute inset-0 rounded-full"
          style={{ background: `${meta.color}12` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{cat}</span>
    </motion.button>
  );
};

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4, scale: 1.03 }}
    className="flex flex-col items-center p-5 rounded-2xl border border-white/5 backdrop-blur-sm text-center"
    style={{ background: "rgba(14,14,14,0.8)" }}
  >
    <span
      className="text-3xl sm:text-4xl font-extrabold mb-1 text-transparent bg-clip-text"
      style={{ backgroundImage: `linear-gradient(135deg, ${color}, #f97316)`, fontFamily: "'Syne', sans-serif" }}
    >
      {value}
    </span>
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">{label}</span>
  </motion.div>
);

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel = ({ dir, color }) => (
  <div className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
    style={dir === "left" ? { left: 0 } : { right: 0 }}>
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-r-full text-[9px] font-black tracking-[0.2em] uppercase"
      style={{
        background: `linear-gradient(to ${dir === "left" ? "right" : "left"}, rgba(0,0,0,0.9), transparent)`,
        color,
        borderRight: dir === "left" ? `1px solid ${color}40` : "none",
        borderLeft: dir === "right" ? `1px solid ${color}40` : "none",
        borderTop: `1px solid ${color}20`,
        borderBottom: `1px solid ${color}20`,
      }}
    >
      {dir === "left" ? "◀ Hover to pause" : "Hover to pause ▶"}
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const Skills = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered = activeFilter === "All" ? skills : skills.filter(s => s.category === activeFilter);
  const mid = Math.ceil(filtered.length / 2);
  const row1 = filtered.length >= 2 ? filtered.slice(0, mid) : filtered;
  const row2 = filtered.length >= 2 ? filtered.slice(mid) : [...filtered].reverse();

  const ensure = (arr) => arr.length < 4 ? [...arr, ...arr, ...arr, ...arr] : arr;

  const stats = [
    { value: `${skills.length}+`,  label: "Technologies",   color: "#ef4444", delay: 0.1 },
    { value: `${skills.filter(s => s.category === "Frontend").length}`,  label: "Frontend Skills", color: "#22d3ee", delay: 0.2 },
    { value: `${skills.filter(s => s.category === "Backend").length}`,   label: "Backend Skills",  color: "#4ade80", delay: 0.3 },
    { value: `${Math.round(skills.reduce((a, s) => a + s.level, 0) / skills.length)}%`, label: "Avg Proficiency", color: "#fb923c", delay: 0.4 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,600&display=swap');

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.06; }
          50%       { transform: translateY(-30px) scale(1.08); opacity: 0.12; }
        }
        .float-orb { animation: float-slow var(--dur, 8s) ease-in-out infinite; }
      `}</style>

      <section
        id="skills"
        className="relative py-24 bg-[#050505] text-white overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <BgGrid />

        {/* Floating orbs */}
        {[
          { size: 420, top: "5%",  left: "-10%", color: "#ef4444", dur: "9s"  },
          { size: 300, top: "55%", right: "-8%", color: "#06b6d4", dur: "12s" },
          { size: 200, top: "30%", left: "45%",  color: "#f97316", dur: "7s"  },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full float-orb pointer-events-none"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
              filter: "blur(40px)",
              "--dur": orb.dur,
            }}
          />
        ))}

        {/* ── Header ── */}
        <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-8">
          

        </div>

        {/* ── Marquee rows ── */}
        {mounted && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative space-y-4 py-2"
            >
              {/* Edge fades */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 pointer-events-none z-20"
                style={{ background: "linear-gradient(to right, #050505, transparent)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 pointer-events-none z-20"
                style={{ background: "linear-gradient(to left, #050505, transparent)" }} />

              

              
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Stats ── */}
        <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-8 mt-16">
          

          {/* Bottom hint */}
          <motion.p
            className="text-center mt-8 text-[11px] text-gray-700 tracking-widest uppercase flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
          
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Skills;