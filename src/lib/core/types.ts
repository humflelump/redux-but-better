export type Listener<T = undefined> = {
  (): void;
  data: T;
};

export type ListenerListener = (
  newListeners: Listener<any>[],
  prevListeners: Listener<any>[]
) => void;

export type ParentType = {
  getId: () => string;
  getListeners: () => Listener<any>[];
  getDependencies: () => AtomOrSelector<any>;
  getDependants: () => AtomOrSelector<any>;
  subscribe: (l: Listener<any>) => void;
  unsubscribe: (l: Listener<any>) => void;
};

export type Atom<T, M = null> = {
  get: () => T;
  update(func: (val: T) => T, notify?: boolean);
  set: (val: T, notify?: boolean) => void;
  toJSON: () => { id: string; data: T; metadata: M; type: string };
  getMetadata: () => M;
} & ParentType;

export type Selector<T> = {
  get: () => T;
} & ParentType;

export type DynamicSelector<T> = {
  get: () => T;
} & ParentType;

export type AtomOrSelector<T, M = null> =
  | Atom<T, M>
  | Selector<T>
  | DynamicSelector<T>;
