'use client';

import React, { useEffect } from 'react';
import { useAuth, AuthState } from '@/lib/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import Spinner from './Spinner';

interface ProtectedRouteClientProps {
  children: React.ReactNode;
}

const ProtectedRouteClient: React.FC<ProtectedRouteClientProps> = ({ children }) => {
  const { authState } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (authState === AuthState.UNAUTHENTICATED) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [authState, router, pathname]);

  if (authState === AuthState.LOADING || authState === AuthState.UNAUTHENTICATED) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRouteClient;
