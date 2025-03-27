'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // Проверяем, находимся ли мы на onrender.com
    if (typeof window !== 'undefined' && window.location.hostname.includes('onrender.com')) {
      // Перенаправляем на основной домен
      window.location.href = 'https://angstremoff.com' + window.location.pathname;
    } else {
      // Если мы на основном домене, но страница не найдена, перенаправляем на главную
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-white">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">404 - Страница не найдена</h1>
        <p className="mb-8">Перенаправление на главную страницу...</p>
      </div>
    </div>
  );
}
