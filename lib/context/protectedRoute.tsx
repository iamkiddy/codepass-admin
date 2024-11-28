"use client"

import { useAuth } from '@/lib/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    // Only redirect if there's no user AND no token
    if (!user && !token) {
      router.push('/');
    }
  }, [user, router]);

  // Allow rendering if there's either a user or a token
  const token = Cookies.get('token');
  if (!user && !token) {
    return null;
  }

  return <>{children}</>;
}