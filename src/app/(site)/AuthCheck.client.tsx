'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function AuthCheck({ children }: IChildren) {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  return <>{children}</>;
}

export default AuthCheck;
