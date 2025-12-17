export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
  type: 'work' | 'leadership' | 'education';
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "Insteasy",
    location: "Remote",
    period: "Jun 2024 - Aug 2024",
    description: "Second internship focusing on advanced integrations and CI/CD",
    achievements: [
      "Built PayPal integration increasing subscription conversions by 35%",
      "Developed monday.com embeddings-based plugins",
      "Implemented CI/CD pipeline using Lovable platform",
      "Optimized marketing website with SEO best practices"
    ],
    tech: ["React", "Node.js", "PayPal API", "monday.com SDK", "CI/CD"],
    type: "work"
  },
  {
    id: 2,
    title: "Full Stack Developer Intern",
    company: "Insteasy",
    location: "Remote",
    period: "Feb 2024 - May 2024",
    description: "First internship focusing on core platform development",
    achievements: [
      "Improved application load speed by 25%",
      "Reduced user drop-off by 20% through UX improvements",
      "Built real-time features using Server-Sent Events",
      "Developed responsive web applications"
    ],
    tech: ["React", "Express", "MongoDB", "SSE"],
    type: "work"
  },
  {
    id: 3,
    title: "General Secretary - Mess",
    company: "IIT Kharagpur",
    location: "Kharagpur, India",
    period: "Apr 2024 - Present",
    description: "Managing mess operations and budget for 445 students",
    achievements: [
      "Managing ₹1.29 crore annual budget",
      "Overseeing operations for 445 students",
      "Coordinating with vendors and administration",
      "Implementing feedback systems"
    ],
    tech: ["Leadership", "Budget Management", "Operations"],
    type: "leadership"
  },
  {
    id: 4,
    title: "M.Tech Chemical Engineering",
    company: "IIT Kharagpur",
    location: "Kharagpur, India",
    period: "2023 - 2025",
    description: "Specialization in Process Engineering and Simulation",
    achievements: [
      "Thesis: Simulation of FCC Reactor using Aspen HYSYS",
      "Achieved 84.51% conversion in simulation model",
      "Validated against real plant data",
      "Published technical documentation"
    ],
    tech: ["Aspen HYSYS", "Process Simulation", "Data Analysis"],
    type: "education"
  }
];