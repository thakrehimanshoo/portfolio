export interface Skill {
  category: string;
  items: {
    name: string;
    icon: string;
    proficiency: number; // 1-5
  }[];
}

export const skills: Skill[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "⚛️", proficiency: 5 },
      { name: "Next.js", icon: "▲", proficiency: 5 },
      { name: "TypeScript", icon: "📘", proficiency: 4 },
      { name: "Tailwind CSS", icon: "🎨", proficiency: 5 },
      { name: "HTML/CSS", icon: "🌐", proficiency: 5 },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "🟢", proficiency: 5 },
      { name: "Express", icon: "🚂", proficiency: 5 },
      { name: "MongoDB", icon: "🍃", proficiency: 4 },
      { name: "PostgreSQL", icon: "🐘", proficiency: 4 },
      { name: "REST APIs", icon: "🔌", proficiency: 5 },
    ]
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git", icon: "📦", proficiency: 5 },
      { name: "Docker", icon: "🐳", proficiency: 3 },
      { name: "AWS", icon: "☁️", proficiency: 3 },
      { name: "Python", icon: "🐍", proficiency: 4 },
      { name: "C++", icon: "⚙️", proficiency: 5 },
    ]
  }
];