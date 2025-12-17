import { Project } from '../lib/data';
import ProjectImage from './ProjectImage';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <ProjectImage 
          src={project.image}
          alt={project.title}
          className="h-48"
        />
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4 flex-1">{project.description}</p>
          
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
            {project.tech.slice(0, 3).map((tech, index) => (
              <span 
                key={index}
                className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-400">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>
          
          {/* View More Link */}
          <div className="text-blue-400 hover:text-blue-300 transition font-semibold">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
}