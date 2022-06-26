import styles from './Loading.module.scss';

export const Loading = () => (
  <div className={styles.wrapper}>
    <div className={styles.spinner} />
  </div>
);
