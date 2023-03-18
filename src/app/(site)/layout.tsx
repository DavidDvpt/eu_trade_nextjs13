'use client';

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

  return <div>{children}</div>;
}

export default Layout;
