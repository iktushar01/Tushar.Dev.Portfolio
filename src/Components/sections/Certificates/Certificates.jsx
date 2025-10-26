import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiExternalLink, FiAward, FiCalendar } from "react-icons/fi";
import { Fade } from "react-awesome-reveal";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import { textVariants, cardVariants } from "../../../utils/animations";
import { getTechColor } from "../../../utils/techColors";
import { certificatesData } from "../../../data/certificates";
import { useResponsiveAnimation } from "../../../hooks/useResponsiveAnimation";

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [ref, inView] = useIntersectionObserver({ threshold: 0.2 });
  const { getResponsiveDelay, getResponsiveScale, getResponsiveDuration } = useResponsiveAnimation();

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = "auto";
  };

  return (
    <Fade delay={100}>
      <section
        id="certificates"
        className="py-16 px-4 sm:px-8 bg-black text-white relative overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.h2
            ref={ref}
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: getResponsiveDelay(0.1), duration: getResponsiveDuration(0.6) }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-red-500"
          >
            Certificates & Achievements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificatesData.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: getResponsiveDuration(0.6),
                  delay: getResponsiveDelay(index * 0.15),
                }}
                whileHover={{
                  scale: getResponsiveScale(1.02),
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-red-500/50"
                onClick={() => openModal(certificate)}
              >
                {/* Certificate Image */}
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden p-4">
                  {certificate.image ? (
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FiAward className="text-8xl text-red-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-400">Certificate Image</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <span className="text-white font-semibold text-lg bg-red-600 px-6 py-2 rounded-full">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <FiAward className="text-red-500 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-white group-hover:text-red-500 transition-colors duration-300">
                        {certificate.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-semibold">
                        {certificate.issuer}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <FiCalendar className="mr-2 text-red-500" />
                    <span>{certificate.date}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {certificate.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(skill)}`}
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 4 && (
                      <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium">
                        +{certificate.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {certificatesData.length === 0 && (
            <div className="text-center py-12">
              <FiAward className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                No certificates added yet. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Certificate Details Modal */}
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 bg-gray-900 rounded-full p-2"
              >
                <FiX size={24} />
              </button>

              <div className="p-6 md:p-8">
                {/* Certificate Image */}
                <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-700">
                  {selectedCertificate.image ? (
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className="w-full h-auto object-contain max-h-[500px] p-4"
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <FiAward className="text-8xl text-red-500 mx-auto mb-4" />
                        <p className="text-gray-400">Certificate Image</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Certificate Details */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                    {selectedCertificate.title}
                  </h3>
                  
                  <div className="h-1 w-20 bg-red-500 mb-6 rounded-full"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center text-gray-300">
                        <FiAward className="mr-3 text-red-500" size={24} />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Issued By</p>
                          <p className="font-semibold text-lg">{selectedCertificate.issuer}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center text-gray-300">
                        <FiCalendar className="mr-3 text-red-500" size={24} />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Completion Date</p>
                          <p className="font-semibold text-lg">{selectedCertificate.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 bg-gray-900/50 p-5 rounded-lg border border-gray-700">
                    <h4 className="text-lg font-semibold mb-3 text-red-500 flex items-center">
                      <span className="mr-2">📋</span> About This Certificate
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-red-500 flex items-center">
                      <span className="mr-2">🎯</span> Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedCertificate.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${getTechColor(skill)} shadow-md`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedCertificate.credentialUrl && selectedCertificate.credentialUrl !== "#" && (
                    <a
                      href={selectedCertificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-red-500/50"
                    >
                      <FiExternalLink className="mr-2" />
                      Verify Credential
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
    </Fade>
  );
};

export default Certificates;

