'use client';

import { signOut, useSession } from 'next-auth/react';
import styles from './header.module.scss';
function Profile() {
  const { status } = useSession();
  return (
    <div className={styles.profile} onClick={() => signOut()}>
      {status === 'authenticated' ? 'Logout' : ''}
    </div>
  );
}

export default Profile;
