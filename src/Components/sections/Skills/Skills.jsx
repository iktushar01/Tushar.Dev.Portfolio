import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FaReact, FaNodeJs, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaFire, FaWordpress, FaPython, FaWindows
} from "react-icons/fa";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiJavascript, SiPostman, SiVercel, 
  SiJsonwebtokens, SiVite, SiNpm, SiTypescript, SiNextdotjs, SiPostgresql, 
  SiPrisma, SiFigma, SiAdobephotoshop, SiNotion
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb"; // For the Framer/Motion icon
import { FiZap, FiCode, FiDatabase, FiTool } from "react-icons/fi";

// ─── Skill Data ───────────────────────────────────────────────────────────────
const skillsData = [
  {
    id: 1,
    category: "Frontend",
    icon: <FiCode />,
    color: "#22d3ee",
    description: "Building responsive, interactive user interfaces with modern frameworks and styling tools.",
    skills: [
      { name: "React.js", icon: <FaReact />, color: "#61DAFB", level: 90 },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF", level: 85 },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", level: 80 },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", level: 85 },
      { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", level: 90 },
      { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", level: 85 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38BDF8", level: 85 },
    ],
  },
  {
    id: 2,
    category: "Backend",
    icon: <FiZap />,
    color: "#4ade80",
    description: "Developing robust server-side logic, RESTful APIs, and integrated systems.",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#68A063", level: 85 },
      { name: "Express.js", icon: <SiExpress />, color: "#CCCCCC", level: 80 },
      { name: "Python", icon: <FaPython />, color: "#3776AB", level: 75 },
      { name: "WordPress", icon: <FaWordpress />, color: "#21759B", level: 70 },
      { name: "JWT Auth", icon: <SiJsonwebtokens />, color: "#FB923C", level: 75 },
    ],
  },
  {
    id: 3,
    category: "Database & ORM",
    icon: <FiDatabase />,
    color: "#34d399",
    description: "Designing and managing relational and NoSQL databases with type-safe ORMs.",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", level: 80 },
      { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D", level: 85 },
      { name: "Prisma", icon: <SiPrisma />, color: "#2D3748", level: 85 },
      { name: "Firebase", icon: <FaFire />, color: "#FFA000", level: 80 },
    ],
  },
  {
    id: 4,
    category: "Design & Tools",
    icon: <FiTool />,
    color: "#f97316",
    description: "Proficient with industry-standard tools for design, version control, and productivity.",
    skills: [
      { name: "Figma", icon: <SiFigma />, color: "#F24E1E", level: 85 },
      { name: "Photoshop", icon: <SiAdobephotoshop />, color: "#31A8FF", level: 70 },
      { name: "Git", icon: <FaGitAlt />, color: "#F05032", level: 85 },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37", level: 85 },
      { name: "Notion", icon: <SiNotion />, color: "#FFFFFF", level: 80 },
    ],
  },
];

// ─── Tech colour map ──────────────────────────────────────────────────────────
const TECH_COLORS = {
  "React.js": "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
  "Next.js": "bg-white/10 text-white border border-white/30",
  TypeScript: "bg-blue-600/10 text-blue-400 border border-blue-600/30",
  JavaScript: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  HTML5: "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  CSS3: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  "Tailwind CSS": "bg-teal-500/10 text-teal-400 border border-teal-500/30",
  "Node.js": "bg-green-500/10 text-green-400 border border-green-500/30",
  "Express.js": "bg-gray-500/10 text-gray-300 border border-gray-500/30",
  Python: "bg-blue-500/10 text-blue-300 border border-blue-500/30",
  WordPress: "bg-sky-600/10 text-sky-400 border border-sky-600/30",
  PostgreSQL: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",
  MongoDB: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  Prisma: "bg-slate-700/10 text-slate-300 border border-slate-700/30",
  Firebase: "bg-yellow-600/10 text-yellow-500 border border-yellow-600/30",
  Figma: "bg-purple-500/10 text-purple-400 border border-purple-500/30",
  Photoshop: "bg-blue-800/10 text-blue-400 border border-blue-800/30",
  Git: "bg-red-500/10 text-red-400 border border-red-500/30",
  "VS Code": "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  Notion: "bg-white/5 text-white/80 border border-white/20",
  Postman: "bg-orange-600/10 text-orange-400 border border-orange-600/30",
  default: "bg-gray-500/10 text-gray-400 border border-gray-500/30",
};

