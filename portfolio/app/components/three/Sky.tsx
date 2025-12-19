'use client';

import * as THREE from 'three';

export default function Sky() {
  // Create gradient for sky
  const vertexShader = `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize(vWorldPosition).y;
      vec3 skyColor = mix(vec3(0.05, 0.05, 0.15), vec3(0.1, 0.15, 0.3), max(0.0, h));
      gl_FragColor = vec4(skyColor, 1.0);
    }
  `;

  return (
    <mesh>
      <sphereGeometry args={[500, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.BackSide}
      />
    </mesh>
  );
}