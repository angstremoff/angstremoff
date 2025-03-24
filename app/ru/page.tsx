'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RuRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <p className="text-white text-xl">Перенаправление на главную страницу...</p>
    </div>
  );
}
