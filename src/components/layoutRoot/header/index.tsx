import Nav from '../nav/nav.client';
import Brand from './Brand';

import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Brand />
      <Nav className={styles.nav} />
    </header>
  );
}

export default Header;
