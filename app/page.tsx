'use client';

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactWithFooter from '@/components/ContactWithFooter';

export default function Home() {
  return (
    <div className="snap-container">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactWithFooter />
    </div>
  );
}
