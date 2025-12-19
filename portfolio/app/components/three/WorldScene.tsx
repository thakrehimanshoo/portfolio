'use client';

import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import Player from './Player';
import Ground from './Ground';
import CameraController from './CameraController';
import ProjectIsland from './ProjectIsland';
import IslandLight from './IslandLight';
import AmbientParticles from './AmbientParticles';
import Sky from './Sky';
import PlayerPositionTracker from './PlayerPositionTracker';
import TeleportPortal from './TeleportPortal';
import FootstepEffect from './FootstepEffect';
import CharacterShadow from './CharacterShadow';
import CentralHub from './CentralHub';
import { FloatingCrystal, Rock, Pillar } from './DecoElements';
import { projects } from '@/app/lib/data';

interface WorldSceneProps {
  nearProjectRef: React.MutableRefObject<number | null>;
  onPositionUpdate: (position: { x: number; z: number }) => void;
}

export default function WorldScene({ nearProjectRef, onPositionUpdate }: WorldSceneProps) {
  const playerRef = useRef<Mesh | null>(null);

  // Better circular layout for all 6 projects
  const radius = 8;
  const islandPositions: [number, number, number][] = [
    [0, 0, -radius],           // North
    [radius * 0.87, 0, -radius * 0.5],  // NE
    [radius * 0.87, 0, radius * 0.5],   // SE
    [0, 0, radius],            // South
    [-radius * 0.87, 0, radius * 0.5],  // SW
    [-radius * 0.87, 0, -radius * 0.5], // NW
  ];

  const islandColors = [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#10b981', // green
    '#ef4444', // red
    '#f59e0b', // orange
    '#ec4899', // pink
  ];

  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: 60 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Sky />
      
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <pointLight position={[0, 8, 0]} intensity={1} color="#60a5fa" distance={30} />
      
      <fog attach="fog" args={['#0a0a15', 20, 60]} />
      
      <AmbientParticles count={200} />
      
      <Ground />
      
      {/* Central Hub */}
      <CentralHub />
      
      {/* Character and effects */}
      <Player ref={playerRef} position={[0, 0.5, 5]} />
      <CharacterShadow playerRef={playerRef} />
      <FootstepEffect playerRef={playerRef} />
      
      <CameraController target={playerRef} />
      
      <PlayerPositionTracker 
        playerRef={playerRef}
        onPositionUpdate={onPositionUpdate}
      />
      
      {/* All 6 Project Islands in circle */}
      {projects.map((project, index) => (
        <group key={project.id}>
          <ProjectIsland
            position={islandPositions[index]}
            title={project.title}
            color={islandColors[index]}
            playerRef={playerRef}
            projectId={project.id}
            nearProjectRef={nearProjectRef}
          />
          <IslandLight
            position={islandPositions[index]}
            color={islandColors[index]}
          />
        </group>
      ))}
      
      {/* Decorative crystals between islands */}
      <FloatingCrystal position={[4, 1, -6]} color="#3b82f6" />
      <FloatingCrystal position={[-4, 1, -6]} color="#8b5cf6" />
      <FloatingCrystal position={[6, 1, 0]} color="#10b981" />
      <FloatingCrystal position={[-6, 1, 0]} color="#f59e0b" />
      <FloatingCrystal position={[4, 1, 6]} color="#ef4444" />
      <FloatingCrystal position={[-4, 1, 6]} color="#ec4899" />
      
      {/* Pillars around the perimeter */}
      <Pillar position={[12, 0, -12]} height={3} />
      <Pillar position={[12, 0, 12]} height={2.5} />
      <Pillar position={[-12, 0, 12]} height={3} />
      <Pillar position={[-12, 0, -12]} height={2.5} />
      
      {/* Rocks scattered around */}
      <Rock position={[3, 0, 3]} scale={0.8} />
      <Rock position={[-3, 0, 4]} scale={1} />
      <Rock position={[5, 0, -2]} scale={0.6} />
      <Rock position={[-4, 0, -3]} scale={0.9} />
      <Rock position={[2, 0, -8]} scale={0.7} />
      <Rock position={[-2, 0, 8]} scale={0.8} />
      
      {/* Teleport Portals - Further out */}
      <TeleportPortal
        position={[0, 0, 15]}
        targetPosition={[0, 0, -15]}
        label="🌀 Far North"
        color="#3b82f6"
        playerRef={playerRef}
        portalId="portal-south-far"
      />
      <TeleportPortal
        position={[0, 0, -15]}
        targetPosition={[0, 0, 15]}
        label="🌀 Far South"
        color="#8b5cf6"
        playerRef={playerRef}
        portalId="portal-north-far"
      />
      <TeleportPortal
        position={[15, 0, 0]}
        targetPosition={[-15, 0, 0]}
        label="🌀 Far West"
        color="#10b981"
        playerRef={playerRef}
        portalId="portal-east-far"
      />
      <TeleportPortal
        position={[-15, 0, 0]}
        targetPosition={[15, 0, 0]}
        label="🌀 Far East"
        color="#f59e0b"
        playerRef={playerRef}
        portalId="portal-west-far"
      />
      
      <gridHelper args={[60, 60, '#1e293b', '#0f172a']} position={[0, 0.01, 0]} />
    </Canvas>
  );
}