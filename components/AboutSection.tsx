'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-primary snap-section">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#9C27B0]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4"
          >
            {t.about.title}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold mb-6"
          >
            <span className="text-gradient">{t.about.subtitle}</span> — {t.about.digitalGuide}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-300"
          >
            {t.about.description}
          </motion.p>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-accent/30 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3">{t.about.creativeApproach}</h3>
              <p className="text-gray-400">{t.about.creativeApproachDescription}</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-accent/30 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3">{t.about.modernTechnologies}</h3>
              <p className="text-gray-400">{t.about.modernTechnologiesDescription}</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-accent/30 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3">{t.about.individualApproach}</h3>
              <p className="text-gray-400">{t.about.individualApproachDescription}</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden border border-white/10 glass-effect">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-[#9C27B0]/20 mix-blend-overlay"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#9C27B0]/20 rounded-full blur-3xl"></div>
              
              <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-[#9C27B0] animate-spin-slow blur-xl opacity-50"></div>
                  <div className="relative h-full w-full rounded-full bg-primary flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-gradient">A</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4">{t.about.ourMission}</h3>
                <p className="text-gray-300 mb-6">{t.about.ourMissionDescription}</p>
                
                <div className="flex flex-wrap justify-center gap-6 w-full">
                  <div className="text-center px-2">
                    <div className="text-2xl font-bold text-gradient mb-1">{t.about.services.uiUx}</div>
                    <div className="text-sm text-gray-400">{t.about.services.uiUxDescription}</div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-2xl font-bold text-gradient mb-1">{t.about.services.webMobile}</div>
                    <div className="text-sm text-gray-400">{t.about.services.webMobileDescription}</div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-2xl font-bold text-gradient mb-1">{t.about.services.seo}</div>
                    <div className="text-sm text-gray-400">{t.about.services.seoDescription}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
