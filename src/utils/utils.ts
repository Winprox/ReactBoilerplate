import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { StateCreator, StoreApi, UseBoundStore, create as zustandCreate } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

//? === Tailwind Helper ===

export const cm = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

//? === Zustand Helpers ===

export const create: TCreate = (config, ...listeners) => {
  const store = zustandCreate(subscribeWithSelector(config));
  for (const l of listeners) store.subscribe(l[0], l[1]);
  return store;
};

export const proxy: TProxy = (from, to, ...listeners) => {
  const keys = Object.keys(to.getState() as TRecord);
  for (const l of listeners) {
    const path = l[1]
      .toString()
      .split('.')
      .reverse()
      .map((v) => v.replace(/[\n;} ]/g, ''));
    const start = path.findLastIndex((v) => keys.includes(v));
    from.subscribe(l[0], (v) =>
      to.setState((s) => ({ ...setObjValAtPath(s as typeof v, path.slice(0, start + 1), v) }))
    );
  }
};

export const setObjValAtPath = <Obj extends TRecord>(
  obj: Obj,
  path: string[],
  val: unknown
): Obj => {
  const key = path.pop();
  if (!key) return obj;
  return Object.assign(obj, {
    [key]: path.length ? setObjValAtPath(obj[key] as TRecord, path, val) : val
  });
};

export type TStore<T> = UseBoundStore<Omit<StoreApi<T>, keyof TStoreSub<T>> & TStoreSub<T>>;
type TStoreSub<T> = {
  subscribe: {
    (listener: (state: T, prevState: T) => void): () => void;
    <U>(
      selector: (state: T) => U,
      listener: (state: U, prevState: U) => void,
      options?: { equalityFn?: (a: U, b: U) => boolean; fireImmediately?: boolean }
    ): () => void;
  };
};

type TCreate = <T>(
  config: StateCreator<T>,
  ...listeners: [(state: T) => any, (state: any, prevState: any) => void][]
) => TStore<T>;

type TProxy = <T, U>(
  from: TStore<T>,
  to: TStore<U>,
  ...listeners: [(fromState: T) => any, (toState: U) => any][]
) => void;

type TRecord = Record<string, unknown>;
