import { Selector } from "./selector";
import { Atom } from "./atom";
export type AtomOrSelector<ReturnType> =
  | Atom<ReturnType>
  | Selector<ReturnType>;
