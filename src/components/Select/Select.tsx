import { FC, ChangeEvent } from 'react';
import styles from './Select.module.scss';

export const Select: FC<{
  className?: string;
  type?: 'alt';
  value?: number | string;
  values: number[] | string[];
  labels?: string[];
  onSelect?: (value: number | string) => void;
  disabled?: boolean;
}> = ({ className, type, value, values, labels, onSelect, disabled }) => {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    onSelect?.(e.target.value);

  return (
    <select
      className={`${styles.select} ${type === 'alt' ? styles.altSelect : ''} ${
        className ?? ''
      }`}
      value={value}
      onChange={changeHandler}
      disabled={disabled}
    >
      {values.map((v, i) => (
        <option key={v} value={v}>
          {!!labels ? labels[i] : v}
        </option>
      ))}
    </select>
  );
};
