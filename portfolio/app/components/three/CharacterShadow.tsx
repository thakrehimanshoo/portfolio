'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, MeshBasicMaterial } from 'three';

interface CharacterShadowProps {
  playerRef: React.RefObject<Mesh | null>;
}

export default function CharacterShadow({ playerRef }: CharacterShadowProps) {
  const shadowRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!playerRef.current || !shadowRef.current) return;

    // Position shadow under player
    shadowRef.current.position.x = playerRef.current.position.x;
    shadowRef.current.position.z = playerRef.current.position.z;

    // Scale shadow based on player height (jump)
    const height = playerRef.current.position.y;
    const scale = 1 - (height - 0.5) * 0.3;
    shadowRef.current.scale.set(scale, scale, scale);

    // Fade shadow based on height
    const opacity = Math.max(0.3, 1 - (height - 0.5) * 0.5);
    if (shadowRef.current.material instanceof MeshBasicMaterial) {
      shadowRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={shadowRef} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.5, 32]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.5} />
    </mesh>
  );
}