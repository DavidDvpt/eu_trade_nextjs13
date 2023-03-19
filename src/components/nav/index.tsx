import Link from 'next/link';
import styles from './nav.module.scss';
interface INavProps {
  className: string;
}
function Nav({ className }: INavProps) {
  return (
    <nav className={`${styles.navElement} ${className}`}>
      <ul>
        <Link href='/buy'>
          <li>Achat</li>
        </Link>
        <Link href='/sell'>
          <li>Vente</li>
        </Link>
        <Link href='/stock'>
          <li>Stock</li>
        </Link>
        <Link href='/statistic'>
          <li>Statistiques</li>
        </Link>
        <Link href='/manage'>
          <li>Manage</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
