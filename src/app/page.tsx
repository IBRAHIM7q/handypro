"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import RepairDetails from "@/components/RepairDetails";
import ChatButton from "@/components/ChatButton";

export default function Home() {
  const [language, setLanguage] = useState<"de" | "ar">("de");
  const [darkMode, setDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  // Translations for German and Arabic based on HandyPro content
  const translations = {
    de: {
      nav: {
        home: "Startseite",
        services: "Dienstleistungen",
        accessories: "Zubehör",
        process: "Reparaturprozess",
        contact: "Kontakt"
      },
      hero: {
        title: "HandyPro – Ihre Experten für Handyreparaturen!",
        subtitle: "Schnell, zuverlässig und professionell!",
        cta: "Kontaktieren Sie uns jetzt!",
        customers: "1K+",
        customersLabel: "Zufriedene Kunden",
        repairs: "1K+",
        repairsLabel: "Reparaturen durchgeführt",
        quality: "100%",
        qualityLabel: "Höchste Qualität"
      },
      services: {
        title: "Unsere Hauptdienstleistungen",
        display: {
          title: "Displaywechsel",
          description: "Wir ersetzen Ihr defektes Display schnell und professionell."
        },
        battery: {
          title: "Akkuwechsel",
          description: "Ihr Handy hat wieder volle Power mit einem neuen Akku."
        },
        data: {
          title: "Datenrettung",
          description: "Wir retten Ihre wichtigen Daten von defekten Geräten."
        },
        water: {
          title: "Wasserschäden",
          description: "Professionelle Reparatur von Geräten mit Wasserschäden."
        }
      },
      accessories: {
        title: "Zubehör & Verkauf",
        cases: {
          title: "Handyhüllen",
          description: "Eine große Auswahl an stylischen und schützenden Handyhüllen."
        },
        glass: {
          title: "Panzerglas",
          description: "Hochwertiger Displayschutz für alle gängigen Modelle."
        },
        cables: {
          title: "Ladekabel & Adapter",
          description: "Ladekabel, Adapter und Powerbanks für alle Geräte."
        },
        headphones: {
          title: "Kopfhörer",
          description: "Kabellose Kopfhörer und Headsets für unterwegs."
        },
        buySell: {
          title: "Handy Ankauf & Verkauf",
          description: "Wir kaufen und verkaufen gebrauchte Handys."
        }
      },
      process: {
        title: "So funktioniert unser Reparaturprozess",
        step1: {
          title: "Problem melden & Beratung",
          description: "Sie kommen mit Ihrem defekten Gerät zu uns in den Laden. Unsere erfahrenen Techniker analysieren das Problem und besprechen mit Ihnen die genaue Fehlerursache und die benötigte Reparatur."
        },
        step2: {
          title: "Kostenvoranschlag & Zustimmung",
          description: "Nach der Diagnose erhalten Sie einen transparenten Kostenvoranschlag. Wir besprechen alle Details und warten auf Ihre Zustimmung, bevor wir mit der Reparatur fortfahren."
        },
        step3: {
          title: "Professionelle Reparatur",
          description: "Unsere qualifizierten Techniker führen die Reparatur mit größter Sorgfalt durch. Wir verwenden hochwertige Ersatzteile, um eine lange Lebensdauer Ihres Geräts zu gewährleisten."
        },
        step4: {
          title: "Qualitätsprüfung & Übergabe",
          description: "Nach der Reparatur unterziehen wir Ihr Gerät einer gründlichen Qualitätsprüfung. Wenn alles einwandfrei funktioniert, informieren wir Sie und Sie können Ihr repariertes Gerät abholen."
        }
      },
      contact: {
        title: "Kontakt",
        email: "E-Mail:",
        emailValue: "handypro.kiel@gmail.com",
        phone: "Telefon:",
        phoneValue: "01577 1149895",
        address: "Adresse:",
        addressValue: "Kronshagener Weg 12, 24116 Kiel",
        hours: "Öffnungszeiten",
        mon: "Montag:",
        monHours: "10:00 - 18:00",
        tue: "Dienstag:",
        tueHours: "10:00 - 18:00",
        wed: "Mittwoch:",
        wedHours: "10:00 - 18:00",
        thu: "Donnerstag:",
        thuHours: "10:00 - 18:00",
        fri: "Freitag:",
        friHours: "10:00 - 18:00",
        sat: "Samstag:",
        satHours: "10:00 - 16:00",
        sun: "Sonntag:",
        sunHours: "Geschlossen",
        showRoute: "Route anzeigen",
        modalTitle: "Hallo",
        modalSubtitle: "Kontaktieren Sie uns über einen dieser Kanäle:",
        whatsapp: "WhatsApp",
        email: "E-Mail",
        instagram: "Instagram",
        facebook: "Facebook"
      },
      cookies: {
        title: "Cookie - Einstellungen",
        description: "Wir verwenden Cookies, um unsere Website zu verbessern und Ihnen relevante Inhalte anzuzeigen.",
        necessary: "Notwendige Cookies",
        functional: "Funktionale Cookies",
        acceptAll: "Alle akzeptieren",
        acceptNecessary: "Nur notwendige akzeptieren",
        settings: "Einstellungen"
      }
    },
    ar: {
      nav: {
        home: "الصفحة الرئيسية",
        services: "الخدمات",
        accessories: "الإكسسوارات",
        process: "عملية الإصلاح",
        contact: "اتصل بنا"
      },
      hero: {
        title: "!HandyPro – خبراء صيانة الهواتف الخاصة بكم",
        subtitle: "!سريع، موثوق، واحترافي",
        cta: "اتصل بنا الآن!",
        customers: "1K+",
        customersLabel: "عملاء راضون",
        repairs: "1K+",
        repairsLabel: "عمليات إصلاح منجزة",
        quality: "100%",
        qualityLabel: "أعلى جودة"
      },
      services: {
        title: "خدماتنا الرئيسية",
        display: {
          title: "استبدال الشاشة",
          description: "نستبدل شاشتك المكسورة بسرعة واحترافية."
        },
        battery: {
          title: "استبدال البطارية",
          description: "يستعيد هاتفك طاقته الكاملة ببطارية جديدة."
        },
        data: {
          title: "استعادة البيانات",
          description: "نستعيد بياناتك الهامة من الأجهزة المعطلة."
        },
        water: {
          title: "أضرار المياه",
          description: "إصلاح احترافي للأجهزة المتضررة من المياه."
        }
      },
      accessories: {
        title: "الإكسسوارات والمبيعات",
        cases: {
          title: "أغطية الهواتف",
          description: "مجموعة كبيرة من أغطية الهواتف العصرية والواقية."
        },
        glass: {
          title: "الزجاج المقوى",
          description: "حماية شاشة عالية الجودة لجميع الموديلات الشائعة."
        },
        cables: {
          title: "كابلات الشحن والمحولات",
          description: "كابلات شحن، محولات، وبنوك طاقة لجميع الأجهزة."
        },
        headphones: {
          title: "سماعات الرأس",
          description: "سماعات رأس لاسلكية ومجموعات رأس للاستخدام أثناء التنقل."
        },
        buySell: {
          title: "شراء وبيع الهواتف",
          description: "نشتري ونبيع الهواتف المستعملة."
        }
      },
      process: {
        title: "كيف تتم عملية الإصلاح لدينا",
        step1: {
          title: "إبلاغ عن المشكلة والاستشارة",
          description: "تأتي بجهازك المعطل إلى متجرنا. يقوم فنيونا ذوو الخبرة بتحليل المشكلة ومناقشة سبب العطل الدقيق والإصلاح اللازم معك."
        },
        step2: {
          title: "عرض السعر والموافقة",
          description: "بعد التشخيص، تتلقى عرض أسعار شفافًا. نناقش جميع التفاصيل وننتظر موافقتك قبل البدء بالإصلاح."
        },
        step3: {
          title: "إصلاح احترافي",
          description: "يقوم فنيونا المؤهلون بإجراء الإصلاح بعناية فائقة. نستخدم قطع غيار عالية الجودة لضمان عمر طويل لجهازك."
        },
        step4: {
          title: "فحص الجودة والتسليم",
          description: "بعد الإصلاح، نخضع جهازك لفحص جودة شامل. عندما يعمل كل شيء بشكل مثالي، نبلغك ويمكنك استلام جهازك المُصلح."
        }
      },
      contact: {
        title: "اتصل بنا",
        email: "البريد الإلكتروني:",
        emailValue: "handypro.kiel@gmail.com",
        phone: "الهاتف:",
        phoneValue: "01577 1149895",
        address: "العنوان:",
        addressValue: "Kronshagener Weg 12, 24116 Kiel",
        hours: "ساعات العمل",
        mon: "الاثنين:",
        monHours: "10:00 - 18:00",
        tue: "الثلاثاء:",
        tueHours: "10:00 - 18:00",
        wed: "الأربعاء:",
        wedHours: "10:00 - 18:00",
        thu: "الخميس:",
        thuHours: "10:00 - 18:00",
        fri: "الجمعة:",
        friHours: "10:00 - 18:00",
        sat: "السبت:",
        satHours: "10:00 - 16:00",
        sun: "الأحد:",
        sunHours: "مغلق",
        showRoute: "إظهار المسار",
        modalTitle: "مرحباً",
        modalSubtitle: "تواصل معنا عبر إحدى هذه القنوات:",
        whatsapp: "واتساب",
        email: "البريد الإلكتروني",
        instagram: "انستغرام",
        facebook: "فيسبوك"
      },
      cookies: {
        title: "إعدادات ملفات تعريف الارتباط",
        description: "نستخدم ملفات تعريف الارتباط لتحسين موقعنا الإلكتروني وعرض محتوى ذي صلة لك.",
        necessary: "ملفات تعريف الارتباط الضرورية",
        functional: "ملفات تعريف الارتباط الوظيفية",
        acceptAll: "قبول الكل",
        acceptNecessary: "قبول الضروري فقط",
        settings: "الإعدادات"
      }
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    // Listen for custom event to open contact modal
    const handleOpenContactModal = () => {
      setIsContactModalOpen(true);
    };
    
    window.addEventListener('openContactModal', handleOpenContactModal);
    
    return () => {
      window.removeEventListener('openContactModal', handleOpenContactModal);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    // Kleine Verzögerung, um sicherzustellen, dass der Zustand aktualisiert wurde
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-black text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        translations={translations}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          darkMode={darkMode}
          setIsContactModalOpen={setIsContactModalOpen}
          translations={translations}
          language={language}
        />

        {/* Services Section */}
        <ServicesSection
          darkMode={darkMode}
          translations={translations}
          language={language}
        />

        {/* Accessories Section */}
        <section id="accessories" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16">
              {t.accessories.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <Card className={`overflow-hidden transition-all hover:shadow-lg ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="h-24 sm:h-32 md:h-48 bg-gradient-to-r from-slate-600 to-gray-700 flex items-center justify-center">
                  <div className="text-white text-3xl sm:text-4xl md:text-5xl">📦</div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg md:text-xl">{t.accessories.cases.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs sm:text-sm md:text-base">
                    {t.accessories.cases.description}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className={`overflow-hidden transition-all hover:shadow-lg ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="h-24 sm:h-32 md:h-48 bg-gradient-to-r from-slate-600 to-gray-700 flex items-center justify-center">
                  <div className="text-white text-3xl sm:text-4xl md:text-5xl">🛡️</div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg md:text-xl">{t.accessories.glass.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs sm:text-sm md:text-base">
                    {t.accessories.glass.description}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className={`overflow-hidden transition-all hover:shadow-lg ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="h-24 sm:h-32 md:h-48 bg-gradient-to-r from-slate-600 to-gray-700 flex items-center justify-center">
                  <div className="text-white text-3xl sm:text-4xl md:text-5xl">🔌</div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg md:text-xl">{t.accessories.cables.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs sm:text-sm md:text-base">
                    {t.accessories.cables.description}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className={`overflow-hidden transition-all hover:shadow-lg ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="h-24 sm:h-32 md:h-48 bg-gradient-to-r from-slate-600 to-gray-700 flex items-center justify-center">
                  <div className="text-white text-3xl sm:text-4xl md:text-5xl">🎧</div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg md:text-xl">{t.accessories.headphones.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs sm:text-sm md:text-base">
                    {t.accessories.headphones.description}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className={`overflow-hidden transition-all hover:shadow-lg ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="h-24 sm:h-32 md:h-48 bg-gradient-to-r from-slate-600 to-gray-700 flex items-center justify-center">
                  <div className="text-white text-3xl sm:text-4xl md:text-5xl">💰</div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg md:text-xl">{t.accessories.buySell.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs sm:text-sm md:text-base">
                    {t.accessories.buySell.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-slate-500 to-gray-600 bg-clip-text text-transparent">
                  {t.process.title}
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-600 mx-auto rounded-full"></div>
              <p className={`mt-6 text-lg max-w-2xl mx-auto ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                {language === "de" 
                  ? "Ihr Gerät in besten Händen - von der Diagnose bis zur Reparatur"
                  : "جهازك في أفضل الأيدي - من التشخيص إلى الإصلاح"
                }
              </p>
            </div>

            {/* Process Timeline */}
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } hidden lg:block`}></div>

                {/* Process Steps */}
                <div className="space-y-12 lg:space-y-16">
                  {[
                    {
                      step: 1,
                      title: t.process.step1.title,
                      description: t.process.step1.description,
                      icon: "🔍",
                      color: "from-slate-600 to-gray-700",
                      features: [
                        language === "de" ? "Kostenlose Analyse" : "تحليل مجاني",
                        language === "de" ? "Fehlerdiagnose" : "تشخيص الأخطاء",
                        language === "de" ? "Beratung vor Ort" : "استشارة في الموقع"
                      ]
                    },
                    {
                      step: 2,
                      title: t.process.step2.title,
                      description: t.process.step2.description,
                      icon: "📋",
                      color: "from-slate-600 to-gray-700",
                      features: [
                        language === "de" ? "Transparente Preise" : "أسعار شفافة",
                        language === "de" ? "Keine versteckten Kosten" : "لا توجد تكاليف خفية",
                        language === "de" ? "Ihre Entscheidung" : "قرارك"
                      ]
                    },
                    {
                      step: 3,
                      title: t.process.step3.title,
                      description: t.process.step3.description,
                      icon: "🔧",
                      color: "from-slate-600 to-gray-700",
                      features: [
                        language === "de" ? "Original Ersatzteile" : "قطع غيار أصلية",
                        language === "de" ? "Erfahrene Techniker" : "فنيون ذوو خبرة",
                        language === "de" ? "Schnelle Reparatur" : "إصلاح سريع"
                      ]
                    },
                    {
                      step: 4,
                      title: t.process.step4.title,
                      description: t.process.step4.description,
                      icon: "✅",
                      color: "from-slate-600 to-gray-700",
                      features: [
                        language === "de" ? "Qualitätsprüfung" : "فحص الجودة",
                        language === "de" ? "Funktionstest" : "اختبار الوظيفة",
                        language === "de" ? "Garantie" : "ضمان"
                      ]
                    }
                  ].map((step, index) => (
                    <div key={step.step} className={`relative flex items-center ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } flex-col`}>
                      {/* Step Number Circle - Desktop */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br z-10 flex items-center justify-center shadow-lg hidden lg:flex">
                        <div className={`w-14 h-14 rounded-full ${darkMode ? "bg-gray-900" : "bg-white"} flex items-center justify-center`}>
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                      </div>

                      {/* Mobile Step Header */}
                      <div className="flex items-center mb-4 lg:hidden">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mr-3`}>
                          {step.step}
                        </div>
                        <div className="text-3xl">{step.icon}</div>
                        <h3 className="text-xl font-bold ml-3">{step.title}</h3>
                      </div>

                      {/* Content Card */}
                      <div className={`w-full lg:w-5/12 ${
                        index % 2 === 0 ? "lg:mr-auto lg:ml-8" : "lg:ml-auto lg:mr-8"
                      }`}>
                        <div className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                          darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                        } border shadow-lg`}>
                          {/* Desktop Header */}
                          <div className="hidden lg:flex items-center mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mr-3`}>
                              {step.step}
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                          </div>
                          
                          <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {step.description}
                          </p>

                          {/* Features */}
                          <div className="space-y-2">
                            {step.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${step.color}`}></div>
                                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Time indicator */}
                          <div className={`mt-4 pt-4 border-t ${
                            darkMode ? "border-gray-800" : "border-gray-200"
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-medium ${
                                darkMode ? "text-gray-500" : "text-gray-400"
                              }`}>
                                {language === "de" ? "Dauer" : "المدة"}
                              </span>
                              <span className={`text-xs font-bold ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}>
                                {language === "de" ? "Kurzfristig" : "قصير الأجل"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center">
              <button 
                onClick={() => {
                  const event = new CustomEvent('openContactModal');
                  window.dispatchEvent(event);
                }}
                className={`font-medium transition-all duration-300 relative group inline-block ${
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {language === "de" ? "Jetzt Reparatur starten" : "ابدأ الإصلاح الآن"}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-gray-600 transition-all duration-300 ${
                  "scale-x-0 group-hover:scale-x-100"
                }`}></span>
              </button>
              <p className={`mt-4 text-sm ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}>
                {language === "de" 
                  ? "Kostenlose Diagnose und unverbindliche Beratung"
                  : "تشخيص مجاني واستشارة غير ملزمة"
                }
              </p>
            </div>
          </div>
        </section>

        {/* Repair Details Section */}
        <RepairDetails
          darkMode={darkMode}
          translations={translations}
          language={language}
        />

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16">
              {t.contact.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className={`p-8 transition-all hover:shadow-lg ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl text-slate-500">✉️</div>
                    <div>
                      <p className="font-bold text-lg">{t.contact.email}</p>
                      <a href={`mailto:${t.contact.emailValue}`} className="text-slate-500 hover:underline">
                        {t.contact.emailValue}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl text-slate-500">📞</div>
                    <div>
                      <p className="font-bold text-lg">{t.contact.phone}</p>
                      <a href={`tel:${t.contact.phoneValue}`} className="text-slate-500 hover:underline">
                        {t.contact.phoneValue}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl text-slate-500 mt-1">📍</div>
                    <div>
                      <p className="font-bold text-lg">{t.contact.address}</p>
                      <p className="mb-4">{t.contact.addressValue}</p>
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=Kronshagener+Weg+12,+24116+Kiel"
                        target="_blank"
                        className="inline-block w-full text-center bg-slate-600 text-white font-semibold py-2 rounded-lg hover:bg-slate-700 transition-colors duration-300"
                      >
                        {t.contact.showRoute}
                      </a>
                      <div className="mt-4 bg-white p-4 rounded-xl shadow-inner">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.773543298633!2d10.10685731592969!3d54.32308998018109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b243f1e6e6e6e7%3A0x123456789abcdef!2sKronshagener%20Weg%2012%2C%2024116%20Kiel!5e0!3m2!1sde!2sde!4v1718030000000!5m2!1sde!2sde"
                          width="100%" 
                          height="200" 
                          style={{border:0}} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-lg shadow-md w-full"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className={`p-8 transition-all hover:shadow-lg ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="flex items-center space-x-2 text-xl font-bold text-slate-500 mb-4">
                  <span>🕒</span>
                  <span>{t.contact.hours}</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>{t.contact.mon}</span>
                    <span>{t.contact.monHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.contact.tue}</span>
                    <span>{t.contact.tueHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.contact.wed}</span>
                    <span>{t.contact.wedHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.contact.thu}</span>
                    <span>{t.contact.thuHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.contact.fri}</span>
                    <span>{t.contact.friHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.contact.sat}</span>
                    <span>{t.contact.satHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.contact.sun}</span>
                    <span>{t.contact.sunHours}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Cookie Settings */}
      {showCookieBanner && (
        <div className={`fixed bottom-4 left-4 right-4 z-40 p-4 rounded-lg shadow-lg max-w-md mx-auto ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold mb-1">{t.cookies.title}</h3>
              <p className="text-sm opacity-80 mb-3">{t.cookies.description}</p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setShowCookieBanner(false)}
                >
                  {t.cookies.acceptAll}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => setShowCookieBanner(false)}
                >
                  {t.cookies.acceptNecessary}
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs"
                  onClick={() => alert("Cookie-Einstellungen werden in Kürze verfügbar!")}
                >
                  {t.cookies.settings}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className={`sm:max-w-md ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <DialogHeader>
            <DialogTitle>{t.contact.modalTitle}</DialogTitle>
            <DialogDescription>{t.contact.modalSubtitle}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <a 
              href="https://wa.me/4915771149895" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
            >
              <span className="mr-2">📱</span> {t.contact.whatsapp}
            </a>
            <a 
              href="mailto:handypro.kiel@gmail.com" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
            >
              <span className="mr-2">✉️</span> {t.contact.email}
            </a>
            <a 
              href="https://www.instagram.com/handy_pro_kiel?igsh=ZW4xemNpbDBjdGls" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
            >
              <span className="mr-2">📷</span> {t.contact.instagram}
            </a>
            <a 
              href="https://www.facebook.com/share/16iu2qkmz1/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
            >
              <span className="mr-2">📘</span> {t.contact.facebook}
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Button */}
      <ChatButton
        darkMode={darkMode}
        translations={translations}
        language={language}
      />
    </div>
  );
}