'use client';

import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Object3D } from 'three';

export function useProximity(
  player: React.RefObject<Object3D | null>,
  target: Vector3,
  threshold: number = 3
) {
  const [isNear, setIsNear] = useState(false);
  const [distance, setDistance] = useState(999);

  useFrame(() => {
    if (!player.current) return;

    const dist = player.current.position.distanceTo(target);
    setDistance(dist);
    
    // Add hysteresis to prevent flickering
    if (dist < threshold && !isNear) {
      setIsNear(true);
    } else if (dist > threshold + 0.5 && isNear) {
      setIsNear(false);
    }
  });

  return { isNear, distance };
}