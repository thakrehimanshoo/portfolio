import { projects } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import ProjectImage from '@/app/components/ProjectImage';
import Link from 'next/link';

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  
  const project = projects.find(p => p.id === parseInt(id));
  
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        <Link 
          href="/#projects"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition"
        >
          ← Back to Projects
        </Link>

        <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
        
        {project.metrics && (
          <div className="mb-6">
            <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
              {project.metrics}
            </span>
          </div>
        )}

        <ProjectImage 
          src={project.image}
          alt={project.title}
          className="h-96 rounded-lg mb-8"
        />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About This Project</h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-800 px-4 py-2 rounded-lg text-lg border border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {(project.github || project.demo) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Links</h2>
            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition flex items-center gap-2"
                >
                  <span>📦</span> View on GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition flex items-center gap-2"
                >
                  <span>🚀</span> Live Demo
                </a>
              )}
            </div>
          </div>
        )}

        <div className="border-t border-gray-800 pt-8 mt-12">
          <Link 
            href="/#projects"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            ← View all projects
          </Link>
        </div>

      </div>
    </main>
  );
}