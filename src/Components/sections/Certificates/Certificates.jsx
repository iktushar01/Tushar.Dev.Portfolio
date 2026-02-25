import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiAward, FiCalendar, FiZap } from "react-icons/fi";

// ─── Replace with your real imports ──────────────────────────────────────────
import { certificatesData } from "../../../data/certificates";

const TECH_COLORS = {
  React:              "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
  JavaScript:         "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  "ES6+":             "bg-yellow-400/10 text-yellow-300 border border-yellow-400/30",
  HTML:               "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  CSS:                "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  MongoDB:            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  "Node.js":          "bg-green-500/10 text-green-400 border border-green-500/30",
  "Express.js":       "bg-gray-500/10 text-gray-300 border border-gray-500/30",
  Git:                "bg-red-500/10 text-red-400 border border-red-500/30",
  "UI/UX":            "bg-pink-500/10 text-pink-400 border border-pink-500/30",
  Algorithms:         "bg-purple-500/10 text-purple-400 border border-purple-500/30",
  "Data Structures":  "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",
  OOP:                "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  Flexbox:            "bg-teal-500/10 text-teal-400 border border-teal-500/30",
  "CSS Grid":         "bg-teal-400/10 text-teal-300 border border-teal-400/30",
  Accessibility:      "bg-violet-500/10 text-violet-400 border border-violet-500/30",
  default:            "bg-red-500/10 text-red-400 border border-red-500/30",
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
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
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

const BgGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{ backgroundImage: "radial-gradient(circle, #ef4444 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
);

// ─── Certificate Card ─────────────────────────────────────────────────────────
const CertCard = ({ cert, index, onOpen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard className="h-full">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => onOpen(cert)}
        initial={{ opacity: 0, y: 60, scale: 0.93 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-black/95 backdrop-blur-md overflow-hidden cursor-pointer flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(6,182,212,0.06) 100%)",
            boxShadow: "inset 0 0 0 1px rgba(239,68,68,0.35), 0 0 50px rgba(239,68,68,0.12)",
          }}
        />

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent z-10" />

        {/* Image */}
        <div className="relative h-52 md:h-60 overflow-hidden bg-black/60 flex-shrink-0">
          {cert.image ? (
            <motion.img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FiAward size={64} className="text-red-500/40" />
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center pb-5"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }}
          >
            <span className="text-white text-sm font-bold px-5 py-2 rounded-full bg-red-600/90 border border-red-500/50 backdrop-blur-sm flex items-center gap-1.5">
              <FiAward size={13} /> View Details
            </span>
          </motion.div>

          {/* Date badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-gray-400 flex items-center gap-1 backdrop-blur-sm">
              <FiCalendar size={9} /> {cert.date}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col gap-3 flex-1" style={{ transform: "translateZ(16px)" }}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mt-0.5">
              <FiAward size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold leading-snug tracking-tight mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>
                <GlitchText>{cert.title}</GlitchText>
              </h3>
              <p className="text-gray-400 text-xs font-semibold">{cert.issuer}</p>
            </div>
          </div>

          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">{cert.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {cert.skills.slice(0, 4).map((skill, i) => (
              <span key={i} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getTechColor(skill)}`}>
                {skill}
              </span>
            ))}
            {cert.skills.length > 4 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
                +{cert.skills.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const CertModal = ({ cert, onClose }) => {
  React.useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-900 to-black shadow-2xl"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-t-3xl" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-200"
            >
              <FiX size={16} />
            </button>

            {/* Image */}
            <div className="rounded-t-3xl overflow-hidden bg-black/60 border-b border-white/5">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="w-full max-h-72 object-cover" />
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <FiAward size={64} className="text-red-500/40" />
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white/90 tracking-tight mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                {cert.title}
              </h3>
              <motion.div
                className="h-0.5 bg-gradient-to-r from-red-500 to-transparent mb-5 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ width: "80px" }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
                    <FiAward size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-0.5">Issued By</p>
                    <p className="text-sm font-semibold text-white">{cert.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
                    <FiCalendar size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-0.5">Completed</p>
                    <p className="text-sm font-semibold text-white">{cert.date}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                  <FiAward size={11} /> About This Certificate
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                  <FiZap size={11} /> Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full ${getTechColor(skill)}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
                >
                  <FiExternalLink size={15} /> Verify Credential
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Certificates = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`}</style>

      <section
        id="certificates"
        className="relative py-24 px-4 sm:px-8 bg-[#050505] text-white overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <BgGrid />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

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
              — Achievements
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Certificates &{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #ef4444, #f97316)" }}
              >
                Awards
              </span>
            </h2>
            <p className="mt-4 text-gray-500 text-sm max-w-xs mx-auto">
              Verified credentials and recognitions earned along the journey.
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

          {/* ── Grid ── */}
          {certificatesData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificatesData.map((cert, index) => (
                <CertCard key={cert.id} cert={cert} index={index} onOpen={setSelected} />
              ))}
            </div>
          ) : (
            <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-20 h-20 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <FiAward size={32} className="text-red-500/40" />
              </div>
              <p className="text-gray-500 text-sm">No certificates added yet. Check back soon!</p>
            </motion.div>
          )}

          {certificatesData.length > 0 && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-gray-600 tracking-widest uppercase flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-gray-700 inline-block" />
                Click any card to view details
                <span className="w-8 h-px bg-gray-700 inline-block" />
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Certificates;