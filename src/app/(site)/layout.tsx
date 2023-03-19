'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

function Layout({ children }: IChildren): React.ReactElement {
  const { status } = useSession();

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
