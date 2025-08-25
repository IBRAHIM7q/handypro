"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServicesSectionProps {
  darkMode: boolean;
  translations: any;
  language: "de" | "ar";
}

export default function ServicesSection({ darkMode, translations, language }: ServicesSectionProps) {
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      title: t.services.display.title,
      description: t.services.display.description,
      icon: "📱",
      color: "from-slate-600 to-gray-700",
      badge: "Beliebt"
    },
    {
      title: t.services.battery.title,
      description: t.services.battery.description,
      icon: "🔋",
      color: "from-slate-600 to-gray-700",
      badge: "Schnell"
    },
    {
      title: t.services.data.title,
      description: t.services.data.description,
      icon: "💾",
      color: "from-slate-600 to-gray-700",
      badge: "Wichtig"
    },
    {
      title: t.services.water.title,
      description: t.services.water.description,
      icon: "💧",
      color: "from-slate-600 to-gray-700",
      badge: "Notfall"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-12 md:py-20 ${darkMode ? "bg-gray-900/30" : "bg-gray-50/50"} relative overflow-hidden`}
      style={{ 
        background: darkMode ? 
          'radial-gradient(circle at 10% 20%, rgba(21, 21, 30, 0.98) 0%, rgba(5, 5, 15, 0.98) 90.5%)' : 
          'radial-gradient(circle at 10% 20%, rgba(245, 247, 252, 0.98) 0%, rgba(235, 237, 242, 0.98) 90.5%)'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-64 h-64 rounded-full ${darkMode ? 'bg-purple-500/5' : 'bg-blue-500/5'} blur-3xl transform -translate-y-1/2`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full ${darkMode ? 'bg-blue-500/5' : 'bg-purple-500/5'} blur-3xl transform translate-y-1/2`}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title with animation */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-opacity-10 backdrop-blur-sm border border-opacity-20"
            style={{ 
              backgroundColor: darkMode ? 'rgba(100, 100, 255, 0.1)' : 'rgba(100, 100, 255, 0.05)',
              borderColor: darkMode ? 'rgba(100, 100, 255, 0.2)' : 'rgba(100, 100, 255, 0.1)'
            }}>
            <span className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {t.services.subtitle || "Unsere Dienstleistungen"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className={`bg-gradient-to-r ${darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}
                 style={{ userSelect: 'none' }}>
              {t.services.title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Services grid with staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`overflow-hidden transition-all duration-700 transform hover:scale-[1.03] hover:shadow-xl group ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${darkMode ? "bg-gray-900/60 border-gray-800/50" : "bg-white/80 border-gray-200/50"} backdrop-blur-sm`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Compact card header with modern gradient */}
              <div className={`h-24 sm:h-32 flex items-center justify-center relative overflow-hidden`}
                style={{
                  background: darkMode ? 
                    `linear-gradient(135deg, rgba(79, 70, 229, 0.8) 0%, rgba(45, 212, 191, 0.8) 100%)` : 
                    `linear-gradient(135deg, rgba(79, 70, 229, 0.7) 0%, rgba(45, 212, 191, 0.7) 100%)`,
                  boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.1)'
                }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl transform group-hover:scale-110 transition-all duration-500 text-white"
                     style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }}>
                  {service.icon}
                </div>
                <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm shadow-lg">
                  {service.badge}
                </Badge>
              </div>
              
              <CardHeader className="p-4 pb-0">
                <CardTitle className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-blue-500 transition-colors duration-300`}>
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-4 pt-2">
                <CardDescription className={`${darkMode ? "text-gray-300" : "text-gray-600"} line-clamp-3`}>
                  {service.description}
                </CardDescription>

                {/* Compact Features */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${service.color}`}></div>
                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {language === "de" ? "12 Monate Garantie" : "12 شهر ضمان"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${service.color}`}></div>
                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {language === "de" ? "Original Teile" : "قطع أصلية"}
                    </span>
                  </div>
                </div>
                
                {/* Learn more link - Header Style */}
                <button 
                  onClick={() => {
                    const event = new CustomEvent('openContactModal');
                    window.dispatchEvent(event);
                  }}
                  className={`text-xs font-medium transition-all duration-300 relative group inline-block ${
                    darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {language === "de" ? "Mehr erfahren" : "معرفة المزيد"}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-gray-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100`}></span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <button 
            onClick={() => {
              // Open contact modal for all services inquiry
              const event = new CustomEvent('openContactModal');
              window.dispatchEvent(event);
            }}
            className={`font-medium transition-all duration-300 relative group inline-block ${
              darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {language === "de" ? "Alle Dienstleistungen ansehen" : "عرض جميع الخدمات"}
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-gray-600 transition-all duration-300 ${
              "scale-x-0 group-hover:scale-x-100"
            }`}></span>
          </button>
        </div>
      </div>
    </section>
  );
}