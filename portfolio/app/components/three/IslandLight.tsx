'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointLight } from 'three';

interface IslandLightProps {
  position: [number, number, number];
  color: string;
}

export default function IslandLight({ position, color }: IslandLightProps) {
  const lightRef = useRef<PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 1;
      lightRef.current.intensity = pulse * 2;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[position[0], position[1] + 2, position[2]]}
      color={color}
      intensity={2}
      distance={8}
      decay={2}
    />
  );
}