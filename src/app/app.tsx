import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { createRoot } from 'react-dom/client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Consts } from '../utils/consts';
import { create, proxy, TStore } from '../utils/zustand';
import './app.css';

type TStoreState = { count: number; increase: () => void };
const store: TStore<TStoreState> = create<TStoreState>((set) => ({
  count: 0,
  increase: () => set((s) => ({ count: s.count + 1 })),
}));

type TStore2State = { proxy: { count: number } };
const store2: TStore<TStore2State> = create<TStore2State>(
  () => ({
    proxy: {
      count: store.getState().count, //? default state
    },
  }),
  [(s) => s.proxy.count, (c) => console.log(c)]
);
proxy(store, store2, [(s) => s.count, 'count']);

const App = () => {
  const { count, increase } = store();
  return (
    <div
      className={
        'root relative flex select-none flex-col items-center justify-center bg-white'
      }
    >
      <button
        className='rounded-md bg-blue-600 px-3 py-2 text-white shadow-md transition-all hover:scale-105 active:scale-95'
        onClick={increase}
      >{`Clicked ${count} times`}</button>
      <div className='absolute left-0 top-0 m-5 flex w-auto flex-col gap-0 rounded-md bg-blue-600 px-3 py-2 leading-5 text-white shadow-md'>
        <p>{`Version ${Consts.version}`}</p>
        <p>{`${Consts.isModeDev ? 'Development' : 'Production'} Build`}</p>
      </div>
    </div>
  );
};

if (Consts.isEnvDev) disableReactDevTools();
else mountStoreDevtool('Store', store);

createRoot(document.querySelector('#app')!).render(<App />);
