'use client';

import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import InteractiveCube from './InteractiveCube';
import Particles from './Particles';

function FloatingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function Torus({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh position={position} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.8, 0.3, 12, 50]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#3b82f6" />
      
      <Particles count={500} />
      
      <InteractiveCube position={[-2.5, 1, -1]} color="#3b82f6" />
      <InteractiveCube position={[2.5, -1, -1.5]} color="#8b5cf6" />
      
      <FloatingSphere position={[0, 2, -2]} color="#10b981" />
      <Torus position={[-2, -1.5, -2]} color="#ec4899" />
      <Torus position={[2, 1.5, -2.5]} color="#06b6d4" />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}