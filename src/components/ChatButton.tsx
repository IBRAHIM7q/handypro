"use client";

import { useState, useEffect } from "react";

interface ChatButtonProps {
  darkMode: boolean;
  translations: any;
  language: "de" | "ar";
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  showContactOptions?: boolean;
}

export default function ChatButton({ darkMode, translations, language }: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const t = translations[language];

  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: language === "de" 
          ? "Hallo! Ich bin HandyPro's AI Assistent. Wie kann ich Ihnen heute helfen?"
          : "مرحباً! أنا مساعد HandyPro الذكي. كيف يمكنني مساعدتك اليوم؟",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language, messages.length]);

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      href: "https://wa.me/4915771149895",
      detail: "01577 1149895"
    },
    {
      name: "E-Mail",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: "mailto:handypro.kiel@gmail.com",
      detail: "handypro.kiel@gmail.com"
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.032.388a5.918 5.918 0 0 0-2.14 1.393A5.918 5.918 0 0 0 .5 4.032c-.183.488-.306 1.062-.34 2.009C.025 7.989.013 8.396.013 12.017c0 3.624.013 4.03.048 4.978.034.946.157 1.52.34 2.009a5.918 5.918 0 0 0 1.394 2.14 5.918 5.918 0 0 0 2.14 1.394c.488.183 1.062.306 2.009.34.948.034 1.354.048 4.978.048 3.624 0 4.03-.014 4.978-.048.946-.034 1.52-.157 2.009-.34a5.918 5.918 0 0 0 2.14-1.394 5.918 5.918 0 0 0 1.394-2.14c.183-.488.306-1.062.34-2.009.034-.948.048-1.354.048-4.978 0-3.624-.014-4.03-.048-4.978-.034-.946-.157-1.52-.34-2.009a5.918 5.918 0 0 0-1.394-2.14A5.918 5.918 0 0 0 19.054.388c-.488-.183-1.062-.306-2.009-.34C16.097.013 15.69.013 12.017.013h.001zm-.117 2.178c.363-.002.766-.002 1.117-.002 3.56 0 3.983.013 4.894.048.86.034 1.326.158 1.637.263.411.16.705.351.978.624.274.273.464.567.624.978.105.311.229.777.263 1.637.035.911.048 1.334.048 4.894 0 3.56-.013 3.983-.048 4.894-.034.86-.158 1.326-.263 1.637a2.636 2.636 0 0 1-.624.978 2.636 2.636 0 0 1-.978.624c-.311.105-.777.229-1.637.263-.911.035-1.334.048-4.894.048-3.56 0-3.983-.013-4.894-.048-.86-.034-1.326-.158-1.637-.263a2.636 2.636 0 0 1-.978-.624 2.636 2.636 0 0 1-.624-.978c-.105-.311-.229-.777-.263-1.637-.035-.911-.048-1.334-.048-4.894 0-3.56.013-3.983.048-4.894.034-.86.158-1.326.263-1.637.16-.411.351-.705.624-.978.273-.274.567-.464.978-.624.311-.105.777-.229 1.637-.263.911-.035 1.334-.048 4.894-.048zm.788 6.823c-2.204 0-3.99 1.786-3.99 3.99s1.786 3.99 3.99 3.99 3.99-1.786 3.99-3.99-1.786-3.99-3.99-3.99zm0 6.581c-1.431 0-2.591-1.16-2.591-2.591 0-1.431 1.16-2.591 2.591-2.591 1.431 0 2.591 1.16 2.591 2.591 0 1.431-1.16 2.591-2.591 2.591zm5.085-6.753a.933.933 0 1 1-1.867 0 .933.933 0 0 1 1.867 0z"/>
        </svg>
      ),
      href: "https://www.instagram.com/handy_pro_kiel?igsh=ZW4xemNpbDBjdGls",
      detail: "@handy_pro_kiel"
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: "https://www.facebook.com/share/16iu2qkmz1/?mibextid=wwXIfr",
      detail: "HandyPro Kiel"
    }
  ];

  const suggestedQuestions = [
    language === "de" ? "Was kostet eine Handy-Reparatur?" : "كم تكلفة إصلاح الهاتف؟",
    language === "de" ? "Wie lange dauert eine Reparatur?" : "كم يستغرق الإصلاح؟",
    language === "de" ? "Welche Garantie gibt es?" : "ما هي الضمانة؟",
    language === "de" ? "Wo sind Sie located?" : "أين تقعون؟"
  ];

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("preis") || message.includes("kosten") || message.includes("price") || message.includes("cost")) {
      return language === "de" 
        ? "Die Preise variieren je nach Gerät und Problem. Display-Reparaturen beginnen ab 50€. Für eine genaue Kostenschätzung kontaktieren Sie uns gerne!"
        : "تختلف الأسعار حسب الجهاز والمشكلة. إصلاح الشاشات يبدأ من 50 يورو. للحصول على تقدير دقيق للتكلفة، تواصل معنا!";
    }
    
    if (message.includes("zeit") || message.includes("dauer") || message.includes("time") || message.includes("duration")) {
      return language === "de" 
        ? "Die meisten Reparaturen dauern 1-3 Stunden. Bei komplexeren Problemen kann es 1-2 Tage dauern. Wir informieren Sie über die voraussichtliche Dauer!"
        : "معظم الإصلاحات تستغرق 1-3 ساعات. في المشاكل المعقدة قد تستغرق 1-2 أيام. سنخبرك بالمدة المتوقعة!";
    }
    
    if (message.includes("garantie") || message.includes("warranty") || message.includes("ضمان")) {
      return language === "de" 
        ? "Wir bieten 6 Monate Garantie auf alle Reparaturen. Bei Originalteilen sogar 12 Monate. Ihre Zufriedenheit ist unsere Priorität!"
        : "نقدم ضمانة 6 أشهر على جميع الإصلاحات. مع القطع الأصلية حتى 12 شهراً. رضاكم أولويتنا!";
    }
    
    if (message.includes("wo") || message.includes("adresse") || message.includes("location") || message.includes("أين")) {
      return language === "de" 
        ? "Wir befinden uns in Kiel, Deutschland. Besuchen Sie uns oder wir holen Ihr Gerät ab. Kontaktieren Sie uns für die genaue Adresse!"
        : "نحن موجودون في كييل، ألمانيا. زوروا أو يمكننا استلام جهازكم. تواصلوا معنا للعنوان الدقيق!";
    }
    
    // Default response
    return language === "de" 
      ? "Vielen Dank für Ihre Frage! Unser Expertenteam hilft Ihnen gerne weiter. Kontaktieren Sie uns über eine der folgenden Optionen:"
      : "شكراً لسؤالك! فريق الخبراء لدينا يسعد بمساعدتك. تواصل معنا عبر إحدى الخيارات التالية:";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
        showContactOptions: true // Show contact options after AI response
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className={`fixed bottom-6 ${language === "ar" ? "left-6" : "right-6"} z-50 transition-all duration-300 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
    }`}>
      {/* Chat Interface */}
      {isOpen && (
        <div className={`mb-4 w-80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          darkMode ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">HandyPro</h3>
                <p className="text-xs text-blue-100">
                  {language === "de" ? "AI Assistent" : "مساعد ذكي"}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
                
                {/* Contact Options after AI response */}
                {message.showContactOptions && (
                  <div className="mt-3 space-y-2">
                    {contactOptions.map((option, index) => (
                      <div key={index} className="flex justify-start">
                        <a
                          href={option.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-2xl transition-all duration-200 hover:scale-105 flex items-center space-x-3 ${
                            darkMode 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          } shadow-md hover:shadow-lg`}
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          <div className="text-white">{option.icon}</div>
                          <div>
                            <p className="font-medium text-sm">{option.name}</p>
                            <p className="text-xs opacity-90">{option.detail}</p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-2xl ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className={`text-xs mb-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {language === "de" ? "Häufige Fragen:" : "أسئلة شائعة:"}
              </p>
              <div className="space-y-1">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className={`w-full text-left text-xs p-2 rounded-lg transition-colors ${
                      darkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className={`p-4 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  language === "de" 
                    ? "Schreiben Sie Ihre Nachricht..."
                    : "اكتب رسالتك..."
                }
                className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </button>
    </div>
  );
}