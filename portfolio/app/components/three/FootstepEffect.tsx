'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface FootstepEffectProps {
  playerRef: React.RefObject<Mesh | null>;
}

interface Footstep {
  position: THREE.Vector3;
  life: number;
}

export default function FootstepEffect({ playerRef }: FootstepEffectProps) {
  const footstepsRef = useRef<Footstep[]>([]);
  const groupRef = useRef<Group>(null);
  const lastPositionRef = useRef(new THREE.Vector3());
  const distanceTraveledRef = useRef(0);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const currentPos = playerRef.current.position.clone();
    const distance = currentPos.distanceTo(lastPositionRef.current);
    
    distanceTraveledRef.current += distance;

    // Add footstep every 0.5 units traveled
    if (distanceTraveledRef.current > 0.5) {
      footstepsRef.current.push({
        position: currentPos.clone(),
        life: 1,
      });
      distanceTraveledRef.current = 0;

      // Keep only last 10 footsteps
      if (footstepsRef.current.length > 10) {
        footstepsRef.current.shift();
      }
    }

    lastPositionRef.current = currentPos.clone();

    // Update footstep life
    footstepsRef.current = footstepsRef.current.filter(footstep => {
      footstep.life -= delta * 0.8;
      return footstep.life > 0;
    });
  });

  return (
    <group ref={groupRef}>
      {footstepsRef.current.map((footstep, index) => (
        <mesh
          key={index}
          position={[footstep.position.x, 0.02, footstep.position.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.15, 16]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={footstep.life * 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}