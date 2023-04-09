import Nav from '../nav/nav.client';
import Brand from './Brand';

import styles from './header.module.scss';
import Profile from './Profile';

function Header() {
  return (
    <header className={styles.header}>
      <Brand />
      <Nav className={styles.nav} />
      <Profile />
    </header>
  );
}

export default Header;
