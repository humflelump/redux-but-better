import { atom } from "./atom";
import { createSelector, Selector } from "./selector";
import { createId } from "./createId";
import { AtomOrSelector } from "./atom-or-selector";

export type AsyncActionState = {
  id: string;
  cancelled: boolean;
} & { [key: string]: any };

export type AsyncActionFunction = {
  (): AsyncActionState;
  getId(): string;
};

export type Setter<Input> = (val: Input) => void;

export function createAsyncAction(params: {
  id: string;
  inputs?: [];
  atoms?: [];
  func: (state: AsyncActionState) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1>(params: {
  id: string;
  inputs?: [];
  atoms: [AtomOrSelector<S1>];
  func: (set1: Setter<S1>, state: AsyncActionState) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, S2>(params: {
  id: string;
  inputs?: [];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, S2, S3>(params: {
  id: string;
  inputs?: [];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    set3: Setter<S3>,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  atoms?: [];
  func: (val1: R1, state: AsyncActionState) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  atoms: [AtomOrSelector<S1>];
  func: (set1: Setter<S1>, val1: R1, state: AsyncActionState) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, S2, R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    val1: R1,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, S2, S3, R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    set3: Setter<S3>,
    val1: R1,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  atoms?: [];
  func: (val1: R1, val2: R2, state: AsyncActionState) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  atoms: [AtomOrSelector<S1>];
  func: (
    set1: Setter<S1>,
    val1: R1,
    val2: R2,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, S2, R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    val1: R1,
    val2: R2,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, S2, S3, R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    set3: Setter<S3>,
    val1: R1,
    val2: R2,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<R1, R2, R3>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  atoms?: [];
  func: (
    val1: R1,
    val2: R2,
    val3: R3,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, R1, R2, R3>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  atoms: [AtomOrSelector<S1>];
  func: (
    set1: Setter<S1>,
    val1: R1,
    val2: R2,
    val3: R3,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, S2, R1, R2, R3>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    val1: R1,
    val2: R2,
    val3: R3,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<S1, S2, S3, R1, R2, R3>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    set3: Setter<S3>,
    val1: R1,
    val2: R2,
    val3: R3,
    state: AsyncActionState
  ) => Promise<void>;
}): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction(params) {
  const { id, inputs, atoms, func } = params;
  const isLoadingAtom = atom({
    id: `__isLoadingActionAtom__${id}`,
    data: false
  });
  const errorAtom = atom({
    id: `__errorActionAtom__${id}`,
    data: undefined
  });
  const isLoadingSelector = createSelector({
    id: `__isLoadingActionSelector__${id}`,
    inputs: [isLoadingAtom],
    func: d => d
  });
  const errorSelector = createSelector({
    id: `__errorActionSelector__${id}`,
    inputs: [errorAtom],
    func: d => d
  });
  // TODO: figure out a way to batch sets
  const setters = (atoms || []).map(atom => {
    return val => atom.set(val, true);
  });
  const actionStates = {};
  let mostRecentAction = null as string | null;
  const action = () => {
    const id = createId();
    mostRecentAction = id;
    actionStates[id] = { id, cancelled: false };
    const vals = (inputs || []).map(input => input());
    const finish = (error: any) => {
      console.log({ id, mostRecentAction });
      if (id === mostRecentAction) {
        isLoadingAtom.set(false);
        if (error !== undefined) {
          errorAtom.set(error);
        }
      } else {
        errorAtom.set(undefined);
        actionStates[id].cancelled = true;
      }
      delete actionStates[id];
    };
    isLoadingAtom.set(true);
    func(...setters, ...vals, actionStates[id])
      .then(() => {
        finish(undefined);
      })
      .catch(error => {
        finish(error);
      });
    return actionStates[id];
  };
  action.getId = () => id;
  return [action, isLoadingSelector, errorSelector];
}

// const [action, isLoading, getError, state] = createAsyncAction({
//   id: "345345345",
//   inputs: [selector1],
//   atoms: [atom1],
//   func: async (set1, val1, cancelled) => {
//       const result1 = await f();
//       if (state.cancelled === true) return
//       set1(result1);
//   }
// });
