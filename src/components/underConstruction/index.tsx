import Image from 'next/image';
import underConstruction from '../../assets/images/page-en-construction.png';
import styles from './underConstruction.module.scss';
function UnderConstruction(): React.ReactElement {
  return (
    <div className={styles.underConstruction}>
      <Image
        src={underConstruction}
        width={500}
        height={500}
        alt='under construction'
      />
    </div>
  );
}

export default UnderConstruction;
