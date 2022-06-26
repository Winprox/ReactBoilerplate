import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

export const Button: FC<{
  children: ReactNode;
  className?: string;
  tabIndex?: number;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: 'alt' | 'text' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
}> = (props) => (
  <button
    className={`${styles.general} ${
      props.buttonType === 'alt'
        ? styles.altButton
        : props.buttonType === 'text'
        ? styles.textButton
        : props.buttonType === 'icon'
        ? styles.iconButton
        : styles.button
    } ${props.className ?? ''}`}
    tabIndex={props.tabIndex}
    type={props.type ?? 'button'}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
