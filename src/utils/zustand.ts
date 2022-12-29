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
      to.setState((s) => ({ ...s, proxy: { ...(s as any).proxy, [l[1]]: v } }))
    );
};

export default create;

type StoreSubscribeWithSelector<T> = {
  subscribe: {
    (listener: (s: T, prev: T) => void): () => void;
    <U>(
      selector: (s: T) => U,
      listener: (s: U, prev: U) => void,
      options?: { equalityFn?: (a: U, b: U) => boolean; fireImmediately?: boolean }
    ): () => void;
  };
};
type Write<T, U> = Omit<T, keyof U> & U;
export type TStore<T> = UseBoundStore<Write<StoreApi<T>, StoreSubscribeWithSelector<T>>>;

type TCreate = <T>(
  config: StateCreator<T, [], []>,
  ...listeners: [(state: T) => any, (state: any, prevState: any) => void][]
) => TStore<T>;

type TProxy = <T, U>(
  from: TStore<T>,
  to: TStore<U>,
  ...listeners: [(fromState: T) => any, string][]
) => void;
