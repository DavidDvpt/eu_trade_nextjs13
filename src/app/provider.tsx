'use client';
import { SessionProvider } from 'next-auth/react';

function Provider({ children }: IChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
