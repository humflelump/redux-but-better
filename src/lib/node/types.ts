import { Atom } from "./Atom";
import { Selector } from "./Selector";

export type Listener = () => void;
export type AtomOrSelector<T> = Atom<T> | Selector<T>;

export type ListenerListener = (
  newListeners: Listener[],
  prevListeners: Listener[]
) => void;
