"use client";

import { Button } from "@/components/ui/button";

interface FooterProps {
  language: "de" | "ar";
  setLanguage: (lang: "de" | "ar") => void;
  darkMode: boolean;
  translations: any;
}

export default function Footer({
  language,
  setLanguage,
  darkMode,
  translations
}: FooterProps) {
  const t = translations[language];
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full relative overflow-hidden ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-black to-gray-900" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left blob - enhanced visibility and better positioned for mobile */}
        <div className={`absolute top-1/4 left-1/4 md:-top-20 md:-left-20 
          w-80 h-80 md:w-60 md:h-60 rounded-full 
          ${darkMode ? "bg-blue-500/25" : "bg-blue-500/30"} 
          blur-2xl
          transform transition-transform duration-1000 animate-pulse`}></div>
        
        {/* Bottom right blob - enhanced visibility and better positioned for mobile */}
        <div className={`absolute bottom-1/4 right-1/4 md:-bottom-20 md:-right-20 
          w-80 h-80 md:w-60 md:h-60 rounded-full 
          ${darkMode ? "bg-purple-500/25" : "bg-purple-500/30"} 
          blur-2xl
          transform transition-transform duration-1000 animate-pulse`}></div>
        
        {/* Middle blob - visible on all screen sizes */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-80 h-80 md:w-60 md:h-60 rounded-full 
          ${darkMode ? "bg-cyan-500/20" : "bg-cyan-500/25"} 
          blur-2xl
          animate-pulse`}></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <img 
                  src="/logo.png" 
                  alt="HandyPro - Professional Mobile Phone Repair Service Logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    console.warn('Footer logo image failed to load, using fallback text');
                    e.currentTarget.style.display = 'none';
                    const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                    if (sibling) {
                      sibling.style.display = 'flex';
                      sibling.style.alignItems = 'center';
                      sibling.style.justifyContent = 'center';
                      sibling.style.fontSize = '14px';
                      sibling.style.fontWeight = 'bold';
                    }
                  }}
                  onLoad={() => {
                    console.log('Footer logo image loaded successfully');
                  }}
                />
                <span 
                  className="text-white font-bold text-lg" 
                  style={{
                    display: 'none',
                    color: '#ffffff',
                    textAlign: 'center'
                  }}
                  role="img"
                  aria-label="HandyPro Logo"
                >
                  HP
                </span>
              </div>
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  HandyPro
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Kiel
                </p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"} max-w-sm`}>
              {language === "de" 
                ? "Ihre vertrauenswürdigen Experten für professionelle Handyreparaturen in Kiel. Schnell, zuverlässig und mit Garantie."
                : "خبراؤكم الموثوقون في إصلاح الهواتف الاحترافي في كيل. سريع وموثوق وبضمان."
              }
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {language === "de" ? "Schnellzugriff" : "روابط سريعة"}
            </h4>
            <div className="space-y-3">
              {[
                { label: language === "de" ? "Displayreparatur" : "إصلاح الشاشة", icon: "🔧" },
                { label: language === "de" ? "Akkuwechsel" : "استبدال البطارية", icon: "🔋" },
                { label: language === "de" ? "Wasserschaden" : "أضرار المياه", icon: "💧" },
                { label: language === "de" ? "Datenrettung" : "استعادة البيانات", icon: "💾" }
              ].map((item, index) => (
                <div key={index} className={`flex items-center space-x-3 text-sm group cursor-pointer transition-colors duration-200 ${
                  darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                }`}>
                  <span className="text-base group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {language === "de" ? "Kontakt & Social" : "التواصل والشبكات"}
            </h4>
            <div className="space-y-3">
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span>📍</span>
                  <span>Kronshagener Weg 12, 24116 Kiel</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span>📞</span>
                  <a href="tel:015771149895" className="hover:text-blue-500 transition-colors">01577 1149895</a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
                  <a href="mailto:handypro.kiel@gmail.com" className="hover:text-blue-500 transition-colors">handypro.kiel@gmail.com</a>
                </div>
              </div>
              
              {/* Social Media with modern icons */}
              <div className="flex space-x-3 pt-2">
                <a 
                  href="https://www.instagram.com/handy_pro_kiel?igsh=ZW4xemNpbDBjdGls" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.032.388a5.918 5.918 0 0 0-2.14 1.393A5.918 5.918 0 0 0 .5 4.032c-.183.488-.306 1.062-.34 2.009C.025 7.989.013 8.396.013 12.017c0 3.624.013 4.03.048 4.978.034.946.157 1.52.34 2.009a5.918 5.918 0 0 0 1.394 2.14 5.918 5.918 0 0 0 2.14 1.394c.488.183 1.062.306 2.009.34.948.034 1.354.048 4.978.048 3.624 0 4.03-.014 4.978-.048.946-.034 1.52-.157 2.009-.34a5.918 5.918 0 0 0 2.14-1.394 5.918 5.918 0 0 0 1.394-2.14c.183-.488.306-1.062.34-2.009.034-.948.048-1.354.048-4.978 0-3.624-.014-4.03-.048-4.978-.034-.946-.157-1.52-.34-2.009a5.918 5.918 0 0 0-1.394-2.14A5.918 5.918 0 0 0 19.054.388c-.488-.183-1.062-.306-2.009-.34C16.097.013 15.69.013 12.017.013h.001zm-.117 2.178c.363-.002.766-.002 1.117-.002 3.56 0 3.983.013 4.894.048.86.034 1.326.158 1.637.263.411.16.705.351.978.624.274.273.464.567.624.978.105.311.229.777.263 1.637.035.911.048 1.334.048 4.894 0 3.56-.013 3.983-.048 4.894-.034.86-.158 1.326-.263 1.637a2.636 2.636 0 0 1-.624.978 2.636 2.636 0 0 1-.978.624c-.311.105-.777.229-1.637.263-.911.035-1.334.048-4.894.048-3.56 0-3.983-.013-4.894-.048-.86-.034-1.326-.158-1.637-.263a2.636 2.636 0 0 1-.978-.624 2.636 2.636 0 0 1-.624-.978c-.105-.311-.229-.777-.263-1.637-.035-.911-.048-1.334-.048-4.894 0-3.56.013-3.983.048-4.894.034-.86.158-1.326.263-1.637.16-.411.351-.705.624-.978.273-.274.567-.464.978-.624.311-.105.777-.229 1.637-.263.911-.035 1.334-.048 4.894-.048zm.788 6.823c-2.204 0-3.99 1.786-3.99 3.99s1.786 3.99 3.99 3.99 3.99-1.786 3.99-3.99-1.786-3.99-3.99-3.99zm0 6.581c-1.431 0-2.591-1.16-2.591-2.591 0-1.431 1.16-2.591 2.591-2.591 1.431 0 2.591 1.16 2.591 2.591 0 1.431-1.16 2.591-2.591 2.591zm5.085-6.753a.933.933 0 1 1-1.867 0 .933.933 0 0 1 1.867 0z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/16iu2qkmz1/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/4915771149895" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section with language switcher and copyright */}
        <div className={`pt-8 border-t ${
          darkMode ? "border-gray-800" : "border-gray-200"
        } flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}>
          {/* Copyright */}
          <div className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          } flex items-center space-x-2`}>
            <span>© {currentYear} HandyPro Kiel.</span>
            <span>{t.footer.rights}</span>
          </div>
          
          {/* Language switcher - enhanced and fixed for desktop */}
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              {t.footer.language}:
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage("de")}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium cursor-pointer ${
                  language === "de" 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                    : `${
                      darkMode 
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`
                }`}
                type="button"
              >
                Deutsch
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium cursor-pointer ${
                  language === "ar" 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                    : `${
                      darkMode 
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`
                }`}
                type="button"
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}