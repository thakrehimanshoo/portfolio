'use client';

import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface PlayerPositionTrackerProps {
  playerRef: React.RefObject<Mesh | null>;
  onPositionUpdate: (position: { x: number; z: number }) => void;
}

export default function PlayerPositionTracker({ 
  playerRef, 
  onPositionUpdate 
}: PlayerPositionTrackerProps) {
  useFrame(() => {
    if (playerRef.current) {
      onPositionUpdate({
        x: playerRef.current.position.x,
        z: playerRef.current.position.z,
      });
    }
  });

  return null;
}    