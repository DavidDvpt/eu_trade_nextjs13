import styles from './statistic.module.scss';
function Layout({ children }: IChildren): React.ReactElement {
  return <div className={styles.statistic}>{children}</div>;
}

export default Layout;
