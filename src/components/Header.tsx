"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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

export default function Header({
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? `${darkMode ? "bg-black/90 backdrop-blur-lg border-b border-gray-900/50" : "bg-white/90 backdrop-blur-lg border-b border-gray-200/50"} py-2 shadow-lg` 
        : "py-4"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center shadow-lg">
            <AnimatedLogo />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-500 to-gray-600 bg-clip-text text-transparent">
              HandyPro
            </span>
            <p className="text-xs opacity-70">Kiel</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {["hero", "services", "accessories", "process", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`font-medium transition-all duration-300 relative group ${
                activeSection === section 
                  ? "text-slate-500" 
                  : `${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`
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
          {/* Language Switcher */}
          <Select value={language} onValueChange={(value: "de" | "ar") => setLanguage(value)}>
            <SelectTrigger className={`w-16 h-9 ${scrolled ? "border-gray-300" : "border-transparent"}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="de">DE</SelectItem>
              <SelectItem value="ar">AR</SelectItem>
            </SelectContent>
          </Select>

          {/* Dark Mode Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setDarkMode(!darkMode)}
            className={`h-9 w-9 rounded-full transition-all duration-300 ${
              scrolled ? "hover:bg-gray-200 dark:hover:bg-gray-700" : ""
            }`}
          >
            {darkMode ? (
              <span className="text-xl transition-transform duration-300 hover:rotate-180">☀️</span>
            ) : (
              <span className="text-xl transition-transform duration-300 hover:rotate-180">🌙</span>
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`lg:hidden h-9 w-9 rounded-full transition-all duration-300 ${
                  scrolled ? "hover:bg-gray-200 dark:hover:bg-gray-700" : ""
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
                {["hero", "services", "accessories", "process", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
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
}