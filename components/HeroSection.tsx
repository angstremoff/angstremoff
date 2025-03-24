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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden snap-section">
      {/* Фоновые элементы */}
      <div className="hero-bg absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/80"></div>
        
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
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative rounded-3xl overflow-hidden aspect-square"
          >
            {/* Здесь может быть ваша 3D модель или анимация */}
            <div className="relative h-full w-full bg-gradient-to-br from-accent/30 via-purple-500/20 to-blue-500/30 p-1 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
              <div className="absolute inset-0 bg-noise-pattern opacity-10"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Скролл индикатор */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a 
          href="#about" 
          onClick={(e) => handleSmoothScroll(e, 'about')}
          className="block"
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-9 rounded-full border-2 border-white/20 flex justify-center items-start p-1"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full"></div>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
