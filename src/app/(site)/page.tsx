'use client';

import { signOut } from 'next-auth/react';

export default function Home(): React.ReactElement {
  return (
    <main>
      <button onClick={() => signOut()}>sign out</button>
    </main>
  );
}
