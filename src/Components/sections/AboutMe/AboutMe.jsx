import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaCode, FaPaintBrush, FaBook, FaGamepad, FaUsers } from "react-icons/fa";
import { FiZap, FiTarget, FiTrendingUp, FiHeart } from "react-icons/fi";

// ─── BG Grid ──────────────────────────────────────────────────────────────────
const BgGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{ backgroundImage: "radial-gradient(circle, #ef4444 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
);

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

// ─── Animated progress bar ────────────────────────────────────────────────────
const ProgressBar = ({ level, color = "#ef4444", delay = 0 }) => (
  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
    <motion.div
      className="h-full rounded-full"
      style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: "easeOut", delay }}
    />
  </div>
);

// ─── Story card (left column) ─────────────────────────────────────────────────
const StoryCard = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <TiltCard>
        <motion.div
          className="relative rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-black/95 backdrop-blur-md overflow-hidden p-5 md:p-6 flex gap-4"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `linear-gradient(135deg, ${item.color}12 0%, rgba(6,182,212,0.05) 100%)`,
              boxShadow: `inset 0 0 0 1px ${item.color}30, 0 0 40px ${item.color}08`,
            }}
          />
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}40, transparent)` }} />

          {/* Icon */}
          <motion.div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl mt-0.5"
            style={{
              background: hovered ? `${item.color}20` : "rgba(255,255,255,0.05)",
              color: item.color,
              border: `1px solid ${hovered ? item.color + "50" : "rgba(255,255,255,0.08)"}`,
              boxShadow: hovered ? `0 0 20px ${item.color}30` : "none",
              transition: "all 0.3s",
            }}
            animate={hovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
            transition={{ duration: 0.45 }}
            style2={{ transform: "translateZ(12px)" }}
          >
            {item.icon}
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0" style={{ transform: "translateZ(8px)" }}>
            <h3 className="text-base font-bold mb-1.5 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              <GlitchText>{item.title}</GlitchText>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.content}</p>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

// ─── Approach stat row ────────────────────────────────────────────────────────
const ApproachRow = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      <motion.div
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="p-4 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-sm transition-all duration-300"
        style={{
          boxShadow: hovered ? `inset 0 0 0 1px ${item.color}35, 0 4px 20px ${item.color}10` : "none",
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
              style={{
                background: hovered ? `${item.color}20` : "rgba(255,255,255,0.05)",
                color: item.color,
                boxShadow: hovered ? `0 0 14px ${item.color}30` : "none",
              }}
            >
              {item.icon}
            </div>
            <span className="text-sm font-semibold text-white/80">{item.skill}</span>
          </div>
          <motion.span
            className="text-sm font-black"
            style={{ color: item.color }}
            animate={hovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {item.level}%
          </motion.span>
        </div>
        <ProgressBar level={item.level} color={item.color} delay={index * 0.1 + 0.4} />
      </motion.div>
    </motion.div>
  );
};

// ─── Fun fact chip ────────────────────────────────────────────────────────────
const FunFact = ({ emoji, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, type: "spring", stiffness: 280, damping: 20 }}
    whileHover={{ scale: 1.06, y: -3 }}
    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 bg-white/[0.04] backdrop-blur-sm text-xs font-medium text-gray-300 cursor-default"
  >
    <span className="text-base">{emoji}</span>
    {text}
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const AboutMe = () => {
  const stories = [
    {
      icon: <FaCode />,
      color: "#ef4444",
      title: "My Coding Journey",
      content: "My programming adventure began at college when I built my first website using a WordPress theme. Since then, I've fallen in love with the problem-solving aspect of development. Currently specializing in the MERN stack, I enjoy creating full-stack applications that solve real-world problems.",
    },
    {
      icon: <FaPaintBrush />,
      color: "#22d3ee",
      title: "Creative Problem Solver",
      content: "I thrive on projects that require both technical skills and creative thinking. Whether it's designing intuitive user interfaces or architecting efficient backend systems, I approach each challenge with enthusiasm — that moment when all components come together is pure magic.",
    },
    {
      icon: <FaBook />,
      color: "#f97316",
      title: "Beyond the Keyboard",
      content: "When I'm not coding, you'll find me playing Valorant, Free Fire, or PUBG. I believe diverse interests fuel creativity in programming. I'm also passionate about tech education and regularly mentor aspiring developers in my community.",
    },
  ];

  const approaches = [
    { skill: "Clean Code",          level: 90,  color: "#ef4444", icon: <FiZap size={13} /> },
    { skill: "Problem Solving",     level: 80,  color: "#22d3ee", icon: <FiTarget size={13} /> },
    { skill: "UI/UX Design",        level: 90,  color: "#f97316", icon: <FaPaintBrush size={11} /> },
    { skill: "Continuous Learning", level: 100, color: "#4ade80", icon: <FiTrendingUp size={13} /> },
  ];

  const funFacts = [
    { emoji: "🎮", text: "Gamer — Valorant & PUBG" },
    { emoji: "🌍", text: "Dhaka, Bangladesh" },
    { emoji: "🎓", text: "CSE Undergrad" },
    { emoji: "💡", text: "MERN Stack Dev" },
    { emoji: "🏆", text: "GPA 5.00 in HSC" },
    { emoji: "🤝", text: "Open to Collabs" },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`}</style>

      <section
        id="about"
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
              — Who I Am
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              About{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #ef4444, #f97316)" }}>
                Me
              </span>
            </h2>
            <p className="mt-4 text-gray-500 text-sm max-w-xs mx-auto">
              A passionate full-stack developer crafting meaningful digital experiences.
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

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* ── Left: Story cards ── */}
            <div className="space-y-4">
              {stories.map((item, index) => (
                <StoryCard key={index} item={item} index={index} />
              ))}
            </div>

            {/* ── Right: Approach card + fun facts ── */}
            <div className="space-y-6">
              {/* Approach card */}
              <TiltCard>
                <motion.div
                  className="relative rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-black/95 backdrop-blur-md overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-red-500 via-red-600/50 to-transparent" />

                  <div className="p-6 md:p-7 pl-7 md:pl-8" style={{ transform: "translateZ(14px)" }}>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                        <FiTarget size={16} />
                      </div>
                      <h3 className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                        <GlitchText>My Approach</GlitchText>
                      </h3>
                    </div>

                    {/* Approach bars */}
                    <div className="space-y-3">
                      {approaches.map((item, index) => (
                        <ApproachRow key={index} item={item} index={index} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>

              {/* Fun facts chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-red-500/50 inline-block" /> Quick Facts
                </p>
                <div className="flex flex-wrap gap-2">
                  {funFacts.map((fact, i) => (
                    <FunFact key={i} emoji={fact.emoji} text={fact.text} delay={i * 0.07 + 0.3} />
                  ))}
                </div>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                className="grid grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { value: "1+",   label: "Years Coding",  color: "#ef4444" },
                  { value: "10+",  label: "Technologies",  color: "#22d3ee" },
                  { value: "3+",   label: "Projects Built", color: "#f97316" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center py-4 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm text-center"
                  >
                    <span
                      className="text-2xl font-extrabold text-transparent bg-clip-text mb-0.5"
                      style={{ backgroundImage: `linear-gradient(135deg, ${stat.color}, #f97316)`, fontFamily: "'Syne', sans-serif" }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
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
            <span className="text-xs text-gray-600 tracking-widest uppercase">Always Growing</span>
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

export default AboutMe;