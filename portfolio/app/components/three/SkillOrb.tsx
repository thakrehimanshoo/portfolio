'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { Mesh } from 'three';

interface SkillOrbProps {
  position: [number, number, number];
  skill: string;
  color: string;
  icon: string;
}

export default function SkillOrb({ position, skill, color, icon }: SkillOrbProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Pulse effect when hovered
      const scale = hovered ? 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1 : 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Sphere */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </mesh>

        {/* Icon */}
        <Text
          position={[0, 0, 0.81]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>

        {/* Skill name (shown on hover) */}
        {hovered && (
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {skill}
          </Text>
        )}
      </group>
    </Float>
  );
}