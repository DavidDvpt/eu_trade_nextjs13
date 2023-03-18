'use client';
import { SessionProvider } from 'next-auth/react';
import AuthCheck from './(site)/AuthCheck.client';

function Provider({ children }: IChildren) {
  return (
    <SessionProvider>
      <AuthCheck>{children}</AuthCheck>
    </SessionProvider>
  );
}

export default Provider;
