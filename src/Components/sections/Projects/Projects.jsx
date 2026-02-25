import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight, FiEye, FiCode, FiZap,
} from "react-icons/fi";

// ─── Real project data ────────────────────────────────────────────────────────
import { projectImages } from '../../../assets/images';
import { projectsData } from '../../../data/projects';

// ─── Tech colour map ──────────────────────────────────────────────────────────
const TECH_COLORS = {
  // Frontend
  React: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
  "React.js": "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
  "React Router DOM": "bg-cyan-400/10 text-cyan-300 border border-cyan-400/30",
  "React Hook Form": "bg-pink-500/10 text-pink-400 border border-pink-500/30",
  "TanStack Query": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  "TanStack Table": "bg-orange-400/10 text-orange-300 border border-orange-400/30",
  "Tailwind CSS": "bg-teal-500/10 text-teal-400 border border-teal-500/30",
  // Backend
  "Node.js": "bg-green-500/10 text-green-400 border border-green-500/30",
  "Express.js": "bg-gray-500/10 text-gray-300 border border-gray-500/30",
  MongoDB: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  Firebase: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  "Firebase Auth": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  // Payments & UI libs
  "Stripe.js": "bg-violet-500/10 text-violet-400 border border-violet-500/30",
  SweetAlert2: "bg-purple-500/10 text-purple-400 border border-purple-500/30",
  Axios: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  "Context API": "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",
  // Fallback
  default: "bg-red-500/10 text-red-400 border border-red-500/30",
};
const getTechColor = (t) => TECH_COLORS[t] || TECH_COLORS.default;

// ─── Magnetic button ──────────────────────────────────────────────────────────
const MagneticButton = ({ children, className, onClick, href, target, rel }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      ref={ref}
      href={href} target={target} rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      className={className}
    >
      {children}
    </Tag>
  );
};

// ─── Tilt card wrapper ────────────────────────────────────────────────────────
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 25 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-py * 12);
    rotY.set(px * 12);
  };
  const handleMouseLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Glitch text effect ───────────────────────────────────────────────────────
const GlitchText = ({ children, className }) => (
  <span className={`relative inline-block group ${className}`}>
    <span className="relative z-10">{children}</span>
    <span
      aria-hidden
      className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-60 translate-x-[2px] -translate-y-[1px] transition-none pointer-events-none select-none"
      style={{ clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)" }}
    >
      {children}
    </span>
    <span
      aria-hidden
      className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-60 -translate-x-[2px] translate-y-[1px] transition-none pointer-events-none select-none"
      style={{ clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)" }}
    >
      {children}
    </span>
  </span>
);

// ─── Image carousel ───────────────────────────────────────────────────────────
const ImageCarousel = ({ images, title }) => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((p) => (p + 1) % images.length);
  const prev = () => setIdx((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="relative h-64 md:h-[420px] rounded-2xl overflow-hidden bg-black/60 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600/70 hover:border-red-500"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600/70 hover:border-red-500"
          >
            <FiChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`transition-all duration-300 rounded-full ${i === idx ? "w-5 h-1.5 bg-red-500" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        </>
      )}
      <span className="absolute top-3 right-3 text-xs bg-black/60 border border-white/10 px-2 py-0.5 rounded-full text-white/60">
        {idx + 1}/{images.length}
      </span>
    </div>
  );
};

// ─── Project card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, onOpen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard className="h-full">
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-black/90 backdrop-blur-md flex flex-col md:flex-row"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Glow border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(6,182,212,0.08) 100%)",
            boxShadow: "inset 0 0 0 1px rgba(239,68,68,0.35), 0 0 40px rgba(239,68,68,0.12)",
          }}
        />

        {/* Image side */}
        <div className="md:w-[45%] relative overflow-hidden flex-shrink-0">
          <div className="h-52 md:h-full min-h-[200px] relative overflow-hidden">
            <motion.img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 md:hidden" />

            {/* Tag */}
            <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-600/90 text-white tracking-wide">
              {project.tag}
            </span>
            <span className="absolute bottom-3 right-3 text-xs bg-black/70 border border-white/10 px-2 py-0.5 rounded-full text-white/50">
              {project.images.length} photos
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
          <div>
            <motion.h3
              className="text-2xl font-bold mb-2 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <GlitchText>{project.title}</GlitchText>
            </motion.h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${getTechColor(tech)}`}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 5 && (
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 flex-wrap">
            <MagneticButton
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-500 rounded-xl text-sm font-semibold text-white transition-colors duration-200 shadow-lg shadow-red-900/30"
            >
              <FiZap size={14} />
              Live Demo
            </MagneticButton>

            <MagneticButton
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold text-white transition-colors duration-200"
            >
              <FiGithub size={14} />
              Code
            </MagneticButton>

            <MagneticButton
              onClick={() => onOpen(project)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all duration-200"
            >
              <FiEye size={14} />
              Details
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-900 to-black shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-200"
            >
              <FiX size={16} />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Left: gallery */}
              <div className="lg:w-[52%] p-6 space-y-4 flex-shrink-0">
                <ImageCarousel images={project.images} title={project.title} />

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {project.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`thumb ${i}`}
                      className="flex-shrink-0 w-16 h-12 object-cover rounded-lg border border-white/10 hover:border-red-500/60 cursor-pointer transition-all duration-200"
                    />
                  ))}
                </div>
              </div>

              {/* Right: info */}
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 tracking-widest uppercase">
                      {project.tag}
                    </span>
                  </div>

                  <h2
                    className="text-3xl font-bold mb-3 text-white tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {project.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                      <FiCode size={12} /> Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className={`text-xs px-2.5 py-1 rounded-full ${getTechColor(tech)}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
                        Challenges
                      </h4>
                      <ul className="space-y-2">
                        {project.challenges.map((c, i) => (
                          <li key={i} className="text-sm text-gray-400 flex gap-2">
                            <span className="text-red-500 mt-0.5 flex-shrink-0">▸</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-3">
                        Roadmap
                      </h4>
                      <ul className="space-y-2">
                        {project.improvements.map((imp, i) => (
                          <li key={i} className="text-sm text-gray-400 flex gap-2">
                            <span className="text-cyan-500 mt-0.5 flex-shrink-0">▸</span>
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
                  >
                    <FiExternalLink size={14} /> Live Project
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                  >
                    <FiGithub size={14} /> Repository
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Animated background dots ─────────────────────────────────────────────────
const BgGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.035]"
    style={{
      backgroundImage: `radial-gradient(circle, #ef4444 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }}
  />
);

// ─── Main section ─────────────────────────────────────────────────────────────
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      {/* Font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`}</style>

      <section
        id="projects"
        className="relative py-24 px-4 sm:px-8 bg-[#050505] text-white overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <BgGrid />

        {/* Ambient glows */}
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-4 block">
              — Portfolio
            </span>
            <h2
              className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              My{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #ef4444, #f97316)" }}
              >
                Projects
              </span>
            </h2>
            <p className="mt-4 text-gray-500 text-sm max-w-sm mx-auto">
              A curated selection of work built with care, craft, and curiosity.
            </p>

            {/* Decorative line */}
            <motion.div
              className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ width: "200px" }}
            />
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={setSelectedProject}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://github.com/iktushar01?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white border border-white/10 hover:border-red-500/40 px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-white/5"
            >
              <FiGithub size={14} />
              View all on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default Projects;