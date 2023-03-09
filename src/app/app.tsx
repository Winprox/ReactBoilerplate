import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Div100vh from 'react-div-100vh';
import { createRoot } from 'react-dom/client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Consts } from 'utils/consts';
import { create, proxy, TStore } from 'utils/zustand';
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
    <Div100vh
      className={'relative flex select-none flex-col items-center justify-center bg-gray-800'}
    >
      <button
        className='btn-primary btn'
        onClick={increase}
      >{`Clicked ${count} times`}</button>
      <div className='alert alert-info absolute top-0 left-0 m-5 flex w-auto flex-col gap-0 shadow-lg'>
        <p>{`Version ${Consts.version}`}</p>
        <p>{`${Consts.isModeDev ? 'Development' : 'Production'} Build`}</p>
      </div>
    </Div100vh>
  );
};

if (Consts.isEnvDev) disableReactDevTools();
else mountStoreDevtool('Store', store);

createRoot(document.getElementById('app')!).render(<App />);
