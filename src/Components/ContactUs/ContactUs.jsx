import React from "react";
import {
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaEnvelope,
  FaCopy,
} from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import contactAnimation from "../../assets/contactUs.json";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ContactUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    MySwal.fire({
      title: <p className="text-white">Copied to clipboard!</p>,
      text: text,
      icon: "success",
      background: "#1a1a1a",
      color: "#ffffff",
      iconColor: "#ef4444",
      confirmButtonColor: "#ef4444",
      customClass: {
        popup: "dark-swal",
        title: "dark-swal-title",
        content: "dark-swal-content",
      },
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <section
      id="contact"
      className="bg-black text-white py-20 px-4 sm:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={container}
          className="flex flex-col lg:flex-row gap-12 items-center"
        >
          {/* Left Column - Lottie Animation (50%) */}
          <motion.div
            variants={item}
            className="w-full hidden md:block lg:w-1/2"
          >
            <Player
              autoplay
              loop
              src={contactAnimation}
              style={{ height: "400px", width: "100%" }}
            />
          </motion.div>

          {/* Right Column - Contact Content (50%) */}
          <motion.div variants={container} className="w-full lg:w-1/2">
            {/* Headline */}
            <motion.h2
              variants={item}
              className="text-3xl sm:text-4xl font-bold mb-6 text-red-500 text-center md:text-left"
            >
              Let's Work Together
            </motion.h2>

            {/* Contact Form */}
            <motion.form variants={item} className="space-y-4 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full bg-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-all duration-300 text-lg font-medium"
              >
                <FaPaperPlane />
                <span>Send Message</span>
              </motion.button>
            </motion.form>

            {/* Alternative Contact */}
            <motion.div variants={container} className="space-y-3 sm:space-y-4">
              {/* Location */}
              <motion.div
                variants={item}
                className="flex items-center gap-2 sm:gap-3"
              >
                <FaMapMarkerAlt className="text-red-500 text-lg sm:text-xl flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">
                  Gazipur, Dhaka, Bangladesh
                </span>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                variants={item}
                className="flex items-center gap-2 sm:gap-3 min-w-0"
              >
                <FaWhatsapp className="text-red-500 text-lg sm:text-xl flex-shrink-0" />

                <div className="flex items-center min-w-0 flex-1">
                  <span className="text-gray-300 truncate text-sm sm:text-base">
                    +880 1756650014
                  </span>

                  <button
                    onClick={() =>
                      copyToClipboard("+8801756650014", "WhatsApp")
                    }
                    className="ml-2 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    aria-label="Copy WhatsApp number"
                  >
                    <FaCopy className="text-sm sm:text-base" />
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-center gap-2 sm:gap-3 w-full min-w-0"
              >
                <FaEnvelope className="text-red-500 text-lg sm:text-xl flex-shrink-0" />

                <div className="flex items-center min-w-0 flex-1">
                  <span className="text-gray-300 truncate text-sm sm:text-base">
                    ibrahim.khalil.tushar01@gmail.com
                  </span>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        "ibrahim.khalil.tushar01@gmail.com",
                        "Email"
                      )
                    }
                    className="ml-2 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    aria-label="Copy email address"
                  >
                    <FaCopy className="text-sm sm:text-base" />
                  </button>
                </div>
              </motion.div>

              <motion.div variants={item} className="flex gap-4 mt-6">
                {[
                  {
                    icon: <FaGithub />,
                    url: "https://github.com/iktushar01",
                    label: "GitHub",
                  },
                  {
                    icon: <FaLinkedin />,
                    url: "https://www.linkedin.com/in/iktushar01/",
                    label: "LinkedIn",
                  },
                  {
                    icon: <FaFacebook />,
                    url: "https://www.facebook.com/ibrahim.khalil.tushar.2024",
                    label: "Facebook",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3 }}
                    href={social.url}
                    aria-label={social.label}
                    target="_blank"
                    className="text-2xl text-gray-300 hover:text-red-500 transition-colors duration-300  tar"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
