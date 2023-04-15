import styles from './stock.module.scss';

function Layout({ children }: IChildren): React.ReactElement {
  return <div className={styles.stock}>{children}</div>;
}

export default Layout;
