'use client';

import { useState, useEffect, useRef } from 'react';
import WorldScene from '../components/three/WorldScene';
import ProjectModal from '../components/ProjectModal';
import MiniMap from '../components/MiniMap';
import ProgressTracker from '../components/ProgressTracker';
import { projects } from '../lib/data';

export default function WorldPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 0 });
  const [visitedProjects, setVisitedProjects] = useState<Set<number>>(new Set());
  const [debugInfo, setDebugInfo] = useState('');


  const nearProjectRef = useRef<number | null>(null);

  const project = selectedProject !== null 
    ? projects.find(p => p.id === selectedProject) || null
    : null;

  // Track visited projects
  useEffect(() => {
    if (selectedProject !== null) {
      setVisitedProjects(prev => new Set([...prev, selectedProject]));
    }
  }, [selectedProject]);
  useEffect(() => {
  const interval = setInterval(() => {
    if (nearProjectRef.current !== null) {
      setDebugInfo(`Near Project: ${nearProjectRef.current}`);
    } else {
      setDebugInfo(`Position: ${playerPosition.x.toFixed(1)}, ${playerPosition.z.toFixed(1)}`);
    }
  }, 100);
  return () => clearInterval(interval);
}, [playerPosition, nearProjectRef]);

  // Listen for E key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        if (nearProjectRef.current !== null) {
          setSelectedProject(nearProjectRef.current);
        }
      }
      
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const islandPositions: [number, number, number][] = [
    [5, 0, -5],
    [-5, 0, -5],
    [0, 0, -10],
    [-7, 0, 2],
    [7, 0, 2],
  ];

  const islandColors = [
    '#3b82f6',
    '#8b5cf6',
    '#10b981',
    '#ef4444',
    '#f59e0b',
  ];

  const islands = projects.slice(0, 5).map((project, index) => ({
    id: project.id,
    position: islandPositions[index],
    title: project.title,
    color: islandColors[index],
  }));

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-950">
      {/* 3D World */}
      <WorldScene 
        nearProjectRef={nearProjectRef}
        onPositionUpdate={setPlayerPosition}
      />
      
      {/* Project Modal */}
      <ProjectModal 
        project={project} 
        onClose={() => setSelectedProject(null)} 
      />
      
      {/* Progress Tracker */}
      <ProgressTracker 
        visitedProjects={visitedProjects}
        totalProjects={5}
      />
      
      {/* Mini Map */}
      <MiniMap 
        playerPosition={playerPosition}
        islands={islands}
      />
      
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10 pointer-events-none">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Hima's Interactive Portfolio</h1>
          <a 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition pointer-events-auto"
          >
            Back to Home
          </a>
        </div>
      </div>
      <div className="absolute top-32 left-6 text-white bg-black/70 p-3 rounded">
  {debugInfo}
</div>
   
      {/* Controls instruction */}
<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
  <div className="bg-black/70 backdrop-blur-sm px-8 py-4 rounded-lg text-white text-center border-2 border-blue-500/30">
    <p className="font-semibold mb-3 text-lg">Controls</p>
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
      <span>W/↑ Forward</span>
      <span>S/↓ Backward</span>
      <span>A/← Left</span>
      <span>D/→ Right</span>
      <span className="text-green-400 font-bold">E - Interact</span>
      <span className="text-yellow-400 font-bold">SPACE - Jump</span>
    </div>
  </div>
</div>
    </main>
  );
}