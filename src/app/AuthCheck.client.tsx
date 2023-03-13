'use client';

import { useSession } from 'next-auth/react';
import Login from './(auth)/login/page';

function AuthCheck({ children }: IChildren) {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return <Login />;
  }

  return <>{children}</>;
}

export default AuthCheck;
