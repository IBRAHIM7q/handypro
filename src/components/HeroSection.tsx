"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HeroSectionProps {
  darkMode: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  translations: any;
  language: "de" | "ar";
}

export default function HeroSection({ darkMode, setIsContactModalOpen, translations, language }: HeroSectionProps) {
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 ${
        darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-pulse ${
              darkMode ? "bg-slate-600/10" : "bg-slate-600/5"
            }`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated title */}
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-slate-500 via-gray-400 to-slate-600 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </h1>

          {/* Animated subtitle */}
          <p 
            className={`text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto transition-all duration-1000 delay-200 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            } ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            {t.hero.subtitle}
          </p>

          {/* Animated CTA button */}
          <div 
            className={`flex flex-col sm:flex-row justify-center items-center gap-6 mb-20 transition-all duration-1000 delay-400 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Button 
              onClick={() => setIsContactModalOpen(true)} 
              size="lg" 
              className="bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 text-white text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">📱</span>
              {t.hero.cta}
            </Button>
          </div>

          {/* Animated stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: t.hero.customers, label: t.hero.customersLabel, icon: "👥", color: "from-slate-500 to-gray-600" },
              { value: t.hero.repairs, label: t.hero.repairsLabel, icon: "🔧", color: "from-zinc-500 to-gray-600" },
              { value: t.hero.quality, label: t.hero.qualityLabel, icon: "⭐", color: "from-neutral-500 to-gray-600" }
            ].map((stat, index) => (
              <Card 
                key={index}
                className={`p-8 transition-all duration-1000 delay-${index * 200} transform hover:scale-105 hover:shadow-xl ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } ${darkMode ? "bg-gray-900/80 backdrop-blur-sm border-gray-800" : "bg-white/80 backdrop-blur-sm border-gray-200"}`}
              >
                <CardContent className="text-center p-0">
                  <div className={`text-5xl mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-500 to-gray-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-8 h-12 rounded-full border-4 flex justify-center ${
          darkMode ? "border-gray-700" : "border-gray-300"
        }`}>
          <div className={`w-2 h-2 rounded-full mt-2 ${
            darkMode ? "bg-slate-500" : "bg-slate-500"
          }`}></div>
        </div>
      </div>
    </section>
  );
}