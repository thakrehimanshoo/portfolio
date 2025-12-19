'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, Group } from 'three';

interface TeleportPortalProps {
  position: [number, number, number];
  targetPosition: [number, number, number];
  label: string;
  color: string;
  playerRef: React.RefObject<Mesh | null>;
  portalId: string;
}

// Global cooldown - prevents ALL portals from activating
let globalTeleportCooldown = false;

export default function TeleportPortal({
  position,
  targetPosition,
  label,
  color,
  playerRef,
  portalId,
}: TeleportPortalProps) {
  const groupRef = useRef<Group>(null);
  const portalRef = useRef<Mesh>(null);
  const [isNear, setIsNear] = useState(false);
  const wasInsideRef = useRef(false);

  useFrame((state) => {
    if (!playerRef.current || !groupRef.current) return;

    const dx = playerRef.current.position.x - groupRef.current.position.x;
    const dz = playerRef.current.position.z - groupRef.current.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    const isInside = distance < 1.2;
    setIsNear(distance < 2.5);

    // Only teleport if:
    // 1. Player is inside portal NOW
    // 2. Player was NOT inside portal before (entering, not exiting)
    // 3. No global cooldown active
    if (isInside && !wasInsideRef.current && !globalTeleportCooldown) {
      console.log(`✨ Teleporting via ${portalId}`);
      
      // Activate global cooldown
      globalTeleportCooldown = true;
      
      // Teleport
      playerRef.current.position.x = targetPosition[0];
      playerRef.current.position.y = targetPosition[1];
      playerRef.current.position.z = targetPosition[2];
      
      // Release cooldown after 3 seconds
      setTimeout(() => {
        globalTeleportCooldown = false;
        console.log('✅ Portals ready');
      }, 3000);
    }

    // Track if player is inside
    wasInsideRef.current = isInside;

    // Rotate portal
    if (portalRef.current) {
      portalRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Base platform */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.3, 16]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          emissive={isNear ? color : '#000000'}
          emissiveIntensity={isNear ? 0.3 : 0}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <torusGeometry args={[1.3, 0.08, 16, 32]} />
        <meshBasicMaterial color={color} transparent opacity={isNear ? 0.6 : 0.3} />
      </mesh>

      {/* Main portal ring */}
      <mesh ref={portalRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <torusGeometry args={[1, 0.12, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isNear ? 1.2 : 0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Portal center (swirling) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <circleGeometry args={[0.95, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={isNear ? 0.5 : 0.3}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {label}
      </Text>

      {/* Active indicator */}
      {isNear && !globalTeleportCooldown && (
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.2}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          ⚡ READY ⚡
        </Text>
      )}

      {/* Cooldown indicator */}
      {isNear && globalTeleportCooldown && (
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.2}
          color="#ff0000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          ⏳ COOLING DOWN
        </Text>
      )}

      {/* Pulsing rings when active */}
      {isNear && !globalTeleportCooldown && (
        <>
          <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.4, 1.6, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.3}
            />
          </mesh>
          <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.6, 1.8, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.2}
            />
          </mesh>
        </>
      )}
    </group>
  );
}