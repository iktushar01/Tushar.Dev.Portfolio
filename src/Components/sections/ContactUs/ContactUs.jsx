import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane, FaGithub, FaLinkedin, FaFacebook,
  FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaCopy, FaCheck,
} from "react-icons/fa";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { Player } from "@lottiefiles/react-lottie-player";
import contactAnimation from "../../../assets/contactUs.json";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

// ─── Magnetic Button ──────────────────────────────────────────────────────────
const Magnetic = ({ children, className, onClick, type, disabled }) => {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.button
      ref={ref} type={type} onClick={onClick} disabled={disabled}
      style={{ x: sx, y: sy }}
      onMouseMove={move} onMouseLeave={leave}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// ─── Floating input field ─────────────────────────────────────────────────────
const FloatInput = ({ label, type = "text", icon, as = "input", rows, required, value, onChange, name }) => {
  const [focused, setFocused] = useState(false);
  const filled = value && value.length > 0;
  const Tag = as;

  return (
    <div className="relative group">
      {/* Icon */}
      <div className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
        as === "textarea" ? "top-4" : "top-1/2 -translate-y-1/2"
      } ${focused || filled ? "text-red-400" : "text-gray-600"}`}>
        {icon}
      </div>

      {/* Input */}
      <Tag
        type={type}
        name={name}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className={`w-full bg-gray-900/80 border rounded-xl pl-11 pr-4 text-white text-sm outline-none transition-all duration-300 resize-none backdrop-blur-sm peer ${
          as === "textarea" ? "pt-5 pb-3 min-h-[130px]" : "py-4"
        } ${focused
          ? "border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.12)]"
          : "border-white/8 hover:border-white/15"
        }`}
      />

      {/* Floating label */}
      <label className={`absolute left-11 pointer-events-none text-sm font-medium transition-all duration-300 ${
        as === "textarea" ? "top-4" : "top-1/2 -translate-y-1/2"
      } ${focused || filled
        ? `${as === "textarea" ? "-translate-y-3.5" : "-translate-y-7"} text-xs text-red-400 bg-gray-900/90 px-1.5 rounded`
        : "text-gray-500"
      }`}>
        {label}
      </label>
    </div>
  );
};

// ─── Contact info row ─────────────────────────────────────────────────────────
const ContactRow = ({ icon, value, onCopy, href, copied }) => {
  const [hovered, setHovered] = useState(false);
  const content = (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-gray-900/60 backdrop-blur-sm cursor-pointer group transition-all duration-300"
      style={{
        boxShadow: hovered ? "inset 0 0 0 1px rgba(239,68,68,0.3), 0 4px 20px rgba(239,68,68,0.08)" : "none",
      }}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base transition-all duration-300 ${
        hovered ? "bg-red-600/30 text-red-400 shadow-[0_0_16px_rgba(239,68,68,0.4)]" : "bg-white/5 text-gray-500"
      }`}>
        {icon}
      </div>
      <span className="text-gray-300 text-sm flex-1 truncate group-hover:text-white transition-colors duration-200">
        {value}
      </span>
      {onCopy && (
        <motion.button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCopy(); }}
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-600 hover:text-white hover:bg-white/10"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <FaCheck size={11} className="text-green-400" />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <FaCopy size={11} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </motion.div>
  );

  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content;
};

