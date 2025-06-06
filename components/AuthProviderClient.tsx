'use client';

import { AuthProvider } from '@/lib/hooks/useAuth';
import React from 'react';

export const AuthProviderClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
