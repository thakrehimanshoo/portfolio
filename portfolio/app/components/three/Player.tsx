'use client';

import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, Group } from 'three';
import { useKeyboard } from '@/app/lib/hooks/useKeyboard';

interface PlayerProps {
  position?: [number, number, number];
}

const Player = forwardRef<Mesh, PlayerProps>(({ position = [0, 0.5, 0] }, ref) => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const velocity = useRef(new Vector3());
  const targetVelocity = useRef(new Vector3());
  const keys = useKeyboard();
  
  const [isMoving, setIsMoving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const jumpVelocity = useRef(0);

  useImperativeHandle(ref, () => meshRef.current as Mesh);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const speed = 5;
    const acceleration = 0.15;
    const direction = new Vector3();

    // Calculate movement
    if (keys.forward) direction.z -= 1;
    if (keys.backward) direction.z += 1;
    if (keys.left) direction.x -= 1;
    if (keys.right) direction.x += 1;

    const isCurrentlyMoving = direction.length() > 0;
    setIsMoving(isCurrentlyMoving);

    if (isCurrentlyMoving) {
      direction.normalize();
    }

    // Smooth movement
    targetVelocity.current.set(
      direction.x * speed,
      0,
      direction.z * speed
    );

    velocity.current.lerp(targetVelocity.current, acceleration);

    meshRef.current.position.x += velocity.current.x * delta;
    meshRef.current.position.z += velocity.current.z * delta;

    // Boundaries
    const boundary = 25;
    meshRef.current.position.x = Math.max(-boundary, Math.min(boundary, meshRef.current.position.x));
    meshRef.current.position.z = Math.max(-boundary, Math.min(boundary, meshRef.current.position.z));

    // Smooth rotation
    if (isCurrentlyMoving) {
      const targetAngle = Math.atan2(direction.x, direction.z);
      const currentAngle = meshRef.current.rotation.y;
      
      let angleDiff = targetAngle - currentAngle;
      if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      
      meshRef.current.rotation.y += angleDiff * 0.1;
    }

    // Jump mechanic
    if (keys.jump && !isJumping) {
      setIsJumping(true);
      jumpVelocity.current = 6;
    }

    // Apply jump physics
    if (isJumping) {
      jumpVelocity.current -= 20 * delta; // Gravity
      meshRef.current.position.y += jumpVelocity.current * delta;

      // Land
      if (meshRef.current.position.y <= position[1]) {
        meshRef.current.position.y = position[1];
        setIsJumping(false);
        jumpVelocity.current = 0;
      }
    }

    // Walking bob animation
    if (isCurrentlyMoving && !isJumping) {
      meshRef.current.position.y = position[1] + Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.1;
      
      // Arms swing
      if (groupRef.current) {
        const armSwing = Math.sin(state.clock.elapsedTime * 10) * 0.3;
        groupRef.current.rotation.z = armSwing * 0.1;
      }
    } else if (!isJumping) {
      meshRef.current.position.y = position[1];
      if (groupRef.current) {
        groupRef.current.rotation.z *= 0.9; // Smooth return
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <group ref={groupRef}>
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.3, 1.2, 8]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial 
            color="#60a5fa"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.15, 0.9, 0.3]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.15, 0.9, 0.3]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Pupils */}
        <mesh position={[0.15, 0.9, 0.37]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[-0.15, 0.9, 0.37]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Arms */}
        <mesh position={[0.45, 0.2, 0]} rotation={[0, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.8, 6]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
        <mesh position={[-0.45, 0.2, 0]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.8, 6]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>

        {/* Legs */}
        <mesh position={[0.15, -0.8, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 6]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[-0.15, -0.8, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 6]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>

        {/* Glow ring at feet */}
        <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.6, 32]} />
          <meshBasicMaterial 
            color="#3b82f6" 
            transparent 
            opacity={isMoving ? 0.6 : 0.3}
          />
        </mesh>

        {/* Jump indicator */}
        {isJumping && (
          <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.8, 32]} />
            <meshBasicMaterial 
              color="#00ff00" 
              transparent 
              opacity={0.5}
            />
          </mesh>
        )}
      </group>
    </mesh>
  );
});

Player.displayName = 'Player';

export default Player;