'use client';
import { SessionProvider } from 'next-auth/react';

function AuthSessionProvider({ children }: IChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthSessionProvider;
