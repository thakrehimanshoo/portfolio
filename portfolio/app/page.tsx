import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import { projects } from './lib/data';
import { skills } from './lib/skills';
import SkillCard from './components/SkillCard';
import { experiences } from './lib/experience';
import TimelineItem from './components/TimelineItem';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gray-950 text-white flex items-center">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4">
            Hi, I'm Hima 👋
          </h1>
          <p className="text-2xl text-gray-400 mb-2">
            Full Stack Developer
          </p>
          <p className="text-xl text-gray-500 mb-8">
            Chemical Engineer | Competitive Programmer | Tech Lead
          </p>

          {/* Quick Stats */}
          <div className="flex gap-8 mb-8 text-sm">
            <div>
              <div className="text-2xl font-bold text-blue-400">300+</div>
              <div className="text-gray-500">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">2x</div>
              <div className="text-gray-500">Internships</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">1448</div>
              <div className="text-gray-500">Codeforces</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">₹1.29Cr</div>
              <div className="text-gray-500">Budget Managed</div>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition"
            >
              View My Work
            </a>
            <button className="border border-blue-600 hover:bg-blue-600 px-6 py-3 rounded-lg transition">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-gray-900 text-white flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl text-gray-400 mb-6">
                I'm a Full Stack Developer and M.Tech student at IIT Kharagpur,
                specializing in Chemical Engineering with a passion for building
                scalable web applications.
              </p>
              <p className="text-lg text-gray-400 mb-6">
                My unique background combines process engineering with modern software
                development, allowing me to approach problems from both analytical and
                creative perspectives.
              </p>
              <p className="text-lg text-gray-400">
                Currently serving as General Secretary Mess, managing ₹1.29 crore budget
                for 445 students while preparing for software engineering placements.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">What I Do</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold text-lg">Full Stack Development</h4>
                  <p className="text-gray-400">React, Next.js, Node.js, Express</p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-bold text-lg">Process Engineering</h4>
                  <p className="text-gray-400">Reactor simulation, modeling, optimization</p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-bold text-lg">Competitive Programming</h4>
                  <p className="text-gray-400">Specialist on Codeforces, 3⭐ CodeChef</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="skills" className="min-h-screen bg-gray-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-xl text-gray-400 mb-12">
            Technologies I work with regularly
          </p>

          <div className="space-y-12">
            {skills.map((skillCategory, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mb-6 text-blue-400">
                  {skillCategory.category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <SkillCard
                      key={skillIndex}
                      name={skill.name}
                      icon={skill.icon}
                      proficiency={skill.proficiency}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="min-h-screen bg-gray-900 text-white py-20">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold mb-4">Experience & Education</h2>
    <p className="text-xl text-gray-400 mb-12">
      My journey through work, leadership, and academics
    </p>
    
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <TimelineItem key={exp.id} experience={exp} index={index} />
      ))}
    </div>
  </div>
</section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen bg-gray-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-400 mb-12">
            A selection of my work across web development, IoT, and academic research
          </p>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gray-900 text-white py-20 flex items-center">
  <div className="max-w-6xl mx-auto px-4 w-full">
    <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
    <p className="text-xl text-gray-400 mb-12">
      I'm currently open for SDE roles and freelance opportunities.
      Let's build something amazing together!
    </p>
    
    <div className="grid md:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
        <div className="space-y-4">
          <a href="mailto:your.email@example.com" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition">
            <span className="text-2xl">📧</span>
            <span>your.email@example.com</span>
          </a>
          <a href="https://github.com/yourusername" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">
            <span className="text-2xl">💻</span>
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/yourusername" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">
            <span className="text-2xl">💼</span>
            <span>LinkedIn</span>
          </a>
          <a href="https://codeforces.com/profile/yourusername" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">
            <span className="text-2xl">⚔️</span>
            <span>Codeforces</span>
          </a>
        </div>

        <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-semibold mb-2">📍 Location</h4>
          <p className="text-gray-400">IIT Kharagpur, West Bengal, India</p>
        </div>

        <div className="mt-4 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-semibold mb-2">🎯 Availability</h4>
          <p className="text-gray-400">Open for full-time SDE roles starting June 2025</p>
        </div>
      </div>
      
      {/* Contact Form */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
        <ContactForm />
      </div>
    </div>
  </div>
</section>
      
      <Footer />
    </>
  );
}