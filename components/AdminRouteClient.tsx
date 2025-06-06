'use client';

import React, { useEffect } from 'react';
import { useAuth, AuthState } from '@/lib/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import Spinner from './Spinner';

interface AdminRouteClientProps {
  children: React.ReactNode;
}

const AdminRouteClient: React.FC<AdminRouteClientProps> = ({ children }) => {
  const { user, authState } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (authState === AuthState.AUTHENTICATED && !user?.isAdmin) {
      router.replace('/?error=unauthorized'); // Redirect to home or an unauthorized page
    } else if (authState === AuthState.UNAUTHENTICATED) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, authState, router, pathname]);

  if (authState === AuthState.LOADING || (authState === AuthState.AUTHENTICATED && !user?.isAdmin) || authState === AuthState.UNAUTHENTICATED) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return <>{children}</>;
};

export default AdminRouteClient;
