import styles from '../auth.module.scss';

function layout({ children }: IChildren) {
  return <section className={styles.loginContent}>{children}</section>;
}

export default layout;
