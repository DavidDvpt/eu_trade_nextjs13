import styles from '../auth.module.scss';

function layout({ children }: IChildren) {
  return <div className={styles.loginContent}>{children}</div>;
}

export default layout;
