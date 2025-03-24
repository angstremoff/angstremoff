'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Простая анимация фона без сложных плагинов
    if (heroRef.current) {
      const bg = heroRef.current.querySelector('.hero-bg');
      if (bg) {
        gsap.to(bg, {
          y: '10%',
          duration: 10,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        });
      }
    }
  }, []);

  // Обработчик для плавной прокрутки
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // высота навбара + небольшой отступ
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" ref={heroRef} className="min-h-screen relative flex items-center py-20">
      {/* Фоновые элементы */}
      <div className="hero-bg absolute inset-0 overflow-hidden">
        {/* Основной градиентный фон с анимацией */}
        <div className="animated-bg"></div>
        
        {/* Декоративные элементы */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-accent/30 filter blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[15%] w-80 h-80 rounded-full bg-purple-500/20 filter blur-[100px]"></div>
          <div className="absolute top-[60%] left-[60%] w-40 h-40 rounded-full bg-blue-500/30 filter blur-[80px]"></div>
        </div>
        
        {/* Сетка */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-xl text-accent font-medium mb-4"
            >
              {t.hero.studio}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            >
              <span className="text-gradient">{t.hero.digitalWorld}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl"
            >
              {t.hero.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="#portfolio" 
                onClick={(e) => handleSmoothScroll(e, 'portfolio')}
                className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-full font-medium transition-all hover-scale text-center"
              >
                {t.hero.portfolio}
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="px-8 py-3 bg-transparent border border-white/20 hover:border-white/40 text-white rounded-full font-medium transition-all hover-scale text-center"
              >
                {t.hero.contact}
              </a>
            </motion.div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center">
            {/* Буквы "Аа" без градиентной анимации, на прозрачном фоне */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl bg-white/10 backdrop-blur-sm p-10 shadow-lg"
            >
              <h2 className="text-9xl font-display font-bold text-white/80">
                Aa
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
