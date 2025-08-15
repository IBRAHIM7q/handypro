"use client";

import Image from "next/image";

export default function AnimatedLogo() {
  return (
    <div className="relative w-40 h-12 flex items-center">
      <Image 
        src="/logo.png" 
        alt="HandyPro Logo" 
        width={160} 
        height={48} 
        className="object-contain hover:scale-105 transition-transform duration-300"
        priority
      />
    </div>
  );
}