// ─── Social link ──────────────────────────────────────────────────────────────
const SocialBtn = ({ icon, url, label, color }) => (
  <motion.a
    href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
    whileHover={{ y: -6, scale: 1.12 }}
    whileTap={{ scale: 0.92 }}
    transition={{ type: "spring", stiffness: 320, damping: 18 }}
    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/8 bg-gray-900/60 text-gray-400 text-xl backdrop-blur-sm transition-all duration-300"
    style={{ ["--hover-color"]: color }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = color + "60";
      e.currentTarget.style.color = color;
      e.currentTarget.style.boxShadow = `0 8px 24px ${color}30`;
      e.currentTarget.style.background = `${color}15`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "";
      e.currentTarget.style.color = "";
      e.currentTarget.style.boxShadow = "";
      e.currentTarget.style.background = "";
    }}
  >
    {icon}
  </motion.a>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1600));
    setSending(false);
    setSent(true);
    MySwal.fire({
      title: "Message Sent!",
      text: "I'll get back to you soon.",
      icon: "success",
      background: "#0e0e0e",
      color: "#ffffff",
      iconColor: "#ef4444",
      confirmButtonColor: "#ef4444",
      showConfirmButton: false,
      timer: 2500,
      toast: true,
      position: "top-end",
    });
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3000);
  };

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const socials = [
    { icon: <FaGithub />,   url: "https://github.com/iktushar01",                              label: "GitHub",   color: "#e6edf3" },
    { icon: <FaFacebook />, url: "https://www.facebook.com/iktushar01",        label: "Facebook", color: "#1877F2" },
    { icon: <FaWhatsapp />, url: "https://wa.me/8801756650014",                                label: "WhatsApp", color: "#25D366" },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`}</style>

      <section
        id="contact"
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
              — Get In Touch
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let's Work{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #ef4444, #f97316)" }}>
                Together
              </span>
            </h2>
            <p className="mt-4 text-gray-500 text-sm max-w-xs mx-auto">
              Have a project in mind? I'd love to hear about it. Drop me a message.
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
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">

            {/* ── Left: Lottie + info ── */}
            <motion.div
              className="w-full lg:w-1/2 flex flex-col gap-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Lottie */}
              <div className="hidden md:block relative">
                <div className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.06), transparent 70%)" }} />
                <Player autoplay loop src={contactAnimation} style={{ height: 260, width: "100%" }} />
              </div>

              {/* Contact info cards */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-red-500/50 inline-block" /> Contact Details
                </p>

                <ContactRow
                  icon={<FaMapMarkerAlt />}
                  value="Gazipur, Dhaka, Bangladesh"
                />
                <ContactRow
                  icon={<FaWhatsapp />}
                  value="+880 1756650014"
                  copied={copiedPhone}
                  onCopy={() => copy("+8801756650014", setCopiedPhone)}
                />
                <ContactRow
                  icon={<FaEnvelope />}
                  value="ibrahim.khalil.tushar01@gmail.com"
                  copied={copiedEmail}
                  onCopy={() => copy("ibrahim.khalil.tushar01@gmail.com", setCopiedEmail)}
                />
              </div>

              {/* Socials */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-red-500/50 inline-block" /> Find Me Online
                </p>
                <div className="flex gap-3">
                  {socials.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2 }}
                    >
                      <SocialBtn {...s} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Form card — same glassmorphism as other sections */}
              <div className="relative rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-black/95 backdrop-blur-md overflow-hidden p-6 md:p-8">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-red-500 via-red-600/50 to-transparent" />

                <h3 className="text-lg font-bold mb-6 tracking-tight flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  <GlitchText>Send a Message</GlitchText>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-red-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput
                      label="Your Name" name="name" icon={<FiUser size={14} />}
                      value={form.name} onChange={handleChange} required
                    />
                    <FloatInput
                      label="Your Email" name="email" type="email" icon={<FiMail size={14} />}
                      value={form.email} onChange={handleChange} required
                    />
                  </div>

                  <FloatInput
                    label="Your Message" name="message" as="textarea" rows={5}
                    icon={<FiMessageSquare size={14} />}
                    value={form.message} onChange={handleChange} required
                  />

                  <Magnetic
                    type="submit"
                    disabled={sending || sent}
                    className={`w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                      sent
                        ? "bg-green-600/30 border border-green-500/40 text-green-400"
                        : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {sending ? (
                        <motion.div key="loading"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Sending…
                        </motion.div>
                      ) : sent ? (
                        <motion.div key="sent"
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <FaCheck /> Message Sent!
                        </motion.div>
                      ) : (
                        <motion.div key="idle"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <FaPaperPlane size={13} />
                          Send Message
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Magnetic>
                </form>
              </div>
            </motion.div>
          </div>

          {/* ── Footer flourish ── */}
          <motion.div
            className="flex flex-col items-center mt-16 gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-px h-10 bg-gradient-to-b from-red-500/40 to-transparent" />
            <span className="text-xs text-gray-600 tracking-widest uppercase">Available for work</span>
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

export default ContactUs;