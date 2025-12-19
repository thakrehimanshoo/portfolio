'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SkillOrb from './SkillOrb';

const skills = [
  { name: 'React', icon: '⚛️', color: '#61dafb', position: [0, 2, 0] },
  { name: 'Next.js', icon: '▲', color: '#000000', position: [-2, 0, 1] },
  { name: 'TypeScript', icon: 'TS', color: '#3178c6', position: [2, 0, 1] },
  { name: 'Node.js', icon: '🟢', color: '#339933', position: [0, -2, 0] },
  { name: 'Python', icon: '🐍', color: '#3776ab', position: [-2, 1, -1] },
  { name: 'C++', icon: '⚙️', color: '#00599c', position: [2, 1, -1] },
  { name: 'MongoDB', icon: '🍃', color: '#47a248', position: [-2, -1, -1] },
  { name: 'AWS', icon: '☁️', color: '#ff9900', position: [2, -1, -1] },
];

export default function SkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

      {skills.map((skill, index) => (
        <SkillOrb
          key={index}
          position={skill.position as [number, number, number]}
          skill={skill.name}
          color={skill.color}
          icon={skill.icon}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
      />
    </Canvas>
  );
}