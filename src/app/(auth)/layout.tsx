import React from 'react';
import styles from './auth.module.scss';

function layout({ children }: IChildren): React.ReactElement {
  return <main className={styles.main}>{children}</main>;
}

export default layout;
