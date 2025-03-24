'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import ru from '../locales/ru';
import en from '../locales/en';
import sr from '../locales/sr';

// Словарь всех доступных переводов
const translations = {
  ru,
  en,
  sr
};

// Используем Record<string, any> для более гибкой типизации
type LanguageContextType = {
  lang: 'ru' | 'en' | 'sr';
  setLang: (lang: 'ru' | 'en' | 'sr') => void;
  t: Record<string, any>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Инициализируем язык из localStorage или используем русский по умолчанию
  const [lang, setLangState] = useState<'ru' | 'en' | 'sr'>('ru');
  
  // Загружаем сохраненный язык при первом рендере
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('language') as 'ru' | 'en' | 'sr';
      if (savedLang && ['ru', 'en', 'sr'].includes(savedLang)) {
        setLangState(savedLang);
      }
    } catch (error) {
      console.error('Ошибка при чтении языка из localStorage:', error);
    }
  }, []);
  
  // Функция для установки языка и сохранения его в localStorage
  const setLang = (newLang: 'ru' | 'en' | 'sr') => {
    setLangState(newLang);
    try {
      localStorage.setItem('language', newLang);
    } catch (error) {
      console.error('Ошибка при сохранении языка в localStorage:', error);
    }
  };

  const contextValue = {
    lang,
    setLang,
    t: translations[lang]
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage должен использоваться внутри LanguageProvider');
  }
  return context;
}
