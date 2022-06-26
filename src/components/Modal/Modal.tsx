import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import styles from './Modal.module.scss';

const Backdrop: FC<{
  className?: string;
  onClick?: () => void;
  dim?: boolean;
}> = ({ className, onClick, dim }) => (
  <div
    className={`${styles.backdrop} ${className}`}
    style={{ opacity: dim ? 0.15 : 0 }}
    onClick={onClick}
  />
);

const ModalOverlay: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => <div className={`${styles.wrapper} ${className}`}>{children}</div>;

export const Modal: FC<{
  className?: string;
  backdropClassName?: string;
  children: ReactNode;
  onClose?: () => void;
  dim?: boolean;
  handle?: string;
}> = ({ className, backdropClassName, onClose, dim, handle, children }) =>
  createPortal(
    <>
      <Backdrop className={backdropClassName} onClick={onClose} dim={dim} />
      <ModalOverlay className={className}>
        {handle ? (
          <Draggable handle={handle} bounds='parent'>
            <div className={styles.content}>{children}</div>
          </Draggable>
        ) : (
          <div className={styles.content}>{children}</div>
        )}
      </ModalOverlay>
    </>,
    document.getElementById('root')!
  );
