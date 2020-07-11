import { Atom } from "../core/types";

export type ActionFunction = {
  (): void;
  getId(): string;
};

export type Setter<Input> = (val: Input) => void;

export type AsyncSelectorPromiseState = {
  id: string;
  cancelled: boolean;
};

export type AsyncActionState = {
  id: string;
  cancelled: boolean;
} & { [key: string]: any };

export type AsyncActionFunction = {
  (): AsyncActionState;
  getId(): string;
};

export type Atomify<Object, Metadata = { slice: string }> = {
  [P in keyof Object]: Atom<Object[P], Metadata>;
};

export type ActionChange = {
  from: any;
  to: any;
  atom: Atom<any, any>;
};

export type ActionEffect = {
  id: string;
  changes: ActionChange[];
};
