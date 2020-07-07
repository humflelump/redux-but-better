import { Atom } from "../node/Atom";

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

export type Atomify<Object> = {
  [P in keyof Object]: Atom<Object[P]>;
};
