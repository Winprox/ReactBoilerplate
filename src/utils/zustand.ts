import zCreate, { StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const create: TCreate = (config, ...listeners) => {
  const store = zCreate(subscribeWithSelector(config));
  for (const l of listeners) store.subscribe(l[0], l[1]);
  return store;
};

export const proxy: TProxy = (from, to, ...listeners) => {
  for (const l of listeners)
    from.subscribe(l[0], (v) =>
      to.setState((s) => {
        const state = s as any;
        const newState = { ...state, proxy: { ...state.proxy, [l[1]]: v } };
        return newState;
      })
    );
};

export default create;

type StoreSubscribeWithSelector<T> = {
  subscribe: {
    (listener: (selectedState: T, previousSelectedState: T) => void): () => void;
    <U>(
      selector: (state: T) => U,
      listener: (selectedState: U, previousSelectedState: U) => void,
      options?: { equalityFn?: (a: U, b: U) => boolean; fireImmediately?: boolean }
    ): () => void;
  };
};
type Write<T, U> = Omit<T, keyof U> & U;
type TStore<T> = UseBoundStore<Write<StoreApi<T>, StoreSubscribeWithSelector<T>>>;

export type TSet<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean
) => void;

type TCreate = <T>(
  config: StateCreator<T, [], []>,
  ...listeners: [(state: T) => any, (state: any, prevState: any) => void][]
) => TStore<T>;

type TProxy = <T, U>(
  from: TStore<T>,
  to: TStore<U>,
  ...listeners: [(fromState: T) => any, string][]
) => void;
