'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, Vector3, Group } from 'three';
import { useProximity } from '@/app/lib/hooks/useProximity';

interface ProjectIslandProps {
  position: [number, number, number];
  title: string;
  color: string;
  playerRef: React.RefObject<Mesh | null>;
  projectId: number;
  nearProjectRef: React.MutableRefObject<number | null>;
}

export default function ProjectIsland({ 
  position, 
  title, 
  color, 
  playerRef,
  projectId,
  nearProjectRef
}: ProjectIslandProps) {
  const groupRef = useRef<Group>(null);
  const targetPosition = new Vector3(...position);
  const { isNear, distance } = useProximity(playerRef, targetPosition, 3.5);

  // Update the ref directly - no state, no re-renders
  useFrame(() => {
    if (isNear) {
      nearProjectRef.current = projectId;
    } else if (nearProjectRef.current === projectId) {
      nearProjectRef.current = null;
    }
  });

  // Floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Platform base */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[2, 2.5, 1, 16]} />
        <meshStandardMaterial 
          color={isNear ? color : '#2d3748'}
          emissive={color}
          emissiveIntensity={isNear ? 0.5 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Floating sign */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.1]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={isNear ? 0.8 : 0.3}
        />
      </mesh>

      {/* Project title */}
      <Text
        position={[0, 1, 0.06]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {title}
      </Text>

      {/* Glow ring when near */}
      {isNear && (
        <>
          <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 3, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
          
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.3, 2.8, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.3} />
          </mesh>
        </>
      )}

      {/* Interaction prompt when near */}
      {isNear && (
        <group position={[0, 2.5, 0]}>
          <mesh>
            <boxGeometry args={[2, 0.5, 0.1]} />
            <meshBasicMaterial color="#000000" opacity={0.9} transparent />
          </mesh>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.2}
            color="#00ff00"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            ⚡ PRESS E ⚡
          </Text>
        </group>
      )}
    </group>
  );
}