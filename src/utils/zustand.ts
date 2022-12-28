import zustandCreate, { StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { subscribeWithSelector, StoreSubscribeWithSelector } from 'zustand/middleware';

type Write<T, U> = Omit<T, keyof U> & U;
export type TStore<T> = UseBoundStore<Write<StoreApi<T>, StoreSubscribeWithSelector<T>>>;
export type TSet<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean
) => void;

export const create = <T>(
  config: StateCreator<T, [['zustand/subscribeWithSelector', never]], [], T>,
  ...listeners: [(state: T) => any, (state: any, prevState: any) => void][]
) => {
  const store = zustandCreate(subscribeWithSelector(config));
  for (const l of listeners) store.subscribe(l[0], l[1]);
  return store;
};

export const proxy = <T, U>(
  storeFrom: TStore<T>,
  storeTo: TStore<U>,
  ...listeners: [(stateFrom: T) => any, string][]
) => {
  for (const l of listeners)
    storeFrom.subscribe(l[0], (v) =>
      storeTo.setState((s) => {
        const state = s as U & { proxy: { [key: string]: any } };
        const newState = { ...state, proxy: { ...state.proxy, [l[1]]: v } };
        return newState;
      })
    );
};

export default create;
