'use client';

import Footer from '@/components/layoutRoot/footer';
import Header from '@/components/layoutRoot/header';
import { signIn, useSession } from 'next-auth/react';

function Layout({ children }: IChildren): React.ReactElement {
  const { status, data } = useSession();

  if (status === 'loading') {
    ('...loading');
  }

  if (status === 'unauthenticated') {
    signIn();
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
