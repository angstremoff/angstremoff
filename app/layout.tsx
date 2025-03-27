import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import "../styles/flags.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "AngstremoFF - Веб-студия с уникальным дизайном",
  description: "Создаем современные и креативные веб-сайты, мобильные приложения для Android и iOS, и дизайн-решения. Ваш проводник в мир цифрового дизайна.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  keywords: "веб-разработка, мобильные приложения, Android, iOS, веб-дизайн, разработка сайтов, Angstremoff Studio, веб-студия, Сербия, web development, mobile apps, website design, web studio, Serbia, veb razvoj, mobilne aplikacije, dizajn sajta, veb studio, Srbija",
  authors: [{ name: "Angstremoff Studio" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "sr_RS"],
    title: "AngstremoFF - Веб-студия с уникальным дизайном",
    description: "Создаем современные и креативные веб-сайты, мобильные приложения для Android и iOS, и дизайн-решения. Ваш проводник в мир цифрового дизайна.",
    url: "https://angstremoff.com",
    siteName: "Angstremoff Studio",
  },
  alternates: {
    languages: {
      "ru": "/ru",
      "en": "/",
      "sr": "/sr"
    },
    canonical: "https://angstremoff.com"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Angstremoff Studio",
              "url": "https://angstremoff.com",
              "description": "Создаем современные и креативные веб-сайты, мобильные приложения для Android и iOS, и дизайн-решения.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://angstremoff.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Angstremoff Studio",
              "url": "https://angstremoff.com",
              "logo": "https://angstremoff.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "angstremoff@ya.ru",
                "contactType": "customer service",
                "availableLanguage": ["Russian", "English", "Serbian"]
              },
              "sameAs": [
                "https://t.me/Angstremoff"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Лозница",
                "addressCountry": "Сербия"
              }
            })
          }}
        />
      </head>
      <body className="antialiased bg-primary min-h-screen">
        <LanguageProvider>
          <Navbar />
          <Cursor />
          <main className="snap-container">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
