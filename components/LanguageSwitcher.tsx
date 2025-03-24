'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const languages = [
  { code: 'ru', name: 'Русский', flag: '/flags/ru.svg' },
  { code: 'en', name: 'English', flag: '/flags/en.svg' },
  { code: 'sr', name: 'Српски', flag: '/flags/sr.svg' }
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang, setLang } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint в Tailwind
    };
    
    // Проверяем при загрузке
    checkIfMobile();
    
    // Проверяем при изменении размера окна
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switchLanguage = (langCode: 'ru' | 'en' | 'sr') => {
    setLang(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(item => item.code === lang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105 focus:outline-none"
        aria-label="Переключить язык"
      >
        <img 
          src={currentLanguage.flag} 
          alt={currentLanguage.name} 
          className="w-full h-full object-cover"
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`
              ${isMobile ? 'absolute left-0 right-0 mx-auto' : 'absolute right-0'} 
              mt-2 w-12 rounded-xl overflow-hidden glass-effect border border-white/10 z-50
            `}
            style={{
              marginLeft: isMobile ? 'auto' : '',
              marginRight: isMobile ? 'auto' : '',
              width: '48px',
            }}
          >
            <div className="py-1">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => switchLanguage(item.code as 'ru' | 'en' | 'sr')}
                  className={`w-full flex justify-center p-2 hover:bg-accent/20 transition-all ${
                    item.code === lang ? 'bg-accent/30' : ''
                  }`}
                >
                  <img 
                    src={item.flag} 
                    alt={item.name} 
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
