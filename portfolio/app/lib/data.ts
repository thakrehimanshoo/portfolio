export interface Project{
    id: number;
    title: string;
    description : string;
    longDescription: string;
    tech: string[];
    image: string;
    metrics?: string;
    github?: string;
    demo?: string;

}

export const projects: Project[] = [
  {
    id: 1,
    title: "HeadsUp",
    description: "Real-time placement notification system serving 300+ users at IIT KGP",
    longDescription: "A comprehensive notification system that scrapes CDC portal and delivers real-time alerts to students using Server-Sent Events.",
    tech: ["React", "Node.js", "SSE", "Web Scraping"],
    image: "/projects/headsup.jpg",  // ← Must start with /
    metrics: "300+ active users",
    github: "https://github.com/yourusername/headsup",
  },
  {
    id: 2,
    title: "Insteasy Integration Platform",
    description: "Built PayPal integration increasing subscription conversions by 35%",
    longDescription: "Developed advanced integrations including PayPal payments, monday.com plugins, and CI/CD pipelines using Lovable platform.",
    tech: ["React", "Node.js", "PayPal API", "monday.com SDK", "CI/CD"],
    image: "/projects/insteasy.jpg",
    metrics: "35% conversion increase",
  },
  {
    id: 3,
    title: "FCC Reactor Simulation",
    description: "Aspen HYSYS simulation achieving 84.51% conversion validated against plant data",
    longDescription: "M.Tech thesis project simulating Fluid Catalytic Cracking reactor with comprehensive heat balance analysis.",
    tech: ["Aspen HYSYS", "Chemical Engineering", "Data Analysis"],
    image: "/projects/fcc.jpg",
    metrics: "84.51% conversion rate",
  },
  {
    id: 4,
    title: "Distract Tracker",
    description: "Webcam-based productivity monitoring using focus detection",
    longDescription: "AI-powered application that tracks user focus and provides productivity insights using computer vision.",
    tech: ["Python", "OpenCV", "Machine Learning", "React"],
    image: "/projects/distract.jpg",
  },
  {
    id: 5,
    title: "Blood Cell Disease Detection",
    description: "CNN model for automated blood cell analysis and disease detection",
    longDescription: "Deep learning model trained to identify various blood cell diseases from microscopy images.",
    tech: ["Python", "TensorFlow", "CNN", "Computer Vision"],
    image: "/projects/blood-cell.jpg",
  },
  {
    id: 6,
    title: "Custom Thread Library",
    description: "User-level thread library using Linux system calls",
    longDescription: "Built a custom threading library from scratch using low-level Linux system calls for educational purposes.",
    tech: ["C", "Linux", "System Programming"],
    image: "/projects/thread-library.jpg",
  }
];
