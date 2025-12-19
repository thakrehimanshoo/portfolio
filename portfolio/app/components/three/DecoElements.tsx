'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface FloatingCrystalProps {
  position: [number, number, number];
  color: string;
}

export function FloatingCrystal({ position, color }: FloatingCrystalProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

interface RockProps {
  position: [number, number, number];
  scale?: number;
}

export function Rock({ position, scale = 1 }: RockProps) {
  return (
    <mesh position={position} scale={scale} rotation={[0, Math.random() * Math.PI, 0]}>
      <dodecahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial 
        color="#4a5568"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

interface PillarProps {
  position: [number, number, number];
  height?: number;
}

export function Pillar({ position, height = 2 }: PillarProps) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.2, 0.25, height, 8]} />
        <meshStandardMaterial 
          color="#334155"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      {/* Top crystal */}
      <mesh position={[0, height + 0.3, 0]}>
        <octahedronGeometry args={[0.2]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}