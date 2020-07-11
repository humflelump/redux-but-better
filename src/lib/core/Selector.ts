import { selectorMethods } from "./Selector-methods";
import { parentMethods } from "./ParentNode-methods";
import { AtomOrSelector, ListenerListener, Selector } from "./types";
import { createId } from "../helpers/createId";

const proto = { ...selectorMethods, ...parentMethods };

// prettier-ignore
export function selector<Return>(params: {
    inputs?: [];
    func: () => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1>(params: {
    inputs: [AtomOrSelector<R1>];
    func: (val1: R1) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1, R2>(params: {
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
    func: (val1: R1, val2: R2) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1, R2, R3>(params: {
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
    func: (val1: R1, val2: R2, val3: R3) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1, R2, R3, R4>(params: {
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1, R2, R3, R4, R5>(params: {
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1, R2, R3, R4, R5, R6>(params: {
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>, AtomOrSelector<R6>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1, R2, R3, R4, R5, R6, R7>(params: {
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>, AtomOrSelector<R6>, AtomOrSelector<R7>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1, R2, R3, R4, R5, R6, R7, R8>(params: {
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>, AtomOrSelector<R6>, AtomOrSelector<R7>, AtomOrSelector<R8>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7, val8: R8) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

// prettier-ignore
export function selector<Return, R1, R2, R3, R4, R5, R6, R7, R8, R9>(params: {
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>, AtomOrSelector<R6>, AtomOrSelector<R7>, AtomOrSelector<R8>, AtomOrSelector<R9>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7, val8: R8, val9: R9) => Return;
    id?: string;
    listenersChanged?: ListenerListener;
  }): Selector<Return>;

export function selector(params) {
  const state = {
    data: params.data,
    metadata: null,
    cacheInputs: null,
    cacheVal: null,
    func: params.func,

    id: params.id || createId(),
    dependencies: params.inputs || [],
    dependants: [],
    listeners: new Set(),
    listenersChanged: params.listenersChanged || null,
    useCache: false,
    __proto__: proto
  };

  for (let i = 0; i < state.dependencies.length; i++) {
    state.dependencies[i].addDependant(state);
  }
  return state as any;
}
