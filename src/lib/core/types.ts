import { Atom } from "./Atom";
import { Selector } from "./Selector";

export type Listener = () => void;
export type AtomOrSelector<T, M = any> = Atom<T, M> | Selector<T>;

export type ListenerListener = (
  newListeners: Listener[],
  prevListeners: Listener[]
) => void;
