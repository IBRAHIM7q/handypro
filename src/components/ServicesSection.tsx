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
      className={`py-12 md:py-20 md:py-32 ${darkMode ? "bg-gray-900/30" : "bg-gray-50/50"}`}
    >
      <div className="container mx-auto px-4">
        {/* Section title with animation */}
        <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-500 to-gray-600 bg-clip-text text-transparent">
              {t.services.title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-600 mx-auto rounded-full"></div>
        </div>

        {/* Services grid with staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`overflow-hidden transition-all duration-1000 transform hover:scale-[1.02] hover:shadow-lg group ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Compact card header */}
              <div className={`h-24 sm:h-32 bg-gradient-to-br ${service.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl transform group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
                       style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                         backgroundSize: "20px 20px"
                       }}>
                  </div>
                </div>
                {/* Badge */}
                <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {service.badge}
                </Badge>
              </div>
              
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg md:text-xl group-hover:text-slate-400 transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
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
                    // Open contact modal for service inquiries
                    const event = new CustomEvent('openContactModal');
                    window.dispatchEvent(event);
                  }}
                  className={`text-xs font-medium transition-all duration-300 relative group inline-block ${
                    darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {language === "de" ? "Mehr erfahren" : "معرفة المزيد"}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-gray-600 transition-all duration-300 ${
                    "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
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