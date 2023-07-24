import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { createRoot } from 'react-dom/client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Consts, TStore, cm, create, proxy } from '../utils';
import './app.css';

type TStoreState = { count: number; increase: () => void };
const store: TStore<TStoreState> = create<TStoreState>((set) => ({
  count: 0,
  increase: () => set((s) => ({ count: s.count + 1 }))
}));

type TStore2State = { proxy: { count: number } };
const store2: TStore<TStore2State> = create<TStore2State>(
  () => ({ proxy: { count: store.getState().count } }), //? same default state
  [(s) => s.proxy.count, (c) => console.log(c)]
);

proxy(store, store2, [(s) => s.count, (s) => s.proxy.count]);

const App = () => {
  const { count, increase } = store();
  return (
    <div
      style={{ height: '100svh' }}
      className={cm(
        'relative h-full select-none bg-white',
        'flex flex-col items-center justify-center'
      )}
    >
      <button
        className={cm(
          'rounded-md bg-blue-600 px-3 py-2 text-white shadow-md',
          'transition-all hover:scale-105 active:scale-95'
        )}
        onClick={increase}
      >{`Clicked ${count} times`}</button>
      <div
        className={cm(
          'absolute left-0 top-0 m-5 flex w-auto flex-col gap-0 px-3 py-2',
          'rounded-md bg-blue-600 leading-5 text-white shadow-md'
        )}
      >
        <p>{`Version ${Consts.version}`}</p>
        <p>{`${Consts.isModeDev ? 'Development' : 'Production'} Build`}</p>
      </div>
    </div>
  );
};

if (Consts.isEnvDev) disableReactDevTools();
else mountStoreDevtool('Store', store);

createRoot(document.querySelector('#app')!).render(<App />);
