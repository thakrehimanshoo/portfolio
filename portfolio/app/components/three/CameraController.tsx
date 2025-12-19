'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Mesh } from 'three';

interface CameraControllerProps {
  target: React.RefObject<Mesh | null>;
}

export default function CameraController({ target }: CameraControllerProps) {
  const { camera } = useThree();
  const offset = useRef(new Vector3(0, 5, 8));
  const currentLookAt = useRef(new Vector3());

  useFrame(() => {
    if (!target.current) return;

    // Smoother camera position follow
    const targetPosition = new Vector3();
    targetPosition.copy(target.current.position);
    targetPosition.add(offset.current);

    // Slower lerp for smoother follow (0.05 instead of 0.1)
    camera.position.lerp(targetPosition, 0.05);

    // Smoother look-at
    const lookAtPosition = new Vector3();
    lookAtPosition.copy(target.current.position);
    lookAtPosition.y += 1;

    // Smooth look-at transition
    currentLookAt.current.lerp(lookAtPosition, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}