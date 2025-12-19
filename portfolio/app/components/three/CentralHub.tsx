'use client';

import { Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export default function CentralHub() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Main platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3.5, 1, 32]} />
        <meshStandardMaterial 
          color="#1e293b"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Glowing center */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
        <meshStandardMaterial 
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Rotating rings */}
      <group ref={groupRef} position={[0, 1, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.05, 16, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <torusGeometry args={[2.2, 0.05, 16, 32]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Welcome text */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        HIMA's PORTFOLIO
      </Text>

      <Text
        position={[0, 2.3, 0]}
        fontSize={0.2}
        color="#60a5fa"
        anchorX="center"
        anchorY="middle"
      >
        Explore the islands to view projects
      </Text>

      {/* Directional markers */}
      <Text
        position={[0, 1.5, -3]}
        fontSize={0.25}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        ↑ PROJECTS
      </Text>

      <Text
        position={[3, 1.5, 0]}
        fontSize={0.25}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
      >
        → MORE PROJECTS
      </Text>

      {/* Light pillars */}
      <pointLight position={[0, 3, 0]} intensity={2} color="#3b82f6" distance={10} />
    </group>
  );
}