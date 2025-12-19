'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, ShaderMaterial } from 'three';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader material
const WaveMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 1.0) },
  // Vertex shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float time;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      float wave = sin(pos.x * 2.0 + time) * 0.1;
      pos.z += wave;
      vWave = wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform vec3 color;
    
    void main() {
      vec3 finalColor = color + vWave;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

export default function AnimatedSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={new WaveMaterial()} ref={materialRef} />
    </mesh>
  );
}