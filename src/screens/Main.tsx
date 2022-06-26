import { useState } from 'react';
import { Card } from '../components/Card/Card';
import { Loading } from '../components/Loading/Loading';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Select } from '../components/Select/Select';
import { Modal } from '../components/Modal/Modal';
import { YesNoModal } from '../components/YesNoModal/YesNoModal';
import packageJson from '../../package.json';
import styles from './Main.module.scss';

export const Main = () => {
  const [modal, setModal] = useState(false);
  const modalOpenHandler = () => setModal(true);
  const modalCloseHandler = () => setModal(false);

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Loading />
        <div style={{ height: '1rem' }} />
        <Button buttonType={'text'} onClick={modalOpenHandler}>
          {'Open Modal'}
        </Button>
        <div style={{ height: '1rem' }} />
        <Input className={styles.input} placeholder={'Input Example'} />
        <div style={{ height: '1rem' }} />
        <Select
          className={styles.input}
          values={Array.from(Array(10).keys()).map((v) => `List Entry #${v}`)}
        />
        <div style={{ height: '1rem' }} />
        {`Boilerplate ${packageJson.version}`}
      </Card>
      {modal && (
        <Modal dim handle='strong'>
          <YesNoModal
            onYesClick={modalCloseHandler}
            onNoClick={modalCloseHandler}
            message={'Drag by Dragging Text'}
          />
        </Modal>
      )}
    </div>
  );
};
