import { AtomOrSelector, Listener } from "../core/types";
import { Atom } from "../core/Atom";
import { ActionFunction, Setter } from "./types";

export function createAction(params: {
  id: string;
  inputs?: [];
  atoms?: [];
  func: () => void;
}): ActionFunction;

export function createAction<S1>(params: {
  id: string;
  inputs?: [];
  atoms: [AtomOrSelector<S1>];
  func: (set1: Setter<S1>) => void;
}): ActionFunction;

export function createAction<S1, S2>(params: {
  id: string;
  inputs?: [];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (set1: Setter<S1>, set2: Setter<S2>) => void;
}): ActionFunction;

export function createAction<S1, S2, S3>(params: {
  id: string;
  inputs?: [];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (set1: Setter<S1>, set2: Setter<S2>, set3: Setter<S3>) => void;
}): ActionFunction;

export function createAction<R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  atoms?: [];
  func: (val1: R1) => void;
}): ActionFunction;

export function createAction<S1, R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  atoms: [AtomOrSelector<S1>];
  func: (set1: Setter<S1>, val1: R1) => void;
}): ActionFunction;

export function createAction<S1, S2, R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (set1: Setter<S1>, set2: Setter<S2>, val1: R1) => void;
}): ActionFunction;

export function createAction<S1, S2, S3, R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    set3: Setter<S3>,
    val1: R1
  ) => void;
}): ActionFunction;

export function createAction<R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  atoms?: [];
  func: (val1: R1, val2: R2) => void;
}): ActionFunction;

export function createAction<S1, R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  atoms: [AtomOrSelector<S1>];
  func: (set1: Setter<S1>, val1: R1, val2: R2) => void;
}): ActionFunction;

export function createAction<S1, S2, R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (set1: Setter<S1>, set2: Setter<S2>, val1: R1, val2: R2) => void;
}): ActionFunction;

export function createAction<S1, S2, S3, R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    set3: Setter<S3>,
    val1: R1,
    val2: R2
  ) => void;
}): ActionFunction;

export function createAction<R1, R2, R3>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  atoms?: [];
  func: (val1: R1, val2: R2, val3: R3) => void;
}): ActionFunction;

export function createAction<S1, R1, R2, R3>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  atoms: [AtomOrSelector<S1>];
  func: (set1: Setter<S1>, val1: R1, val2: R2, val3: R3) => void;
}): ActionFunction;

export function createAction<S1, S2, R1, R2, R3>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    val1: R1,
    val2: R2,
    val3: R3
  ) => void;
}): ActionFunction;

export function createAction<S1, S2, S3, R1, R2, R3>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  atoms: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (
    set1: Setter<S1>,
    set2: Setter<S2>,
    set3: Setter<S3>,
    val1: R1,
    val2: R2,
    val3: R3
  ) => void;
}): ActionFunction;

export function createAction(
  params:
    | any
    | {
        id: string;
        inputs: AtomOrSelector<any>[];
        atoms: Atom<any>[];
        func: Function;
      }
) {
  const { id, inputs, atoms, func } = params;
  const setters = (atoms || []).map(atom => {
    return val => atom.set(val, false);
  });

  const action = () => {
    const vals = (inputs || []).map(input => input.get());
    func(...setters, ...vals);
    // TODO: only call listeners if the atoms was changed
    const visited = new Set<Listener>();

    atoms.forEach(atom => {
      atom.getListeners().forEach(listener => {
        if (visited.has(listener)) return;
        visited.add(listener);
        listener();
      });
    });
  };
  action.getId = () => id;
  return action;
}
