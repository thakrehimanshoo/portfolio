'use client';

import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  icon: string;
  proficiency: number;
}

export default function SkillCard({ name, icon, proficiency }: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-800 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer"
    >
      <div className="text-4xl">{icon}</div>
      <div className="font-semibold text-center">{name}</div>
      
      {/* Proficiency bars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < proficiency ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}