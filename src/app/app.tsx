import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { createRoot } from 'react-dom/client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import create, { proxy } from '../utils/zustand';
import './normalize.css';
import './app.scss';
import styles from './app.module.scss';

const store = create<{ count: number; increase: () => void }>((set) => ({
  count: 0,
  increase: () => set((s) => ({ count: s.count + 1 })),
}));

const store2 = create<{ proxy: { count: number } }>(
  () => ({ proxy: { count: 0 } }),
  [(s) => s.proxy.count, (c) => console.log(c)]
);
proxy(store, store2, [(s) => s.count, 'count']);

const App = () => {
  const { count, increase } = store();
  return (
    <div className={styles.app} onClick={increase}>
      {`Clicked ${count} times`}
    </div>
  );
};

if (process.env.NODE_ENV !== 'development') disableReactDevTools();
else mountStoreDevtool('Store', store);

createRoot(document.getElementById('app')!).render(<App />);
