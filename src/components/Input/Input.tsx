import {
  FC,
  useRef,
  FormEvent,
  ChangeEvent,
  HTMLInputTypeAttribute,
} from 'react';
import { Button } from '../Button/Button';
import styles from './Input.module.scss';

export const Input: FC<{
  className?: string;
  inputClassName?: string;
  tabIndex?: number;
  placeholder?: string;
  disabled?: boolean;
  submitButton?: string;
  submitButtonTabIndex?: number;
  disabledSubmit?: boolean;
  type?: HTMLInputTypeAttribute;
  label?: string;
  invalidMessage?: string;
  value?: any;
  onSubmitButtonClick?: (value: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  testid?: string;
}> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmitButtonClick?.(inputRef.current?.value ?? '');
  };

  const input = (
    <input
      className={`${props.inputClassName ?? ''} ${
        props.submitButton ? styles.inputSearchButton : ''
      } ${props.invalidMessage ? styles.inputInvalid : ''}`}
      tabIndex={props.tabIndex}
      ref={inputRef}
      placeholder={props.placeholder}
      disabled={props.disabled}
      id={props.label}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      type={props.type ?? 'text'}
      data-testid={props.testid}
    />
  );

  return (
    <div className={`${styles.wrapper} ${props.className ?? ''}`}>
      {!!props.label && <label htmlFor={props.label}>{props.label}</label>}
      {props.submitButton ? (
        <form onSubmit={submitHandler}>
          {input}
          <Button
            className={styles.searchButton}
            tabIndex={props.submitButtonTabIndex}
            disabled={props.disabledSubmit}
            type='submit'
          >
            {props.submitButton}
          </Button>
        </form>
      ) : (
        input
      )}
      {!!props.invalidMessage && (
        <div className={styles.invalidMessage}>{props.invalidMessage}</div>
      )}
    </div>
  );
};
