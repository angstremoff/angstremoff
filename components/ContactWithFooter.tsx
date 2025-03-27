'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import emailjs from '@emailjs/browser';

export default function ContactWithFooter() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const currentYear = new Date().getFullYear();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);
    
    // Отправка формы напрямую на angstremoff@ya.ru
    const templateParams = {
      to_email: 'angstremoff@ya.ru',
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(
      'service_s7g51nr', // Service ID
      'template_ky4p7zm', // Template ID
      templateParams,
      'VFI4YrELMcvCkVUHo' // Public Key
    )
    .then(() => {
      console.log('Сообщение успешно отправлено!');
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Сброс статуса отправки через 3 секунды
      setTimeout(() => setIsSubmitted(false), 3000);
    })
    .catch((error) => {
      console.error('Ошибка при отправке:', error);
      setIsSubmitting(false);
      setHasError(true);
    });
  };
  
  return (
    <div id="contact" className="relative bg-gradient-to-b from-primary to-primary/95 overflow-hidden snap-section">
      {/* Фоновые элементы для контактной формы */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-1/3 -right-24 w-64 h-64 bg-[#9C27B0]/10 rounded-full blur-3xl opacity-50"></div>
      
      {/* Контактная секция */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4"
            >
              {t.contact.title}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {t.contact.subtitle} <span className="text-gradient">{t.contact.with}</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 max-w-3xl mx-auto"
            >
              {t.contact.description}
            </motion.p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10"
            >
              {/* Контактная информация */}
              <div className="lg:col-span-2">
                <div className="bg-white/5 rounded-2xl p-6 h-full backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6">{t.contact.infoTitle}</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">{t.contact.address}</h4>
                        <p className="text-white">{t.contact.addressContent}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">{t.contact.emailAddress}</h4>
                        <p className="text-white">{t.contact.emailAddressContent}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.215,17.539,2.11,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">{t.contact.telegram}</h4>
                        <p className="text-white">
                          <a href="https://t.me/Angstremoff" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                            {t.contact.telegramContent}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Контактная форма */}
              <div className="lg:col-span-3">
                {isSubmitted ? (
                  <div className="bg-white/5 rounded-2xl p-8 h-full backdrop-blur-sm flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t.contact.messageSent}</h3>
                    <p className="text-gray-300">{t.contact.weWillContactYou}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm text-gray-400 mb-1">{t.contact.name}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-gray-400 mb-1">{t.contact.email}</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">{t.contact.phone}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm text-gray-400 mb-1">{t.contact.message}</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-white resize-none"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-accent text-white rounded-lg font-medium w-full md:w-auto md:self-start transition-all ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover-scale'
                      }`}
                    >
                      {isSubmitting ? t.contact.sending : t.contact.sendMessage}
                    </button>
                    
                    {hasError && (
                      <p className="text-red-500 text-sm mt-2">{t.contact.error}</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Подвал (Footer) */}
      <footer className="py-10 bg-primary/95 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <Link href="/#home" className="inline-block">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-gradient mb-4"
                >
                  AngstremoFF
                </motion.div>
              </Link>
              <p className="text-gray-400 mb-6">
                {t.footer.description}
              </p>
              <div className="flex space-x-3">
                <a href="https://t.me/Angstremoff" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent/80 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                  </svg>
                </a>
                <a href="mailto:Angstremoff@ya.ru" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent/80 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">{t.footer.navigation}</h3>
              <ul className="space-y-2">
                <li><Link href="/#home" className="text-gray-400 hover:text-accent transition-colors">{t.navbar.home}</Link></li>
                <li><Link href="/#about" className="text-gray-400 hover:text-accent transition-colors">{t.navbar.about}</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-accent transition-colors">{t.navbar.services}</Link></li>
                <li><Link href="/#portfolio" className="text-gray-400 hover:text-accent transition-colors">{t.navbar.portfolio}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">{t.footer.services}</h3>
              <ul className="space-y-2">
                <li><Link href="/#services" className="text-gray-400 hover:text-accent transition-colors">{t.services.webDevelopment.title}</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-accent transition-colors">{t.services.mobile.title}</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-accent transition-colors">{t.services.design.title}</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-accent transition-colors">{t.services.seo.title}</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-accent transition-colors">{t.services.support.title}</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium mb-4">{t.footer.contact}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 text-accent"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg></span>
                  <span className="text-gray-400">{t.footer.location}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 text-accent"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg></span>
                  <span className="text-gray-400">{t.footer.email}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.215,17.539,2.11,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z" />
                    </svg>
                  </span>
                  <span className="text-gray-400">{t.footer.telegram}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                {currentYear} AngstremoFF. {t.footer.rights}
              </p>
              <div className="flex space-x-6">
                <p className="text-gray-400 text-sm">
                  {t.footer.designedWith} <span className="text-red-500">❤</span> {t.footer.by} AngstremoFF
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
