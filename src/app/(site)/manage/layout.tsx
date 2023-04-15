import styles from './manage.module.scss';

function Layout({ children }: IChildren): React.ReactElement {
  return <div className={styles.manage}>{children}</div>;
}

export default Layout;
