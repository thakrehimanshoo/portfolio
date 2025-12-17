'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProjectImage({ src, alt, className = "" }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false);

  // Get a consistent gradient based on the first letter (for fallback)
  const getGradient = (text: string) => {
    const gradients = [
      'from-blue-900 to-purple-900',
      'from-green-900 to-teal-900',
      'from-orange-900 to-red-900',
      'from-pink-900 to-purple-900',
      'from-indigo-900 to-blue-900',
      'from-yellow-900 to-orange-900',
    ];
    const index = text.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  // If image fails to load, show gradient fallback
  if (imageError) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br ${getGradient(alt)} ${className}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-8xl font-bold text-white/30 mb-4">
            {alt.charAt(0)}
          </span>
          <span className="text-2xl font-semibold text-white/50 px-4 text-center">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gray-800 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        priority={false}
      />
    </div>
  );
}