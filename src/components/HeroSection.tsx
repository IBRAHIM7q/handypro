"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
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

const HeroSection = memo(function HeroSection({ darkMode, setIsContactModalOpen, translations, language }: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Comprehensive mobile detection and viewport handling with performance optimization
    const detectMobileAndViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Limit to 2 for performance
      
      setViewportDimensions({ width, height });
      
      // Enhanced mobile detection with better small screen handling
      const isMobileDevice = width <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ('ontouchstart' in window);
      const isVerySmallScreen = width < 700 || height < 900;
      setIsMobile(isMobileDevice);
      
      // Store screen size info for 3D background optimization
      document.documentElement.style.setProperty('--is-very-small-screen', isVerySmallScreen ? '1' : '0');
      
      // Store pixel ratio for 3D rendering optimization
      document.documentElement.style.setProperty('--device-pixel-ratio', pixelRatio.toString());
      
      // Store viewport dimensions for 3D background scaling
      document.documentElement.style.setProperty('--viewport-width', width.toString());
      document.documentElement.style.setProperty('--viewport-height', height.toString());
      
      console.log('Device detection:', { 
        isMobileDevice, 
        width, 
        height, 
        pixelRatio: window.devicePixelRatio,
        limitedRatio: pixelRatio,
        touchSupport: 'ontouchstart' in window,
        userAgent: navigator.userAgent
      });
    };
    
    // Initial detection and mount
    detectMobileAndViewport();
    setIsMounted(true);
    
    // Throttled resize and orientation change handlers
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(detectMobileAndViewport, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      // Add delay for orientation change to complete
      setTimeout(detectMobileAndViewport, 200);
    });
    
    // Enhanced WebGL detection with mobile compatibility
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || 
                canvas.getContext('experimental-webgl') || 
                canvas.getContext('webgl2');
      
      if (!gl) {
        setHasWebGL(false);
        document.documentElement.classList.add('no-webgl');
        console.warn('WebGL not supported, using fallback');
      } else {
        setHasWebGL(true);
        console.log('WebGL supported:', {
          renderer: (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).RENDERER),
          vendor: (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).VENDOR)
        });
      }
    } catch (e) {
      console.warn('WebGL detection failed, using fallback:', e);
      setHasWebGL(false);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', detectMobileAndViewport);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

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
        border: 'none',
        borderTop: 'none',
        boxShadow: 'none',
        margin: '0',
        paddingTop: '0'
      }}
      className="min-h-screen relative overflow-hidden"
    >

      {/* Spline 3D Background - with aggressive mobile optimization and full coverage */}
      <div className="absolute inset-0 overflow-hidden" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}>
        {/* Adaptive gradient background based on theme - Removed white filters for light mode */}
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20'
            : 'bg-transparent'
        }`}></div>
        
        {/* Show loading state before hydration completes */}
        {!isMounted && (
          <div className={`absolute inset-0 animate-pulse ${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30'
              : 'bg-transparent'
          }`}></div>
        )}
        
        {/* Responsive 3D Background with mobile-optimized settings - Works in both modes */}
        {isMounted && (
          <>
            {/* Primary Spline iframe with watermark hiding and proper background positioning */}
            <iframe 
              src='https://my.spline.design/orb-sSzmsjAvuweqMuCLtYgiULil/' 
              frameBorder='0' 
              width={isMobile ? (viewportDimensions.width < 700 ? '200%' : '250%') : '150%'}
              height={isMobile ? (viewportDimensions.width < 700 ? '200%' : '250%') : '150%'}
              style={{
                position: 'absolute',
                top: isMobile ? (viewportDimensions.width < 700 ? '-50%' : '-75%') : '-25%',
                left: isMobile ? (viewportDimensions.width < 700 ? '-50%' : '-75%') : '-25%',
                zIndex: 0,
                pointerEvents: 'none',
                transform: isMobile 
                  ? `translate3d(0,0,0) scale(${viewportDimensions.width < 700 ? '1.5' : viewportDimensions.width <= 430 ? '2.2' : '2.0'})` 
                  : 'translate3d(0,0,0) scale(1.5)',
                transformOrigin: 'center center',
                willChange: 'transform',
                opacity: isMobile ? 1.0 : 1,
                mixBlendMode: 'normal',
                filter: 'none',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                overflow: 'hidden',
                borderRadius: '0'
              }}
              title="3D Background"
              onLoad={() => {
                // Hide watermarks after iframe loads
                setTimeout(() => {
                  const hideWatermarks = () => {
                    // Hide any elements with spline-related content
                    document.querySelectorAll('[class*="spline" i], [id*="spline" i], [data-spline], a[href*="spline"]').forEach(el => {
                      (el as HTMLElement).style.display = 'none';
                      (el as HTMLElement).style.visibility = 'hidden';
                      (el as HTMLElement).style.opacity = '0';
                    });
                    
                    // Hide positioned overlays that might be watermarks
                    document.querySelectorAll('div[style*="position: absolute"], div[style*="position: fixed"]').forEach(el => {
                      const element = el as HTMLElement;
                      const text = element.textContent?.toLowerCase();
                      if (text?.includes('spline') || text?.includes('made with')) {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                      }
                    });
                  };
                  
                  hideWatermarks();
                  // Run again after a delay to catch dynamically loaded content
                  setTimeout(hideWatermarks, 1000);
                  setTimeout(hideWatermarks, 3000);
                }, 100);
              }}
              onError={() => console.log('Spline iframe failed to load')}
              loading="lazy"
              allow="accelerometer; gyroscope"
              sandbox="allow-scripts allow-same-origin"
              scrolling="no"
              seamless
              referrerPolicy="no-referrer"
            ></iframe>
            
            {/* Secondary Spline component with aggressive background scaling and positioning */}
            <div className="spline-background" style={{
              position: 'absolute',
              top: isMobile ? (viewportDimensions.width < 700 ? '-40%' : '-60%') : '-15%',
              left: isMobile ? (viewportDimensions.width < 700 ? '-40%' : '-60%') : '-15%',
              width: isMobile ? (viewportDimensions.width < 700 ? '180%' : '220%') : '130%',
              height: isMobile ? (viewportDimensions.width < 700 ? '180%' : '220%') : '130%',
              zIndex: -1,
              overflow: 'hidden',
              pointerEvents: 'none',
              transform: 'translate3d(0,0,0)',
              willChange: 'transform',
            }}>
              <div className="w-full h-full" style={{ 
                transform: (() => {
                  if (isMobile) {
                    // Reduced scaling for smaller 3D background
                    if (viewportDimensions.width < 700) {
                      // Conservative scaling for very small screens
                      const scaleFactor = viewportDimensions.width <= 430 ? 1.8 : 1.6;
                      return `scale(${scaleFactor}) translate3d(0,0,0)`;
                    } else {
                      // Reduced scaling for normal mobile screens
                      const scaleFactor = viewportDimensions.width <= 430 ? 2.2 : 
                                         viewportDimensions.width <= 600 ? 2.0 : 1.8;
                      return `scale(${scaleFactor}) translate3d(0,0,0)`;
                    }
                  }
                  return 'scale(1.8) translate3d(0,0,0)';
                })(),
                position: 'relative',
                bottom: '0px',
                willChange: 'transform',
                opacity: 1.0,
                mixBlendMode: 'normal',
                transformOrigin: 'center center',
              }}>
                <ErrorBoundary fallback={
                  <div className={`w-full h-full ${
                    darkMode 
                      ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20'
                      : 'bg-transparent'
                  }`}></div>
                }>
                  <Spline 
                    scene="https://prod.spline.design/kkxbabGl413xz3-h/scene.splinecode"
                    onLoad={() => {
                      console.log('Spline scene loaded successfully', {
                        isMobile,
                        viewport: viewportDimensions,
                        devicePixelRatio: window.devicePixelRatio,
                        performance: navigator.hardwareConcurrency || 'unknown'
                      });
                    }}
                    onError={(error) => {
                      console.log('Spline scene error (graceful fallback):', error, {
                        isMobile,
                        viewport: viewportDimensions
                      });
                    }}
                    style={{
                      transform: 'translate3d(0,0,0)',
                      willChange: 'transform',
                      width: '100%',
                      height: '100%',
                      mixBlendMode: 'normal',
                      // Remove all filters for consistent appearance
                      filter: 'none',
                      // Hide watermarks
                      border: 'none',
                      outline: 'none',
                      boxShadow: 'none',
                      overflow: 'hidden'
                    }}
                    // Enhanced mobile-specific performance and watermark hiding
                    renderOnDemand={isMobile}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`${isMobile ? 'w-full' : 'container'} mx-auto ${isMobile ? 'px-0' : 'px-4'} relative z-10 ${isMobile ? 'pt-32' : 'pt-24'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center min-h-[70vh]">
          {/* Left column - Text content with reduced mobile spacing */}
          <div className={`transition-all duration-1000 transform ${isMobile ? 'mt-8' : 'mt-8 md:mt-0'} ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            {/* Animated title with better light mode colors - Fixed dark mode background issue */}
            <h1 className={`${isMobile ? 'text-5xl' : 'text-4xl'} md:text-6xl lg:text-7xl font-bold mb-4 ${isMobile ? 'mt-6' : 'mt-2 md:mt-4'}`}>
              <span 
                className="neon-text"
                style={{ 
                  // Much lighter colors for both modes
                  color: darkMode ? '#B8B8C8' : '#6B7280', // Light gray for both modes
                  textShadow: darkMode 
                    ? '0 0 20px rgba(184, 184, 200, 0.4), 0 0 40px rgba(184, 184, 200, 0.2)' 
                    : '0 2px 8px rgba(107, 114, 128, 0.2)', // Very soft shadow
                  userSelect: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  lineHeight: '1.1',
                  // Ensure NO background in any mode
                  background: 'transparent',
                  backgroundColor: 'transparent',
                  backgroundImage: 'none',
                }}
              >
                {t.hero.title}
              </span>
            </h1>

            {/* Animated subtitle with better light mode contrast */}
            <p 
              className={`text-xl md:text-2xl mb-6 md:mb-8 transition-all duration-1000 delay-200 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ 
                color: darkMode ? themeColors.textSecondary : '#6B7280', // Even lighter gray for light mode
                textShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)' // Softer shadow
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Animated CTA button - Single beautiful button */}
            <div 
              className={`flex justify-center sm:justify-start mb-6 md:mb-8 transition-all duration-1000 delay-400 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Button 
                onClick={() => setIsContactModalOpen(true)} 
                size="lg" 
                className="btn-primary glow-hover relative overflow-hidden group"
                style={{ 
                  background: darkMode 
                    ? 'linear-gradient(135deg, #9C8CFF 0%, #00C2FF 100%)' 
                    : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  borderRadius: '60px',
                  padding: '16px 40px',
                  fontWeight: 700,
                  fontSize: '18px',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1,
                  transition: 'all 0.4s ease',
                  color: '#ffffff',
                  boxShadow: darkMode 
                    ? '0 8px 32px rgba(156, 140, 255, 0.4), 0 4px 16px rgba(0, 194, 255, 0.3)' 
                    : '0 8px 32px rgba(59, 130, 246, 0.4), 0 4px 16px rgba(29, 78, 216, 0.3)',
                  border: 'none',
                  transform: 'translateY(0px)',
                }}
              >
                <span className="relative z-10 flex items-center">
                  <svg 
                    className="w-6 h-6 mr-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  {t.hero.cta}
                </span>
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>

            {/* Animated stats cards - More compact */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${isMobile ? 'mt-8' : 'mt-4'}`}>
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
                    borderRadius: '16px',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="text-lg md:text-xl font-bold mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <p style={{ color: themeColors.textSecondary, fontSize: '0.8rem' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
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
});

export default HeroSection;