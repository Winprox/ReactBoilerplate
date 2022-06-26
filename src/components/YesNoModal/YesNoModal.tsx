import { FC } from 'react';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import styles from './YesNoModal.module.scss';

export const YesNoModal: FC<{
  className?: string;
  message: string;
  onNoClick: () => void;
  onYesClick: () => void;
}> = ({ message, onNoClick, onYesClick }) => (
  <Card className={styles.wrapper}>
    <strong className={styles.message}>{message}</strong>
    <div className={styles.actions}>
      <Button className={styles.noButton} buttonType='alt' onClick={onNoClick}>
        {'Close'}
      </Button>
      <div style={{ width: '1rem' }} />
      <Button className={styles.yesButton} onClick={onYesClick}>
        {'Confirm'}
      </Button>
    </div>
  </Card>
);
