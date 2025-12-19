'use client';

import { motion } from 'framer-motion';

interface ProgressTrackerProps {
  visitedProjects: Set<number>;
  totalProjects: number;
}

export default function ProgressTracker({ visitedProjects, totalProjects }: ProgressTrackerProps) {
  const percentage = (visitedProjects.size / totalProjects) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20"
    >
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-blue-500/30">
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold">Progress:</span>
          
          {/* Progress bar */}
          <div className="w-48 h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
          
          <span className="text-white font-mono">
            {visitedProjects.size}/{totalProjects}
          </span>
          
          {/* Trophy when complete */}
          {visitedProjects.size === totalProjects && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              🏆
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}