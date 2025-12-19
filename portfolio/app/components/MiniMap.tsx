'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MiniMapProps {
  playerPosition: { x: number; z: number };
  islands: Array<{
    id: number;
    position: [number, number, number];
    title: string;
    color: string;
  }>;
}

export default function MiniMap({ playerPosition, islands }: MiniMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Scale factor (world units to pixels)
    const scale = 8;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = -20; i <= 20; i += 5) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale, 0);
      ctx.lineTo(centerX + i * scale, canvas.height);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, centerY + i * scale);
      ctx.lineTo(canvas.width, centerY + i * scale);
      ctx.stroke();
    }

    // Draw islands
    islands.forEach((island) => {
      const x = centerX + island.position[0] * scale;
      const y = centerY + island.position[2] * scale;

      // Island circle
      ctx.fillStyle = island.color;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Island border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw player
    const playerX = centerX + playerPosition.x * scale;
    const playerY = centerY + playerPosition.z * scale;

    // Player glow
    const gradient = ctx.createRadialGradient(playerX, playerY, 0, playerX, playerY, 15);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(playerX - 15, playerY - 15, 30, 30);

    // Player triangle (pointing direction)
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.moveTo(playerX, playerY - 8);
    ctx.lineTo(playerX - 5, playerY + 6);
    ctx.lineTo(playerX + 5, playerY + 6);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [playerPosition, islands]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-24 right-6 z-20"
    >
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border-2 border-blue-500/30">
        <div className="text-white text-sm font-semibold mb-2 text-center">Map</div>
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="rounded"
        />
        <div className="mt-2 text-xs text-gray-400 text-center">
          Position: ({playerPosition.x.toFixed(1)}, {playerPosition.z.toFixed(1)})
        </div>
      </div>
    </motion.div>
  );
}