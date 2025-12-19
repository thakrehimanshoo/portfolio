'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../lib/data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 rounded-lg max-w-2xl w-full p-8 border-2 border-blue-500"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-white">{project.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <p className="text-xl text-gray-300 mb-4">
            {project.description}
          </p>

          {project.metrics && (
            <div className="mb-4">
              <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
                {project.metrics}
              </span>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-400 mb-6">
            {project.longDescription}
          </p>

          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition"
              >
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition"
              >
                Live Demo
              </a>
            )}
            <button
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition ml-auto"
            >
              Close (ESC)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}