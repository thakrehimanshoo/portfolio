'use client';

import { motion } from 'framer-motion';
import { Experience } from '../lib/experience';

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export default function TimelineItem({ experience, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;
  
  // Different colors for different types
  const typeColors = {
    work: 'border-blue-500',
    leadership: 'border-purple-500',
    education: 'border-green-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content */}
      <div className="flex-1">
        <div className={`bg-gray-800 rounded-lg p-6 border-l-4 ${typeColors[experience.type]}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold">{experience.title}</h3>
              <div className="text-blue-400 font-semibold">{experience.company}</div>
            </div>
            <span className="text-sm text-gray-500">{experience.period}</span>
          </div>
          
          <p className="text-gray-400 mb-4">{experience.description}</p>
          
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-sm">Key Achievements:</h4>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-gray-400 flex gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech, i) => (
              <span
                key={i}
                className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${typeColors[experience.type].replace('border', 'bg')} mt-2`} />
        {index < 3 && <div className="w-0.5 h-full bg-gray-700 mt-2" />}
      </div>
      
      {/* Empty space for alternating layout */}
      <div className="flex-1" />
    </motion.div>
  );
}