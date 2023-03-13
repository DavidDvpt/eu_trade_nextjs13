'use client';
import { SessionProvider } from 'next-auth/react';
import AuthCheck from './AuthCheck.client';

function Provider({ children }: IChildren) {
  return (
    <SessionProvider>
      <AuthCheck>{children}</AuthCheck>
    </SessionProvider>
  );
}

export default Provider;
