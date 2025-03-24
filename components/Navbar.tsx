'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -85% 0px', // Срабатывает, когда секция занимает верхнюю часть экрана
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (sections.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Закрываем мобильное меню если оно открыто
      setMenuOpen(false);
      
      // Простой скролл к элементу
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: t.navbar.home, href: '#home', id: 'home' },
    { name: t.navbar.about, href: '#about', id: 'about' },
    { name: t.navbar.services, href: '#services', id: 'services' },
    { name: t.navbar.portfolio, href: '#portfolio', id: 'portfolio' },
    { name: t.navbar.contact, href: '#contact', id: 'contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-primary/95 backdrop-blur-md shadow-md' : 'py-6 bg-primary/90 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, 'home')}
            className="flex items-center"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gradient"
            >
              {'{ ... } AngstremOFF'}
            </motion.div>
          </a>

          {/* Мобильное меню */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Десктопное меню */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className={`text-sm font-medium transition-all hover:text-accent ${
                  activeSection === item.id ? 'text-accent' : 'text-white/80'
                }`}
              >
                {item.name}
              </a>
            ))}
            
            {/* Переключатель языка */}
            <LanguageSwitcher />
          </div>
        </div>

        {/* Мобильное меню выпадающее */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 flex flex-col items-center">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className={`text-base font-medium transition-all hover:text-accent ${
                  activeSection === item.id ? 'text-accent' : 'text-white/80'
                }`}
              >
                {item.name}
              </a>
            ))}
            
            {/* Переключатель языка в мобильном меню */}
            <div className="mt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
