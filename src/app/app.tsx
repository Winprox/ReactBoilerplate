import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { createRoot } from 'react-dom/client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import create, { proxy, TStore } from '../utils/zustand';
import './normalize.css';
import './app.scss';
import styles from './app.module.scss';

type TStoreState = { count: number; increase: () => void };
const store: TStore<TStoreState> = create<TStoreState>((set) => ({
  count: 0,
  increase: () => set((s) => ({ count: s.count + 1 })),
}));

type TStore2State = { proxy: { count: number } };
const store2: TStore<TStore2State> = create<TStore2State>(
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
