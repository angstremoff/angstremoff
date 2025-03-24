'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Определяем тип для проекта
interface Project {
  id: number;
  title: string;
  category: string;
  thumbnail?: string;
  images?: string[];
  description: string;
  technologies?: string[];
  isFeatured?: boolean;
}

export default function PortfolioSection() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  // Категории для фильтрации на основе языкового контекста
  const categories = [
    t.portfolio.all,
    t.portfolio.webDevelopment,
    t.portfolio.design,
    t.portfolio.mobile,
    t.portfolio.branding,
  ];
  
  // Создаем проекты напрямую в соответствии с выбранным языком
  const getProjectsByLanguage = () => {
    if (lang === 'ru') {
      return [
        {
          id: 1,
          title: 'Портал недвижимости DomGo.rs',
          category: 'Веб-разработка',
          description: 'Современный портал недвижимости для Сербии. Платформа предоставляет удобный поиск объектов на карте, фильтрацию, просмотр квартир и домов для аренды или покупки. Реализована система фильтров и личный кабинет.',
          thumbnail: '/portfolio/domgo/domgo-1.png',
          images: ['/portfolio/domgo/domgo-1.png', '/portfolio/domgo/domgo-2.png'],
          technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Mapbox'],
          isFeatured: true
        },
        {
          id: 2,
          title: 'ASS Портал',
          category: 'Веб-разработка',
          description: 'Портал ассоциации раздачи бесплатных продуктов. Система позволяет управлять распределением продуктов, отслеживать запасы и формировать отчеты о выданных продуктах. Реализован удобный интерфейс администратора.',
          thumbnail: '/portfolio/ass/ass-1.png',
          images: ['/portfolio/ass/ass-1.png', '/portfolio/ass/ass-2.png'],
          technologies: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Material UI'],
          isFeatured: true
        }
      ];
    } else if (lang === 'sr') {
      return [
        {
          id: 1,
          title: 'Портал за некретнине DomGo.rs',
          category: 'Веб развој',
          description: 'Модеран портал за некретнине за Србију. Платформа обезбеђује практичну претрагу некретнина на мапи, филтрирање, преглед станова и кућа за изнајмљивање или куповину. Имплементиран је систем филтера и лични налог.',
          thumbnail: '/portfolio/domgo/domgo-1.png',
          images: ['/portfolio/domgo/domgo-1.png', '/portfolio/domgo/domgo-2.png'],
          technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Mapbox'],
          isFeatured: true
        },
        {
          id: 2,
          title: 'АСС Портал',
          category: 'Веб развој',
          description: 'Портал за удружење које дели бесплатне производе. Систем омогућава управљање дистрибуцијом производа, праћење залиха и генерисање извештаја о дистрибуираним производима. Имплементиран је кориснички интерфејс за администраторе.',
          thumbnail: '/portfolio/ass/ass-1.png',
          images: ['/portfolio/ass/ass-1.png', '/portfolio/ass/ass-2.png'],
          technologies: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Material UI'],
          isFeatured: true
        }
      ];
    } else {
      return [
        {
          id: 1,
          title: 'Real Estate Portal DomGo.rs',
          category: 'Web Development',
          description: 'Modern real estate portal for Serbia. The platform provides convenient property search on a map, filtering, viewing apartments and houses for rent or purchase. A filter system and personal account have been implemented.',
          thumbnail: '/portfolio/domgo/domgo-1.png',
          images: ['/portfolio/domgo/domgo-1.png', '/portfolio/domgo/domgo-2.png'],
          technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Mapbox'],
          isFeatured: true
        },
        {
          id: 2,
          title: 'ASS Portal',
          category: 'Web Development',
          description: 'A portal for an association distributing free products. The system allows managing product distribution, tracking inventory, and generating reports on distributed products. A user-friendly administrator interface has been implemented.',
          thumbnail: '/portfolio/ass/ass-1.png',
          images: ['/portfolio/ass/ass-1.png', '/portfolio/ass/ass-2.png'],
          technologies: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Material UI'],
          isFeatured: true
        }
      ];
    }
  };

  const [projects, setProjects] = useState<Project[]>(getProjectsByLanguage());
  const [activeCategory, setActiveCategory] = useState(t.portfolio.all);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  
  // Обновляем проекты при изменении языка
  useEffect(() => {
    setProjects(getProjectsByLanguage());
    setActiveCategory(t.portfolio.all);
  }, [lang, t.portfolio.all]);
  
  // Фильтрация проектов по категории
  const filteredProjects = activeCategory === t.portfolio.all
    ? projects
    : projects.filter(project => project.category === activeCategory);
  
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  
  // Открыть проект для просмотра деталей
  const openProject = (project: Project) => {
    setActiveProject(project);
    setCurrentImage(project.images?.[0] || null);
    document.body.style.overflow = 'hidden';
  };
  
  // Закрыть проект
  const closeProject = () => {
    setActiveProject(null);
    setCurrentImage(null);
    document.body.style.overflow = '';
  };
  
  return (
    <section id="portfolio" className="py-20 bg-primary relative snap-section">
      {/* Заголовок секции */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4"
          >
            {t.portfolio.title}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold mb-6"
          >
            <span className="text-gradient">{t.portfolio.subtitle}</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-300"
          >
            {t.portfolio.description}
          </motion.p>
        </div>
        
        {/* Фильтр категорий */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category 
                  ? 'bg-accent text-white' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Сетка проектов */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/10 hover:border-accent/30"
                onClick={() => openProject(project)}
              >
                <div className="relative h-64">
                  <Image
                    src={project.thumbnail || '/portfolio/placeholder.jpg'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-accent">{project.category}</span>
                    <span className="text-sm text-white/80 hover:text-accent transition-colors">
                      {t.portfolio.viewProject} →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              {t.portfolio.noProjects}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Модальное окно с деталями проекта */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={closeProject}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1E1E1E] w-full max-w-4xl rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {currentImage && (
              <div className="relative h-80 md:h-96">
                <Image 
                  src={currentImage} 
                  alt={activeProject.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  className="object-contain" 
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{activeProject.title}</h2>
                <button 
                  onClick={closeProject}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-300 mb-6">{activeProject.description}</p>
              
              {activeProject.technologies && activeProject.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">{t.portfolio.technologies}</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {activeProject.images && activeProject.images.length > 1 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3">{t.portfolio.projectDetails}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {activeProject.images.map((img, index) => (
                      <div 
                        key={index} 
                        className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${currentImage === img ? 'border-accent' : 'border-transparent'}`}
                        onClick={() => setCurrentImage(img)}
                      >
                        <Image 
                          src={img} 
                          alt={`${activeProject.title} ${index + 1}`} 
                          fill
                          sizes="(max-width: 768px) 25vw, 20vw"
                          className="object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
