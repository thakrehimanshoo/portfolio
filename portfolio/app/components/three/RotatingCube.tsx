'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function RotatingCube() {
  const meshRef = useRef<Mesh>(null);

  // This runs every frame (60 times per second)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* The shape - a box with size 2x2x2 */}
      <boxGeometry args={[2, 2, 2]} />
      
      {/* The material - how it looks */}
      <meshStandardMaterial 
        color="#3b82f6" 
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}