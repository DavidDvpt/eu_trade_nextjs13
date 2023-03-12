'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function AuthCheck({ children }: IChildren) {
  const router = useRouter();
  const { data: session } = useSession();
  console.log('seession', session);
  if (!session) {
    router.push('/login');
  }
  return <div>{children}</div>;
}

export default AuthCheck;
