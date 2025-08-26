"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// These imports are not needed since we're passing props directly
import AnimatedLogo from "./AnimatedLogo";

interface HeaderProps {
  language: "de" | "ar";
  setLanguage: (lang: "de" | "ar") => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  translations: any;
}

const Header = memo(function Header({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activeSection,
  scrollToSection,
  translations
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const t = translations[language];

  // Optimized scroll handling with useCallback
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? `${darkMode ? "bg-black/90 backdrop-blur-lg" : "bg-white/90 backdrop-blur-lg"} py-2 shadow-lg rounded-full mx-4 mt-2` 
        : "py-4 rounded-full mx-4 mt-2 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-lg"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - moved to the left with home link */}
        <div 
          className="flex items-center space-x-3 ml-2 cursor-pointer" 
          onClick={() => scrollToSection("hero")}
          role="button"
          tabIndex={0}
          aria-label={language === "de" ? "Zur Startseite" : "إلى الصفحة الرئيسية"}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToSection("hero");
            }
          }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center shadow-lg">
            <AnimatedLogo />
          </div>
          <div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              scrolled 
                ? (darkMode ? "text-gray-400" : "text-gray-500") 
                : "text-gray-300"
            }`}>
              HandyPro
            </span>
            <p className={`text-xs transition-colors duration-300 ${
              scrolled 
                ? (darkMode ? "text-gray-300" : "text-gray-600") 
                : "text-gray-300"
            }`}>Kiel</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label={language === "de" ? "Hauptnavigation" : "التنقل الرئيسي"}>
          {["hero", "services", "accessories", "process", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`font-medium transition-all duration-300 relative group ${
                activeSection === section 
                  ? (scrolled ? "text-slate-500" : "text-blue-300") 
                  : scrolled 
                    ? (darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900")
                    : "text-gray-200 hover:text-white"
              }`}
            >
              {t.nav[section === "hero" ? "home" : section]}
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-gray-600 transition-all duration-300 ${
                activeSection === section ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher - Desktop only with simple buttons */}
          <div className="hidden lg:flex items-center space-x-2 bg-white/10 dark:bg-gray-800/50 rounded-full p-1">
            <button
              onClick={() => {
                console.log('Setting language to DE');
                setLanguage("de");
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                language === "de" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700"
              }`}
            >
              🇩🇪 DE
            </button>
            <button
              onClick={() => {
                console.log('Setting language to AR');
                setLanguage("ar");
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                language === "ar" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700"
              }`}
            >
              🇸🇦 AR
            </button>
          </div>

          {/* Dark Mode Toggle - More visible */}
          <Button 
            variant={darkMode ? "outline" : "default"}
            onClick={(e) => {
              e.preventDefault();
              setDarkMode(!darkMode);
            }}
            style={{ 
              WebkitTapHighlightColor: 'transparent', 
              touchAction: 'manipulation',
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
            className={`h-9 px-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
              darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-yellow-100 text-gray-800"
            }`}
          >
            {darkMode ? (
              <>
                <span className="text-xl transition-transform duration-300" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>☀️</span>
                <span className="text-xs" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>Hell</span>
              </>
            ) : (
              <>
                <span className="text-xl transition-transform duration-300" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>🌙</span>
                <span className="text-xs" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>Dunkel</span>
              </>
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`lg:hidden h-9 w-9 rounded-full transition-all duration-300 ${
                  scrolled 
                    ? "hover:bg-gray-200 dark:hover:bg-gray-700" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span className="text-xl">☰</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side={language === "ar" ? "right" : "left"} 
              className={`w-80 ${darkMode ? "bg-black" : "bg-white"} backdrop-blur-lg`}
            >
              <SheetHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center">
                    <AnimatedLogo />
                  </div>
                  <SheetTitle className="text-xl">HandyPro</SheetTitle>
                </div>
              </SheetHeader>
              <div className="py-6 space-y-4">
                {/* Navigation */}
                {["hero", "services", "accessories", "process", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      scrollToSection(section);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                      activeSection === section 
                        ? "bg-slate-500/10 text-slate-500 border-l-4 border-slate-500" 
                        : `${darkMode ? "text-gray-300 hover:bg-gray-900" : "text-gray-600 hover:bg-gray-100"}`
                    }`}
                  >
                    {t.nav[section === "hero" ? "home" : section]}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
});

export default Header;