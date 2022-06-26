import { FC, ReactNode } from 'react';
import styles from './Card.module.scss';

export const Card: FC<{
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ className, onClick, children }) => (
  <div className={`${styles.card} ${className ?? ''}`} onClick={onClick}>
    {children}
  </div>
);
