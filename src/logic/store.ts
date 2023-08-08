import { TStore, create, proxy } from '../utils';

type TStoreState = { count: number; increase: () => void };
export const store: TStore<TStoreState> = create<TStoreState>((set) => ({
  count: 0,
  increase: () => set((s) => ({ count: s.count + 1 }))
}));

type TStore2State = { proxy: { count: number } };
const store2: TStore<TStore2State> = create<TStore2State>(
  () => ({ proxy: { count: store.getState().count } }), //? same default state
  [(s) => s.proxy.count, (c) => console.log(c)]
);

proxy(store, store2, [(s) => s.count, (s) => s.proxy.count]);
