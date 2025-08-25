"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Spline from '@splinetool/react-spline';

// Simple Error Boundary component
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface HeroSectionProps {
  darkMode: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  translations: any;
  language: "de" | "ar";
}

export default function HeroSection({ darkMode, setIsContactModalOpen, translations, language }: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [phoneRotation, setPhoneRotation] = useState({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Comprehensive mobile detection and viewport handling
    const detectMobileAndViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewportDimensions({ width, height });
      
      // Simplified mobile detection to prevent hydration issues
      const isMobileDevice = width <= 768;
      setIsMobile(isMobileDevice);
      
      console.log('Device detection:', { isMobileDevice, width, height });
    };
    
    // Initial detection and mount
    detectMobileAndViewport();
    setIsMounted(true);
    
    window.addEventListener('resize', detectMobileAndViewport);
    
    // Enhanced WebGL detection with mobile compatibility
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || 
                canvas.getContext('experimental-webgl') || 
                canvas.getContext('webgl2');
      
      if (!gl) {
        setHasWebGL(false);
        document.documentElement.classList.add('no-webgl');
      }
    } catch (e) {
      console.log('WebGL detection failed, but allowing rendering:', e);
    }
    
    // Initialize phone rotation animation with smoother transitions
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;
      
      const rect = phoneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // More subtle rotation effect (reduced multiplier from 10 to 5)
      const rotateY = ((e.clientX - centerX) / (window.innerWidth / 2)) * 5;
      const rotateX = ((e.clientY - centerY) / (window.innerHeight / 2)) * -5;
      
      setPhoneRotation({ x: rotateX, y: rotateY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', detectMobileAndViewport);
    };
  }, []);

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

  // CSS Variables for theme colors - Fixed color scheme
  const themeColors = {
    bgPrimary: darkMode ? '#0B0B0F' : '#f8f9fa',
    bgSecondary: darkMode ? '#1a1a1f' : '#e9ecef',
    textPrimary: darkMode ? '#ffffff' : '#212529',
    textSecondary: darkMode ? '#b8b8c8' : '#6c757d',
    // Fixed: Better color balance for both modes
    primaryNeon: darkMode ? '#9C8CFF' : '#8B5CF6', // Purple tones
    secondaryNeon: darkMode ? '#00C2FF' : '#06B6D4', // Cyan tones
    accentNeon: darkMode ? '#FF3C55' : '#EF4444', // Red tones
    cardBg: darkMode ? 'rgba(26, 26, 31, 0.7)' : 'rgba(255, 255, 255, 0.9)',
    glassBg: darkMode ? 'rgba(26, 26, 31, 0.5)' : 'rgba(255, 255, 255, 0.8)',
    // Fixed: Improved gradient that works well in both modes
    gradientText: darkMode 
      ? 'linear-gradient(135deg, #9C8CFF, #00C2FF)' 
      : 'linear-gradient(135deg, #1F2937, #374151)', // Dark gray gradient for light mode
    buttonText: darkMode ? '#ffffff' : '#ffffff',
    buttonOutlineText: darkMode ? '#ffffff' : '#1F2937', // Dark gray instead of blue
  };

  return (
    <section 
      id="hero"
      ref={heroRef}
      style={{ 
        backgroundColor: darkMode ? themeColors.bgPrimary : '#F1F5F9', // Lighter background for light mode
        color: themeColors.textPrimary,
      }}
      className="min-h-screen relative overflow-hidden pt-16 md:pt-20"
    >
      {/* Spline 3D Background - with responsive mobile optimization */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Adaptive gradient background based on theme - More subtle for light mode */}
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20'
            : 'bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-indigo-50/30'
        }`}></div>
        
        {/* Show loading state before hydration completes */}
        {!isMounted && (
          <div className={`absolute inset-0 animate-pulse ${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30'
              : 'bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-indigo-100/40'
          }`}></div>
        )}
        
        {/* Responsive 3D Background with mobile-optimized settings - Works in both modes */}
        {isMounted && (
          <>
            {/* Primary Spline iframe with responsive sizing - Enhanced for light mode */}
            <iframe 
              src='https://my.spline.design/orb-sSzmsjAvuweqMuCLtYgiULil/' 
              frameBorder='0' 
              width={isMobile ? '100%' : '120%'}
              height={isMobile ? '100%' : '120%'}
              style={{
                position: 'absolute',
                top: isMobile ? '0%' : '-10%',
                left: isMobile ? '0%' : '-10%',
                zIndex: 0,
                pointerEvents: 'none',
                transform: isMobile ? 'translate3d(0,0,0) scale(0.85)' : 'translate3d(0,0,0)',
                willChange: 'transform',
                // Make 3D background visible in light mode too
                opacity: darkMode ? 1 : (isMobile ? 0.4 : 0.6),
                mixBlendMode: darkMode ? 'normal' : 'multiply', // Blend mode for light mode
              }}
              title="3D Background"
              onError={() => console.log('Spline iframe failed to load')}
              loading="lazy"
            ></iframe>
            
            {/* Secondary Spline component with mobile responsiveness - Enhanced for light mode */}
            <div className="spline-background" style={{
              position: 'absolute',
              top: isMobile ? '-5%' : '-15%',
              left: isMobile ? '-5%' : '-15%',
              width: isMobile ? '110%' : '130%',
              height: isMobile ? '110%' : '130%',
              zIndex: -1,
              overflow: 'hidden',
              pointerEvents: 'none',
              transform: 'translate3d(0,0,0)',
              willChange: 'transform',
            }}>
              <div className="w-full h-full" style={{ 
                transform: isMobile 
                  ? 'scale(0.9) translate3d(0,0,0)' 
                  : 'scale(1.3) translate3d(0,0,0)',
                position: 'relative',
                bottom: isMobile ? '20px' : '50px',
                willChange: 'transform',
                // Adjust opacity for light mode visibility
                opacity: darkMode ? 1 : (isMobile ? 0.3 : 0.5),
                mixBlendMode: darkMode ? 'normal' : 'multiply',
              }}>
                <ErrorBoundary fallback={
                  <div className={`w-full h-full ${
                    darkMode 
                      ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30'
                      : 'bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-indigo-200/20'
                  }`}></div>
                }>
                  <Spline 
                    scene="https://prod.spline.design/kkxbabGl413xz3-h/scene.splinecode"
                    onLoad={() => {
                      console.log('Spline scene loaded successfully', {
                        isMobile,
                        viewport: viewportDimensions,
                        userAgent: navigator.userAgent.substring(0, 50)
                      });
                    }}
                    onError={(error) => {
                      console.log('Spline scene error:', error, {
                        isMobile,
                        viewport: viewportDimensions
                      });
                      // Fallback to gradient background on error
                    }}
                    style={{
                      transform: 'translate3d(0,0,0)',
                      willChange: 'transform',
                      width: '100%',
                      height: '100%',
                      // Apply blend mode for light mode compatibility
                      mixBlendMode: darkMode ? 'normal' : 'multiply',
                    }}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-4 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left column - Text content with reduced mobile spacing */}
          <div className={`transition-all duration-1000 transform mt-8 md:mt-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            {/* Animated title with better light mode colors */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 mt-4 md:mt-8">
              <span 
                className="neon-text"
                style={{ 
                  // Better contrasting colors for light mode
                  color: darkMode ? '#ffffff' : '#0F172A', // Very dark for light mode
                  textShadow: darkMode 
                    ? '0 0 20px rgba(156, 140, 255, 0.5), 0 0 40px rgba(0, 194, 255, 0.3)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.2)', // Stronger shadow for light mode
                  userSelect: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  lineHeight: '1.1',
                }}
              >
                {t.hero.title}
              </span>
            </h1>

            {/* Animated subtitle with better light mode contrast */}
            <p 
              className={`text-xl md:text-2xl mb-12 transition-all duration-1000 delay-200 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ 
                color: darkMode ? themeColors.textSecondary : '#374151', // Darker gray for light mode
                textShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.15)' // Better shadow
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Animated CTA button */}
            <div 
              className={`flex flex-col sm:flex-row gap-6 mb-12 transition-all duration-1000 delay-400 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Button 
                onClick={() => setIsContactModalOpen(true)} 
                size="lg" 
                className="btn-primary glow-hover"
                style={{ 
                  // Better button colors for both modes
                  background: darkMode ? '#9C8CFF' : '#3B82F6', // Purple for dark, blue for light
                  borderRadius: '50px',
                  padding: '12px 30px',
                  fontWeight: 600,
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1,
                  transition: 'all 0.3s ease',
                  color: '#ffffff',
                  boxShadow: darkMode 
                    ? '0 0 15px rgba(156, 140, 255, 0.5)' 
                    : '0 4px 12px rgba(59, 130, 246, 0.3)',
                  border: 'none',
                }}
              >
                <i className="mr-2">📱</i>
                {t.hero.cta}
              </Button>
              
              <Button 
                variant="outline"
                size="lg" 
                className="btn-secondary"
                style={{ 
                  background: 'transparent',
                  // Better border and text colors for both modes
                  border: darkMode 
                    ? `2px solid ${themeColors.primaryNeon}` 
                    : `2px solid #3B82F6`,
                  borderRadius: '50px',
                  padding: '10px 28px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  // Better text color for both modes
                  color: darkMode ? '#ffffff' : '#3B82F6',
                }}
              >
                <i className="mr-2">ℹ️</i>
                {t.hero.learnMore || "Mehr erfahren"}
              </Button>
            </div>

            {/* Animated stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { value: t.hero.customers, label: t.hero.customersLabel, icon: "👥", color: themeColors.primaryNeon },
                { value: t.hero.repairs, label: t.hero.repairsLabel, icon: "🔧", color: themeColors.secondaryNeon },
                { value: t.hero.quality, label: t.hero.qualityLabel, icon: "⭐", color: themeColors.accentNeon }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`glass card-3d transition-all duration-1000 delay-${index * 200} transform ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{
                    background: themeColors.glassBg,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <p style={{ color: themeColors.textSecondary, fontSize: '0.9rem' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - 3D Phone */}
          <div 
            ref={phoneRef}
            className={`hidden md:flex justify-center items-center transition-all duration-1000 delay-300 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div 
              className="relative"
              style={{
                transform: `rotateX(${phoneRotation.x}deg) rotateY(${phoneRotation.y}deg)`,
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Phone body */}
              <div 
                className="phone-body"
                style={{
                  width: '280px',
                  height: '560px',
                  borderRadius: '40px',
                  background: darkMode ? '#222' : '#111',
                  border: '10px solid #333',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 20px 50px rgba(0,0,0,0.5), 
                              0 0 30px ${themeColors.primaryNeon}40 inset,
                              0 0 20px ${themeColors.secondaryNeon}30`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Phone screen */}
                <div 
                  className="phone-screen"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(45deg, ${themeColors.bgPrimary}, ${themeColors.bgSecondary})`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    color: themeColors.textPrimary,
                    textAlign: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Logo on screen */}
                  <div 
                    className="logo-container"
                    style={{
                      marginBottom: '20px',
                      animation: 'pulse 2s infinite',
                    }}
                  >
                    <div 
                      className="logo"
                      style={{
                        fontSize: '40px',
                        fontWeight: 'bold',
                        background: `linear-gradient(135deg, ${themeColors.primaryNeon}, ${themeColors.secondaryNeon})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      HandyPro
                    </div>
                  </div>
                  
                  {/* Text on screen */}
                  <p style={{ fontSize: '14px', marginBottom: '30px', color: themeColors.textSecondary }}>
                    Professionelle Reparaturen
                  </p>
                  
                  {/* Animated elements on screen */}
                  <div 
                    className="screen-elements"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                      width: '80%',
                    }}
                  >
                    {[1, 2, 3].map((_, i) => (
                      <div 
                        key={i}
                        style={{
                          height: '10px',
                          width: '100%',
                          background: `linear-gradient(90deg, ${themeColors.primaryNeon}${20 + i * 20}, ${themeColors.secondaryNeon}${20 + i * 20})`,
                          borderRadius: '5px',
                          animation: `pulse 1.5s infinite ${i * 0.3}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Phone reflection */}
                <div 
                  className="phone-reflection"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
                    pointerEvents: 'none',
                  }}
                />
                
                {/* Phone notch */}
                <div 
                  className="phone-notch"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '25px',
                    background: '#000',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    zIndex: 10,
                  }}
                />
              </div>
              
              {/* Phone shadow */}
              <div 
                className="phone-shadow"
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '10%',
                  width: '80%',
                  height: '20px',
                  background: 'rgba(0,0,0,0.2)',
                  filter: 'blur(15px)',
                  borderRadius: '50%',
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="flex justify-center items-center"
          style={{
            width: '32px',
            height: '48px',
            borderRadius: '20px',
            border: `2px solid ${themeColors.primaryNeon}50`,
          }}
        >
          <div 
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: themeColors.primaryNeon,
            }}
          ></div>
        </div>
      </div>
      
      {/* Add custom styles for animations with improved color handling */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.6; transform: scale(0.98); }
        }
        
        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg);
          box-shadow: 0 15px 30px ${darkMode ? 'rgba(156, 140, 255, 0.3)' : 'rgba(31, 41, 55, 0.2)'};
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: ${darkMode 
            ? `0 0 25px ${themeColors.primaryNeon}80` 
            : '0 8px 25px rgba(31, 41, 55, 0.3)'};
          filter: brightness(1.1);
        }
        
        .btn-secondary:hover {
          background: ${darkMode ? themeColors.primaryNeon : '#374151'} !important;
          box-shadow: ${darkMode 
            ? `0 0 15px ${themeColors.primaryNeon}50` 
            : '0 4px 15px rgba(31, 41, 55, 0.3)'};
          color: white !important;
          border-color: ${darkMode ? themeColors.primaryNeon : '#374151'} !important;
        }
        
        /* Improved neon text effect */
        .neon-text {
          position: relative;
        }
        
        .neon-text::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${darkMode ? 'linear-gradient(135deg, #9C8CFF20, #00C2FF20)' : 'transparent'};
          border-radius: 8px;
          z-index: -1;
        }
      `}</style>
    </section>
  );
}