"use client";

import React, { useState, useEffect } from "react";
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
import Footer from "@/components/Footer";

export default function Home() {
  const [language, setLanguage] = useState<"de" | "ar">("de");
  const [darkMode, setDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false
  });
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

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
      footer: {
        rights: "Alle Rechte vorbehalten.",
        language: "Sprache wählen"
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
        emailContact: "E-Mail",
        instagram: "Instagram",
        facebook: "Facebook"
      },
      cookies: {
        title: "Cookie-Einstellungen",
        description: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Website-Verkehr zu analysieren. Sie können Ihre Präferenzen verwalten oder alle Cookies akzeptieren.",
        necessary: "Notwendige Cookies",
        necessaryDesc: "Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich.",
        analytics: "Analyse-Cookies",
        analyticsDesc: "Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.",
        marketing: "Marketing-Cookies",
        marketingDesc: "Diese Cookies werden verwendet, um Ihnen relevante Werbung zu zeigen.",
        acceptAll: "Alle akzeptieren",
        acceptNecessary: "Nur notwendige",
        settings: "Einstellungen verwalten",
        save: "Speichern",
        moreInfo: "Mehr Informationen finden Sie in unserer Datenschutzerklärung."
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
      footer: {
        rights: "جميع الحقوق محفوظة.",
        language: "اختر اللغة"
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
        emailContact: "البريد الإلكتروني",
        instagram: "انستغرام",
        facebook: "فيسبوك"
      },
      cookies: {
        title: "إعدادات ملفات تعريف الارتباط",
        description: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور على الموقع. يمكنك إدارة تفضيلاتك أو قبول جميع ملفات تعريف الارتباط.",
        necessary: "ملفات تعريف ارتباط ضرورية",
        necessaryDesc: "هذه ملفات تعريف الارتباط ضرورية للوظائف الأساسية للموقع.",
        analytics: "ملفات تعريف ارتباط تحليلية",
        analyticsDesc: "تساعدنا هذه ملفات تعريف الارتباط في فهم كيفية تفاعل الزوار مع الموقع.",
        marketing: "ملفات تعريف ارتباط تسويقية",
        marketingDesc: "تُستخدم هذه ملفات تعريف الارتباط لعرض إعلانات ذات صلة.",
        acceptAll: "قبول الكل",
        acceptNecessary: "الضروري فقط",
        settings: "إدارة الإعدادات",
        save: "حفظ",
        moreInfo: "للمزيد من المعلومات، يرجى مراجعة سياسة الخصوصية الخاصة بنا."
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

  // Creative Welcome Animation Sequence
  useEffect(() => {
    if (!showWelcomeAnimation) return;

    const animationSequence = [
      { delay: 1000, step: 1 }, // HandyPro logo appears
      { delay: 2000, step: 2 }, // Service icons float in
      { delay: 3000, step: 3 }, // Stats counter animation
      { delay: 4500, step: 4 }, // Final welcome message
      { delay: 6000, step: 5 }  // Animation complete
    ];

    animationSequence.forEach(({ delay, step }) => {
      setTimeout(() => {
        setAnimationStep(step);
        if (step === 5) {
          setTimeout(() => setShowWelcomeAnimation(false), 1000);
        }
      }, delay);
    });
  }, [showWelcomeAnimation]);

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

  // Check for cookie consent on page load
  useEffect(() => {
    const cookieConsent = localStorage.getItem('handypro-cookie-consent');
    if (!cookieConsent) {
      // Show banner after welcome animation completes
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, showWelcomeAnimation ? 7000 : 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const preferences = JSON.parse(cookieConsent);
        setCookiePreferences(preferences);
      } catch (e) {
        // If parsing fails, show banner again
        setShowCookieBanner(true);
      }
    }
  }, [showWelcomeAnimation]);

  const handleCookieAction = (action: 'acceptAll' | 'acceptNecessary' | 'saveCustom', customPrefs?: any) => {
    let preferences;
    
    switch (action) {
      case 'acceptAll':
        preferences = { necessary: true, analytics: true, marketing: true };
        break;
      case 'acceptNecessary':
        preferences = { necessary: true, analytics: false, marketing: false };
        break;
      case 'saveCustom':
        preferences = customPrefs || cookiePreferences;
        break;
    }
    
    setCookiePreferences(preferences);
    localStorage.setItem('handypro-cookie-consent', JSON.stringify(preferences));
    setShowCookieBanner(false);
    setShowCookieSettings(false);
    
    // Initialize analytics or marketing scripts based on preferences
    if (preferences.analytics) {
      // Initialize Google Analytics or other analytics
      console.log('Analytics cookies accepted');
    }
    if (preferences.marketing) {
      // Initialize marketing/advertising scripts
      console.log('Marketing cookies accepted');
    }
  };

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
        {/* Hero Section mit ID für Navigation */}
        <HeroSection
          darkMode={darkMode}
          setIsContactModalOpen={setIsContactModalOpen}
          translations={translations}
          language={language}
        />

        {/* Services Section */}
        <div id="services">
          <ServicesSection
            darkMode={darkMode}
            translations={translations}
            language={language}
          />
        </div>

        {/* Accessories Section */}
        <section id="accessories" className="py-8 md:py-12 relative overflow-hidden"
          style={{ 
            background: darkMode ? 
              'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 25, 35, 0.95) 100%)' : 
              'linear-gradient(135deg, rgba(245, 247, 250, 0.95) 0%, rgba(235, 240, 255, 0.95) 100%)'
          }}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${darkMode ? 'bg-gray-500/3' : 'bg-gray-500/5'} blur-3xl`}></div>
            <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full ${darkMode ? 'bg-gray-500/3' : 'bg-gray-500/5'} blur-3xl`}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-3 px-4 py-1 rounded-full backdrop-blur-sm border border-opacity-20"
                style={{ 
                  backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(100, 100, 255, 0.05)',
                  borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(100, 100, 255, 0.1)'
                }}>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}>
                  {language === "de" ? "Premium Zubehör" : "ملحقات متميزة"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className={`bg-gradient-to-r ${darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                  {t.accessories.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-xl ${darkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/90 border-gray-200/50"} backdrop-blur-sm hover:translate-y-[-5px]`}
                style={{ 
                  boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                <div className="h-32 md:h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90"></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-4xl md:text-5xl transform group-hover:scale-110 transition-all duration-500"
                         style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }}>
                      📱
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-blue-500 transition-colors duration-300`}>
                    {t.accessories.cases.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardDescription className={`${darkMode ? "text-gray-300" : "text-gray-600"} line-clamp-3`}>
                    {t.accessories.cases.description}
                  </CardDescription>
                  <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'} flex items-center group-hover:translate-x-1 transition-transform duration-300`}>
                      {language === "de" ? "Mehr anzeigen" : "عرض المزيد"}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-xl ${darkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/90 border-gray-200/50"} backdrop-blur-sm hover:translate-y-[-5px]`}
                style={{ 
                  boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                <div className="h-32 md:h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-90"></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-4xl md:text-5xl transform group-hover:scale-110 transition-all duration-500"
                         style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }}>
                      🛡️
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-purple-500 transition-colors duration-300`}>
                    {t.accessories.glass.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardDescription className={`${darkMode ? "text-gray-300" : "text-gray-600"} line-clamp-3`}>
                    {t.accessories.glass.description}
                  </CardDescription>
                  <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className={`text-sm font-medium ${darkMode ? 'text-purple-400' : 'text-purple-600'} flex items-center group-hover:translate-x-1 transition-transform duration-300`}>
                      {language === "de" ? "Mehr anzeigen" : "عرض المزيد"}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-xl ${darkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/90 border-gray-200/50"} backdrop-blur-sm hover:translate-y-[-5px]`}
                style={{ 
                  boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                <div className="h-32 md:h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600 opacity-90"></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-4xl md:text-5xl transform group-hover:scale-110 transition-all duration-500"
                         style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }}>
                      🔌
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-green-500 transition-colors duration-300`}>
                    {t.accessories.cables.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardDescription className={`${darkMode ? "text-gray-300" : "text-gray-600"} line-clamp-3`}>
                    {t.accessories.cables.description}
                  </CardDescription>
                  <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'} flex items-center group-hover:translate-x-1 transition-transform duration-300`}>
                      {language === "de" ? "Mehr anzeigen" : "عرض المزيد"}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
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
        <section id="contact" className="py-8 md:py-12 relative overflow-hidden"
          style={{ 
            background: darkMode ? 
              'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 25, 35, 0.95) 100%)' : 
              'linear-gradient(135deg, rgba(245, 247, 250, 0.95) 0%, rgba(235, 240, 255, 0.95) 100%)'
          }}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${darkMode ? 'bg-gray-500/3' : 'bg-gray-500/5'} blur-3xl`}></div>
            <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full ${darkMode ? 'bg-gray-500/3' : 'bg-gray-500/5'} blur-3xl`}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-3 px-4 py-1 rounded-full backdrop-blur-sm border border-opacity-20"
                style={{ 
                  backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(100, 100, 255, 0.05)',
                  borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(100, 100, 255, 0.1)'
                }}>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}>
                  {language === "de" ? "Kontakt & Beratung" : "الاتصال والاستشارة"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className={`bg-gradient-to-r ${darkMode ? 'from-blue-400 to-purple-400 text-transparent' : 'from-white to-gray-100 text-white'} bg-clip-text`}
                     style={{ 
                       textShadow: darkMode ? 'none' : '2px 2px 4px rgba(0,0,0,0.3)',
                       WebkitTextStroke: darkMode ? 'none' : '1px rgba(255,255,255,0.8)'
                     }}>
                  {t.contact.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-xl ${darkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/90 border-gray-200/50"} backdrop-blur-sm hover:translate-y-[-2px]`}
                  style={{ 
                    boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-blue-500 transition-colors duration-300`}>
                          {t.contact.email}
                        </h3>
                        <a href={`mailto:${t.contact.emailValue}`} className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300 hover:underline`}>
                          {t.contact.emailValue}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone Card */}
                <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-xl ${darkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/90 border-gray-200/50"} backdrop-blur-sm hover:translate-y-[-2px]`}
                  style={{ 
                    boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-green-500 transition-colors duration-300`}>
                          {t.contact.phone}
                        </h3>
                        <a href={`tel:${t.contact.phoneValue}`} className={`${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-600'} transition-colors duration-300 hover:underline`}>
                          {t.contact.phoneValue}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address Card */}
                <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-xl ${darkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/90 border-gray-200/50"} backdrop-blur-sm hover:translate-y-[-2px]`}
                  style={{ 
                    boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-purple-500 transition-colors duration-300`}>
                          {t.contact.address}
                        </h3>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                          {t.contact.addressValue}
                        </p>
                        <a 
                          href="https://www.google.com/maps/dir/?api=1&destination=Kronshagener+Weg+12,+24116+Kiel"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <span>{t.contact.showRoute}</span>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Interactive Map & Premium Features */}
              <div className="space-y-6">
                {/* Interactive Map */}
                <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-xl ${darkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/90 border-gray-200/50"} backdrop-blur-sm`}
                  style={{ 
                    boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-blue-500 transition-colors duration-300`}>
                      {language === "de" ? "Unser Standort" : "موقعنا"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden group cursor-pointer"
                         onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Kronshagener+Weg+12,+24116+Kiel', '_blank')}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-bold mb-2">HandyPro Kiel</h3>
                          <p className="text-sm opacity-90">Kronshagener Weg 12</p>
                          <p className="text-sm opacity-90">24116 Kiel</p>
                          <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                            <span>{language === "de" ? "Zur Karte" : "إلى الخريطة"}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>



                {/* Opening Hours */}
                <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-xl ${darkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/90 border-gray-200/50"} backdrop-blur-sm`}
                  style={{ 
                    boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-orange-500 transition-colors duration-300`}>
                      {t.contact.hours}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <div className="space-y-2">
                      {[
                        { day: t.contact.mon, hours: t.contact.monHours },
                        { day: t.contact.tue, hours: t.contact.tueHours },
                        { day: t.contact.wed, hours: t.contact.wedHours },
                        { day: t.contact.thu, hours: t.contact.thuHours },
                        { day: t.contact.fri, hours: t.contact.friHours },
                        { day: t.contact.sat, hours: t.contact.satHours },
                        { day: t.contact.sun, hours: t.contact.sunHours }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.day}
                          </span>
                          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} ${item.hours === t.contact.sunHours ? 'text-red-500' : ''}`}>
                            {item.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Creative Welcome Animation */}
      {showWelcomeAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4">
            {/* Step 1: HandyPro Logo Reveal */}
            {animationStep >= 1 && (
              <div className={`text-center mb-8 transition-all duration-1000 ${
                animationStep >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                  <img src="/logo.png" alt="HandyPro Logo" className="w-16 h-16 object-contain" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">HandyPro</h1>
                <p className="text-blue-200">Ihre Experten für Handyreparaturen</p>
              </div>
            )}

            {/* Step 2: Service Icons Float In */}
            {animationStep >= 2 && (
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { icon: "🔧", label: "Reparatur", delay: "0ms" },
                  { icon: "🔋", label: "Akku", delay: "200ms" },
                  { icon: "logo", label: "Display", delay: "400ms" },
                  { icon: "💧", label: "Wasser", delay: "600ms" }
                ].map((service, index) => (
                  <div
                    key={index}
                    className="text-center animate-bounce"
                    style={{ animationDelay: service.delay }}
                  >
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-white/10 flex items-center justify-center">
                      {service.icon === "logo" ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-xs">HP</span>
                        </div>
                      ) : (
                        <span className="text-2xl">{service.icon}</span>
                      )}
                    </div>
                    <p className="text-xs text-white/80">{service.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Stats Counter Animation */}
            {animationStep >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                {[
                  { value: "1K+", label: "Kunden", color: "text-green-400" },
                  { value: "1K+", label: "Reparaturen", color: "text-blue-400" },
                  { value: "100%", label: "Qualität", color: "text-purple-400" }
                ].map((stat, index) => (
                  <div key={index} className="animate-pulse">
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 4: Welcome Message */}
            {animationStep >= 4 && (
              <div className="text-center animate-fade-in">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {language === "de" ? "Willkommen!" : "مرحباً!"}
                  </h3>
                  <p className="text-sm text-white/80">
                    {language === "de" 
                      ? "Entdecken Sie unsere professionellen Reparaturservices"
                      : "اكتشف خدمات الإصلاح الاحترافية لدينا"
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="mt-8 flex justify-center space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    animationStep >= step ? "bg-blue-400" : "bg-white/30"
                  }`}
                />
              ))}
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
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>{t.contact.whatsapp}</span>
            </a>
            <a 
              href="mailto:handypro.kiel@gmail.com" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{t.contact.email}</span>
            </a>
            <a 
              href="https://www.instagram.com/handy_pro_kiel?igsh=ZW4xemNpbDBjdGls" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.032.388a5.918 5.918 0 0 0-2.14 1.393A5.918 5.918 0 0 0 .5 4.032c-.183.488-.306 1.062-.34 2.009C.025 7.989.013 8.396.013 12.017c0 3.624.013 4.03.048 4.978.034.946.157 1.52.34 2.009a5.918 5.918 0 0 0 1.394 2.14 5.918 5.918 0 0 0 2.14 1.394c.488.183 1.062.306 2.009.34.948.034 1.354.048 4.978.048 3.624 0 4.03-.014 4.978-.048.946-.034 1.52-.157 2.009-.34a5.918 5.918 0 0 0 2.14-1.394 5.918 5.918 0 0 0 1.394-2.14c.183-.488.306-1.062.34-2.009.034-.948.048-1.354.048-4.978 0-3.624-.014-4.03-.048-4.978-.034-.946-.157-1.52-.34-2.009a5.918 5.918 0 0 0-1.394-2.14A5.918 5.918 0 0 0 19.054.388c-.488-.183-1.062-.306-2.009-.34C16.097.013 15.69.013 12.017.013h.001zm-.117 2.178c.363-.002.766-.002 1.117-.002 3.56 0 3.983.013 4.894.048.86.034 1.326.158 1.637.263.411.16.705.351.978.624.274.273.464.567.624.978.105.311.229.777.263 1.637.035.911.048 1.334.048 4.894 0 3.56-.013 3.983-.048 4.894-.034.86-.158 1.326-.263 1.637a2.636 2.636 0 0 1-.624.978 2.636 2.636 0 0 1-.978.624c-.311.105-.777.229-1.637.263-.911.035-1.334.048-4.894.048-3.56 0-3.983-.013-4.894-.048-.86-.034-1.326-.158-1.637-.263a2.636 2.636 0 0 1-.978-.624 2.636 2.636 0 0 1-.624-.978c-.105-.311-.229-.777-.263-1.637-.035-.911-.048-1.334-.048-4.894 0-3.56.013-3.983.048-4.894.034-.86.158-1.326.263-1.637.16-.411.351-.705.624-.978.273-.274.567-.464.978-.624.311-.105.777-.229 1.637-.263.911-.035 1.334-.048 4.894-.048zm.788 6.823c-2.204 0-3.99 1.786-3.99 3.99s1.786 3.99 3.99 3.99 3.99-1.786 3.99-3.99-1.786-3.99-3.99-3.99zm0 6.581c-1.431 0-2.591-1.16-2.591-2.591 0-1.431 1.16-2.591 2.591-2.591 1.431 0 2.591 1.16 2.591 2.591 0 1.431-1.16 2.591-2.591 2.591zm5.085-6.753a.933.933 0 1 1-1.867 0 .933.933 0 0 1 1.867 0z"/>
              </svg>
              <span>{t.contact.instagram}</span>
            </a>
            <a 
              href="https://www.facebook.com/share/16iu2qkmz1/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{t.contact.facebook}</span>
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

      {/* GDPR Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl border transition-all duration-300 ${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {t.cookies.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {t.cookies.description}
                  </p>
                  <p className={`text-xs mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {t.cookies.moreInfo}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleCookieAction('acceptAll')}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {t.cookies.acceptAll}
                    </button>
                    <button
                      onClick={() => handleCookieAction('acceptNecessary')}
                      className={`px-6 py-2 border rounded-lg font-medium transition-all duration-200 ${
                        darkMode 
                          ? "border-gray-600 text-gray-300 hover:bg-gray-800" 
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {t.cookies.acceptNecessary}
                    </button>
                    <button
                      onClick={() => setShowCookieSettings(true)}
                      className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
                        darkMode 
                          ? "text-gray-400 hover:text-gray-200" 
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {t.cookies.settings}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showCookieSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl border transition-all duration-300 ${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <div className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {t.cookies.settings}
              </h3>
              
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {t.cookies.necessary}
                    </h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {t.cookies.necessaryDesc}
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className={`w-12 h-6 rounded-full bg-blue-600 relative`}>
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Analytics Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {t.cookies.analytics}
                    </h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {t.cookies.analyticsDesc}
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => setCookiePreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                        cookiePreferences.analytics ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        cookiePreferences.analytics ? "right-1" : "left-1"
                      }`}></div>
                    </button>
                  </div>
                </div>
                
                {/* Marketing Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {t.cookies.marketing}
                    </h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {t.cookies.marketingDesc}
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => setCookiePreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                        cookiePreferences.marketing ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        cookiePreferences.marketing ? "right-1" : "left-1"
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleCookieAction('saveCustom')}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  {t.cookies.save}
                </button>
                <button
                  onClick={() => setShowCookieSettings(false)}
                  className={`px-4 py-2 border rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? "border-gray-600 text-gray-300 hover:bg-gray-800" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer 
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        translations={translations}
      />
    </div>
  );
}