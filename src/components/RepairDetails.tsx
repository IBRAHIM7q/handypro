"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RepairDetailsProps {
  darkMode: boolean;
  translations: any;
  language: "de" | "ar";
}

export default function RepairDetails({ darkMode, translations, language }: RepairDetailsProps) {
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

  const repairServices = [
    {
      title: language === "de" ? "Displaywechsel" : "استبدال الشاشة",
      subtitle: language === "de" ? "iPhone & Android" : "آيفون وأندرويد",
      icon: "📱",
      color: "from-slate-600 to-gray-700",
      features: [
        language === "de" ? "Original Displays" : "شاشات أصلية",
        language === "de" ? "12 Monate Garantie" : "12 شهر ضمان",
        language === "de" ? "Vor-Ort Service" : "خدمة في الموقع"
      ],
      popular: true
    },
    {
      title: language === "de" ? "Akkuwechsel" : "استبدال البطارية",
      subtitle: language === "de" ? "Alle Modelle" : "جميع الموديلات",
      icon: "🔋",
      color: "from-slate-600 to-gray-700",
      features: [
        language === "de" ? "Hohe Kapazität" : "سعة عالية",
        language === "de" ? "Sicherer Einbau" : "تركيب آمن",
        language === "de" ? "Langlebig" : "طويل العمر"
      ]
    },
    {
      title: language === "de" ? "Wasserschaden" : "أضرار المياه",
      subtitle: language === "de" ? "Rettungsversuch" : "محاولة الإنقاذ",
      icon: "💧",
      color: "from-slate-600 to-gray-700",
      features: [
        language === "de" ? "Sofortmaßnahmen" : "إجراءات فورية",
        language === "de" ? "Datenrettung" : "استعادة البيانات",
        language === "de" ? "Reinigung" : "تنظيف"
      ]
    },
    {
      title: language === "de" ? "Ladebuchse" : "منفذ الشحن",
      subtitle: language === "de" ? "Reparatur & Austausch" : "الإصلاح والاستبدال",
      icon: "🔌",
      color: "from-slate-600 to-gray-700",
      features: [
        language === "de" ? "Schnelles Laden" : "شحن سريع",
        language === "de" ? "Stabile Verbindung" : "اتصال مستقر",
        language === "de" ? "Original Teile" : "قطع أصلية"
      ]
    },
    {
      title: language === "de" ? "Kamera" : "الكاميرا",
      subtitle: language === "de" ? "Front & Rückkamera" : "الكاميرا الأمامية والخلفية",
      icon: "📷",
      color: "from-slate-600 to-gray-700",
      features: [
        language === "de" ? "Scharfe Bilder" : "صور حادة",
        language === "de" ? "Autofokus" : "تركيز تلقائي",
        language === "de" ? "Nachtkamera" : "كاميرا ليلية"
      ]
    },
    {
      title: language === "de" ? "Software" : "البرامج",
      subtitle: language === "de" ? "iOS & Android" : "iOS وأندرويد",
      icon: "💻",
      color: "from-slate-600 to-gray-700",
      features: [
        language === "de" ? "Datenrettung" : "استعادة البيانات",
        language === "de" ? "Virusentfernung" : "إزالة الفيروسات",
        language === "de" ? "Optimierung" : "تحسين الأداء"
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-500 to-gray-600 bg-clip-text text-transparent">
              {language === "de" ? "Beliebte Reparaturen" : "إصلاحات شائعة"}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-600 mx-auto rounded-full"></div>
          <p className={`mt-6 text-lg max-w-2xl mx-auto ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            {language === "de" 
              ? "Schnelle und professionelle Reparaturen für alle gängigen Geräte und Modelle"
              : "إصلاحات سريعة واحترافية لجميع الأجهزة والنماذج الشائعة"
            }
          </p>
        </div>

        {/* Repair Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {repairServices.map((service, index) => (
            <Card 
              key={index}
              className={`overflow-hidden transition-all duration-1000 transform hover:scale-[1.02] hover:shadow-lg group ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Compact Card Header */}
              <div className={`p-3 sm:p-4 md:p-6 bg-gradient-to-br ${service.color} relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl">{service.icon}</div>
                    {service.popular && (
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                        {language === "de" ? "Beliebt" : "شائع"}
                      </Badge>
                    )}
                  </div>
                  <div className="text-white">
                    <h3 className="text-sm sm:text-base md:text-xl font-bold mb-1">{service.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90">{service.subtitle}</p>
                  </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
                       style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                         backgroundSize: "20px 20px"
                       }}>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <CardContent className="p-3 sm:p-4 md:p-6">
                {/* Compact Features */}
                <div className="space-y-1 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${service.color}`}></div>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - Header Style */}
                <button 
                  onClick={() => {
                    const event = new CustomEvent('openContactModal');
                    window.dispatchEvent(event);
                  }}
                  className={`text-xs font-medium transition-all duration-300 relative group text-center inline-block ${
                    darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {language === "de" ? "Jetzt anfragen" : "اطلب الآن"}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-gray-600 transition-all duration-300 ${
                    "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}