const getTechColor = (t) => TECH_COLORS[t] || TECH_COLORS.default;

// ─── Glitch Text ──────────────────────────────────────────────────────────────
const GlitchText = ({ children }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{children}</span>
    <span
      aria-hidden
      className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-50 translate-x-[2px] -translate-y-[1px] pointer-events-none select-none"
      style={{ clipPath: "polygon(0 25%, 100% 25%, 100% 45%, 0 45%)" }}
    >
      {children}
    </span>
    <span
      aria-hidden
      className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-50 -translate-x-[2px] translate-y-[1px] pointer-events-none select-none"
      style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 85%, 0 85%)" }}
    >
      {children}
    </span>
  </span>
);

// ─── Tilt Card ────────────────────────────────────────────────────────────────
const TiltCard = ({ children }) => {
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
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

// ─── BG Grid ──────────────────────────────────────────────────────────────────
const BgGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: "radial-gradient(circle, #ef4444 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }}
  />
);

// ─── Animated progress bar ────────────────────────────────────────────────────
const ProgressBar = ({ level, color }) => (
  <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
    <motion.div
      className="h-full rounded-full"
      style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    />
  </div>
);

// ─── Individual skill chip inside card ───────────────────────────────────────
const SkillChip = ({ skill, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08, y: -3 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border backdrop-blur-sm cursor-default"
      style={{
        background: hovered ? `${skill.color}12` : "rgba(255,255,255,0.03)",
        borderColor: hovered ? `${skill.color}50` : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 4px 20px ${skill.color}25` : "none",
        transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
        minWidth: 72,
      }}
    >
      <motion.div
        className="text-xl flex items-center justify-center w-9 h-9 rounded-lg"
        style={{
          color: skill.color,
          background: hovered ? `${skill.color}18` : "rgba(255,255,255,0.05)",
          transition: "background 0.25s",
          filter: hovered ? `drop-shadow(0 0 6px ${skill.color}90)` : "none",
        }}
        animate={hovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
        transition={{ duration: 0.45 }}
      >
        {skill.icon}
      </motion.div>
      <span className="text-[10px] font-semibold text-center leading-tight text-white/70 whitespace-nowrap">
        {skill.name}
      </span>
      <ProgressBar level={skill.level} color={skill.color} />
      <span className="text-[9px] font-black tracking-widest" style={{ color: skill.color + "aa" }}>
        {skill.level}%
      </span>
    </motion.div>
  );
};

// ─── Skill Category Card ──────────────────────────────────────────────────────
const SkillCard = ({ group, index }) => {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col lg:flex-row ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center gap-8 lg:gap-12`}
    >
      {/* ── Category icon orb ── */}
      <div className={`lg:w-1/3 flex justify-center ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.2, type: "spring", stiffness: 200, damping: 18 }}
          whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0], transition: { duration: 0.5 } }}
          className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl flex flex-col items-center justify-center gap-3 border bg-white/5 backdrop-blur-sm flex-shrink-0"
          style={{
            borderColor: `${group.color}30`,
            boxShadow: `0 0 40px ${group.color}20`,
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 40%, ${group.color}12, transparent 70%)` }}
          />
          <motion.div
            className="text-4xl lg:text-5xl relative z-10"
            style={{ color: group.color, filter: `drop-shadow(0 0 10px ${group.color}60)` }}
          >
            {group.icon}
          </motion.div>
          <span
            className="relative z-10 text-[10px] font-black tracking-[0.15em] uppercase text-center px-2 leading-tight"
            style={{ color: group.color }}
          >
            {group.category}
          </span>
          <span
            className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border"
            style={{
              background: `${group.color}20`,
              borderColor: `${group.color}50`,
              color: group.color,
            }}
          >
            {group.skills.length}
          </span>
        </motion.div>
      </div>

      {/* ── Main card ── */}
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
                background: `linear-gradient(135deg, ${group.color}14 0%, rgba(6,182,212,0.05) 100%)`,
                boxShadow: `inset 0 0 0 1px ${group.color}35, 0 0 50px ${group.color}10`,
              }}
            />
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{ background: `linear-gradient(to bottom, ${group.color}, ${group.color}40, transparent)` }}
            />

            <div className="p-6 md:p-8 pl-7 md:pl-9" style={{ transform: "translateZ(18px)" }}>
              {/* Header */}
              <div className="flex items-start gap-4 mb-3">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg border mt-0.5"
                  style={{
                    background: `${group.color}20`,
                    borderColor: `${group.color}35`,
                    color: group.color,
                  }}
                >
                  {group.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg sm:text-xl font-bold leading-snug mb-1 tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    <GlitchText>{group.category}</GlitchText>
                  </h3>
                  <p className="text-gray-500 text-xs flex items-center gap-1.5">
                    <FiZap size={10} className="text-red-500" />
                    {group.skills.length} technologies
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{group.description}</p>

              {/* Skill chips */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3 flex items-center gap-1.5">
                  <FiZap size={10} className="text-red-500" /> Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <SkillChip
                      key={skill.name}
                      skill={skill}
                      delay={index * 0.05 + i * 0.06}
                    />
                  ))}
                </div>
              </div>

              {/* Skill name tags */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${getTechColor(skill.name)}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const Skills = () => {
  const totalSkills = skillsData.reduce((a, g) => a + g.skills.length, 0);
  const avgLevel = Math.round(
    skillsData.flatMap(g => g.skills).reduce((a, s) => a + s.level, 0) /
    skillsData.flatMap(g => g.skills).length
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`}</style>

      <section
        id="skills"
        className="relative py-24 px-4 sm:px-8 bg-[#050505] text-white overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <BgGrid />
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-red-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-5xl">

          {/* ── Header ── */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-4 block">
              — Expertise
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Technical{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #ef4444, #f97316)" }}
              >
                Skills
              </span>
            </h2>
            <p className="mt-4 text-gray-500 text-sm max-w-xs mx-auto">
              Technologies I use to craft modern, performant full-stack applications.
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

          {/* ── Cards ── */}
          <div className="relative">
            <div className="space-y-12 lg:space-y-16">
              {skillsData.map((group, index) => (
                <SkillCard key={group.id} group={group} index={index} />
              ))}
            </div>
          </div>

          {/* ── Stats strip ── */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { value: `${skillsData.length}`, label: "Categories", color: "#ef4444" },
              { value: `${totalSkills}+`, label: "Technologies", color: "#22d3ee" },
              { value: `${avgLevel}%`, label: "Avg Proficiency", color: "#4ade80" },
              { value: "1+", label: "Years Learning", color: "#f97316" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{ y: -4, scale: 1.03, transition: { type: "spring", stiffness: 300 } }}
                className="flex flex-col items-center p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm text-center"
              >
                <span
                  className="text-3xl sm:text-4xl font-extrabold mb-1 text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${stat.color}, #f97316)`,
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Footer flourish ── */}
          <motion.div
            className="flex flex-col items-center mt-14 gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-px h-10 bg-gradient-to-b from-red-500/40 to-transparent" />
            <span className="text-xs text-gray-600 tracking-widest uppercase">Always Learning</span>
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
};

export default Skills;