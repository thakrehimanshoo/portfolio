import { Project } from '../lib/data';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Image */}
      <div className="h-48 bg-gray-700 flex items-center justify-center">
        <span className="text-gray-500">Image placeholder</span>
        {/* We'll add real images later */}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        {/* Metrics */}
        {project.metrics && (
          <div className="mb-4">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              {project.metrics}
            </span>
          </div>
        )}
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, index) => (
            <span 
              key={index}
              className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
       
        
        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <a 
              href={project.github}
              className="text-blue-400 hover:text-blue-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo}
              className="text-blue-400 hover:text-blue-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}