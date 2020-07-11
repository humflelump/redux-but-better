import { AtomOrSelector, Listener, Selector } from "../core/types";
import { atom } from "../core/atom";
import { selector } from "../core/selector";
import { createId } from "../helpers/createId";

export function createSubscription<ReturnType>(params: {
  id?: string;
  data: ReturnType;
  inputs?: [];
  onInputsChanged?: (
    current: [],
    prev: [] | null,
    setter: (val: ReturnType) => void
  ) => void;
  onSubscriptionsChanged?: (
    newListeners: Listener[],
    prevListeners: Listener[],
    setter: (val: ReturnType) => void
  ) => void;
  onSubscribe?: (values: [], setter: (val: ReturnType) => void) => void;
  onUnsubscribe?: (values: [], setter: (val: ReturnType) => void) => void;
}): [Selector<ReturnType>, (val: ReturnType) => void];

export function createSubscription<ReturnType, R1>(params: {
  id?: string;
  data: ReturnType;
  inputs: [AtomOrSelector<R1>];
  onInputsChanged?: (
    current: [R1],
    prev: [R1] | null,
    setter: (val: ReturnType) => void
  ) => void;
  onSubscriptionsChanged?: (
    newListeners: Listener[],
    prevListeners: Listener[],
    setter: (val: ReturnType) => void
  ) => void;
  onSubscribe?: (values: [R1], setter: (val: ReturnType) => void) => void;
  onUnsubscribe?: (values: [R1], setter: (val: ReturnType) => void) => void;
}): [Selector<ReturnType>, (val: ReturnType) => void];

export function createSubscription<ReturnType, R1, R2>(params: {
  id?: string;
  data: ReturnType;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  onInputsChanged?: (
    current: [R1, R2],
    prev: [R1, R2] | null,
    setter: (val: ReturnType) => void
  ) => void;
  onSubscriptionsChanged?: (
    newListeners: Listener[],
    prevListeners: Listener[],
    setter: (val: ReturnType) => void
  ) => void;
  onSubscribe?: (values: [R1, R2], setter: (val: ReturnType) => void) => void;
  onUnsubscribe?: (values: [R1, R2], setter: (val: ReturnType) => void) => void;
}): [Selector<ReturnType>, (val: ReturnType) => void];

export function createSubscription<ReturnType, R1, R2, R3>(params: {
  id?: string;
  data: ReturnType;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  onInputsChanged?: (
    current: [R1, R2, R3],
    prev: [R1, R2, R3] | null,
    setter: (val: ReturnType) => void
  ) => void;
  onSubscriptionsChanged?: (
    newListeners: Listener[],
    prevListeners: Listener[],
    setter: (val: ReturnType) => void
  ) => void;
  onSubscribe?: (
    values: [R1, R2, R3],
    setter: (val: ReturnType) => void
  ) => void;
  onUnsubscribe?: (
    values: [R1, R2, R3],
    setter: (val: ReturnType) => void
  ) => void;
}): [Selector<ReturnType>, (val: ReturnType) => void];

export function createSubscription<ReturnType, R1, R2, R3, R4>(params: {
  id?: string;
  data: ReturnType;
  inputs: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>
  ];
  onInputsChanged?: (
    current: [R1, R2, R3, R4],
    prev: [R1, R2, R3, R4] | null,
    setter: (val: ReturnType) => void
  ) => void;
  onSubscriptionsChanged?: (
    newListeners: Listener[],
    prevListeners: Listener[],
    setter: (val: ReturnType) => void
  ) => void;
  onSubscribe?: (
    values: [R1, R2, R3, R4],
    setter: (val: ReturnType) => void
  ) => void;
  onUnsubscribe?: (
    values: [R1, R2, R3, R4],
    setter: (val: ReturnType) => void
  ) => void;
}): [Selector<ReturnType>, (val: ReturnType) => void];

export function createSubscription<ReturnType, R1, R2, R3, R4, R5>(params: {
  id?: string;
  data: ReturnType;
  inputs: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>
  ];
  onInputsChanged?: (
    current: [R1, R2, R3, R4, R5],
    prev: [R1, R2, R3, R4, R5] | null,
    setter: (val: ReturnType) => void
  ) => void;
  onSubscriptionsChanged?: (
    newListeners: Listener[],
    prevListeners: Listener[],
    setter: (val: ReturnType) => void
  ) => void;
  onSubscribe?: (
    values: [R1, R2, R3, R4, R5],
    setter: (val: ReturnType) => void
  ) => void;
  onUnsubscribe?: (
    values: [R1, R2, R3, R4, R5],
    setter: (val: ReturnType) => void
  ) => void;
}): [Selector<ReturnType>, (val: ReturnType) => void];

export function createSubscription<ReturnType, R1, R2, R3, R4, R5, R6>(params: {
  id?: string;
  data: ReturnType;
  inputs: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>
  ];
  onInputsChanged?: (
    current: [R1, R2, R3, R4, R5, R6],
    prev: [R1, R2, R3, R4, R5, R6] | null,
    setter: (val: ReturnType) => void
  ) => void;
  onSubscriptionsChanged?: (
    newListeners: Listener[],
    prevListeners: Listener[],
    setter: (val: ReturnType) => void
  ) => void;
  onSubscribe?: (
    values: [R1, R2, R3, R4, R5, R6],
    setter: (val: ReturnType) => void
  ) => void;
  onUnsubscribe?: (
    values: [R1, R2, R3, R4, R5, R6],
    setter: (val: ReturnType) => void
  ) => void;
}): [Selector<ReturnType>, (val: ReturnType) => void];

export function createSubscription(params) {
  const {
    data,
    onInputsChanged,
    onSubscriptionsChanged,
    onSubscribe,
    onUnsubscribe
  } = params;
  const id = params.id || createId();
  const inputs = params.inputs || [];

  const subAtom = atom({
    id: `__subscription_atom__${id}`,
    data
  });

  let inputsCache = null as any;

  const setter = val => subAtom.set(val);

  const subSelector = selector({
    id: `__subscription_selector__${id}`,
    inputs: [atom, ...inputs] as any,
    func: (...vals) => {
      const [atomVal, ...outputs] = vals as any;
      if (onInputsChanged) {
        onInputsChanged(outputs, inputsCache, setter);
      }
      inputsCache = outputs;
      return atomVal;
    },
    listenersChanged: (cur, prev) => {
      onSubscriptionsChanged && onSubscriptionsChanged(cur, prev, setter);
      if (cur.length > 0 && prev.length === 0) {
        const vals = inputs.map(d => d.get());
        onSubscribe && onSubscribe(vals, setter);
      }
      if (cur.length === 0 && prev.length > 0) {
        const vals = inputs.map(d => d.get());
        onUnsubscribe && onUnsubscribe(vals, setter);
      }
    }
  });

  return [subSelector, setter];
}
