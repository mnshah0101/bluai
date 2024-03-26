'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@propelauth/nextjs/client';


export default function HomeComponent() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/api/auth/login');
    }
  }, [  ]);

  return null;
}


