"use client";

import { useState, useEffect } from "react";

interface ChatButtonProps {
  darkMode: boolean;
  translations: any;
  language: "de" | "ar";
}

export default function ChatButton({ darkMode, translations, language }: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[language];

  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatContainer = document.getElementById("chat-container");
      if (chatContainer && !chatContainer.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const contactMethods = [
    {
      name: t.contact.whatsapp,
      icon: "📱",
      color: "bg-green-600 hover:bg-green-700",
      href: "https://wa.me/4915771149895",
      target: "_blank"
    },
    {
      name: t.contact.email,
      icon: "✉️",
      color: "bg-blue-600 hover:bg-blue-700",
      href: "mailto:handypro.kiel@gmail.com",
      target: "_blank"
    },
    {
      name: t.contact.instagram,
      icon: "📷",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      href: "https://www.instagram.com/handy_pro_kiel?igsh=ZW4xemNpbDBjdGls",
      target: "_blank"
    },
    {
      name: t.contact.facebook,
      icon: "📘",
      color: "bg-blue-700 hover:bg-blue-800",
      href: "https://www.facebook.com/share/16iu2qkmz1/?mibextid=wwXIfr",
      target: "_blank"
    }
  ];

  return (
    <div id="chat-container" className={`fixed bottom-6 ${language === "ar" ? "left-6" : "right-6"} z-50 transition-all duration-300 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
    }`}>
      {/* Chat Options */}
      <div className={`absolute bottom-16 ${language === "ar" ? "left-0" : "right-0"} space-y-3 transition-all duration-300 ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}>
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.href}
            target={method.target}
            rel="noopener noreferrer"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 ${
              method.color
            } shadow-lg hover:shadow-xl ${
              language === "ar" ? "flex-row-reverse space-x-reverse" : ""
            }`}
            style={{
              transitionDelay: `${index * 50}ms`,
              minWidth: language === "ar" ? "200px" : "180px"
            }}
          >
            <span className="text-xl">{method.icon}</span>
            <span className="text-sm whitespace-nowrap">{method.name}</span>
          </a>
        ))}
      </div>

      {/* Main Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
          darkMode 
            ? "bg-slate-700 hover:bg-slate-600 text-white" 
            : "bg-slate-600 hover:bg-slate-500 text-white"
        } ${isOpen ? "rotate-45" : ""}`}
        aria-label={isOpen ? "Chat schließen" : "Chat öffnen"}
      >
        {/* Pulse animation when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-slate-600 animate-ping opacity-20"></div>
        )}
        
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-0" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"}
          />
        </svg>
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className={`absolute bottom-full ${language === "ar" ? "left-0" : "right-0"} mb-2 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-700 text-white"
        } pointer-events-none opacity-0 group-hover:opacity-100`}>
          {language === "de" ? "Kontaktieren Sie uns" : "تواصل معنا"}
          <div className={`absolute top-full ${language === "ar" ? "left-4" : "right-4"} w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent ${
            darkMode ? "border-t-gray-800" : "border-t-gray-700"
          }`}></div>
        </div>
      )}
    </div>
  );
}