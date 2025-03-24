import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import "../styles/flags.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "AngstremoFF - Веб-студия с уникальным дизайном",
  description: "Создаем современные и креативные веб-сайты, мобильные приложения и дизайн-решения. Ваш проводник в мир цифрового дизайна.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
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
