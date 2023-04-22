'use client';

import { nanoid } from '@reduxjs/toolkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from './constants';
import styles from './nav.module.scss';
interface INavProps {
  className: string;
}
function Nav({ className }: INavProps) {
  const path = usePathname();
  const [isActive, setIsActive] = useState<string | null>('');

  useEffect(() => {
    if (isActive !== path) {
      setIsActive(path);
    }
  }, [path]);

  return (
    <nav className={`${styles.navElement} ${className}`}>
      <ul>
        {navLinks.map((m) => (
          <Link key={nanoid()} href={m.url} onClick={() => setIsActive(m.url)}>
            <li className={isActive === m.url ? styles.isActive : ''}>
              {m.label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
