import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";
import { Fade } from "react-awesome-reveal";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import { getTechColor } from "../../../utils/techColors";
import { projectsData } from "../../../data/projects.js";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ref, inView] = useIntersectionObserver({ threshold: 0.2 });

  const projects = projectsData;

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };


  return (
    <Fade delay={100}>
      <section
        id="projects"
        className="py-16 px-4 sm:px-8 bg-black text-white relative overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-12 text-center text-red-500"
          >
            My Projects
          </motion.h2>

          <div className="grid grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 h-48 md:h-auto overflow-hidden relative">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover p-3"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs">
                    {project.images.length} images
                  </div>
                </div>
                <div className="md:w-1/2 p-6 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded-full text-xs ${getTechColor(
                            tech
                          )}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-2 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300 text-sm"
                    >
                      <FiExternalLink className="mr-1" />
                      Live
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-2 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-300 text-sm"
                    >
                      <FiGithub className="mr-1" />
                      GitHub
                    </a>
                    <button
                      onClick={() => openModal(project)}
                      className="flex-1 flex items-center justify-center py-2 bg-gray-900 hover:bg-gray-700 rounded-md transition-colors duration-300 text-sm"
                    >
                      <FiEye className="mr-1" />
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
            <div className="relative bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
              >
                <FiX size={24} />
              </button>

              <div className="flex flex-col lg:flex-row">
                {/* Left side - Image gallery */}
                <div className="lg:w-1/2 p-4">
                  <div className="relative h-64 md:h-96 overflow-hidden rounded-lg mb-4">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain bg-black"
                    />

                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                        >
                          <FiChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                        >
                          <FiChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
                          currentImageIndex === index
                            ? "ring-2 ring-red-500"
                            : ""
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="lg:w-1/2 p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-red-500">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-sm ${getTechColor(
                            tech
                          )}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-red-500">
                        Challenges Faced
                      </h4>
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        {selectedProject.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-red-500">
                        Future Improvements
                      </h4>
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        {selectedProject.improvements.map((improvement, i) => (
                          <li key={i}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300"
                    >
                      <FiExternalLink className="mr-2" />
                      Live Project
                    </a>
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-300"
                    >
                      <FiGithub className="mr-2" />
                      GitHub Repository
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Fade>
  );
};

export default Projects;
