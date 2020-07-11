export type Listener = () => void;

export type ListenerListener = (
  newListeners: Listener[],
  prevListeners: Listener[]
) => void;

export type ParentType = {
  getId: () => string;
  getListeners: () => Listener[];
  getDependencies: () => AtomOrSelector<any>;
  getDependants: () => AtomOrSelector<any>;
  addChangeListenerToParents: (l: Listener) => void;
  removeChangeListenerFromParents: (l: Listener) => void;
};

export type Atom<T, M = null> = {
  get: () => T;
  set: (val: T) => void;
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
