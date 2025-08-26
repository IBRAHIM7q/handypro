"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface FloatingParticlesProps {
  darkMode: boolean;
}

export default function FloatingParticles({ darkMode }: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Generate initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        color: darkMode 
          ? ['#60A5FA', '#A78BFA', '#34D399', '#F87171'][Math.floor(Math.random() * 4)]
          : ['#3B82F6', '#8B5CF6', '#10B981', '#EF4444'][Math.floor(Math.random() * 4)]
      });
    }
    setParticles(initialParticles);

    // Animation loop
    const animationInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.2 + 0.3
      })));
    }, 50);

    return () => clearInterval(animationInterval);
  }, [darkMode]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
      
      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode 
            ? 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)'
        }}
      />
    </div>
  );
}