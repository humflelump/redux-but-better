import { AtomOrSelector } from "./atom-or-selector";
import React from "react";
import { arraysDiff } from "./array-diff";

export type Selector<ReturnType> = {
  (): ReturnType;
  getId(): string;
  getDependencies(): AtomOrSelector<any>[];
  addChangeListener(listener: () => void): void;
  removeChangeListener(listener: () => void): void;
  getListeners(): (() => void)[];
  addDependent<T>(selector: AtomOrSelector<T>): void;
  getDependents(): AtomOrSelector<any>[];
};

export function createSelector<ReturnType>(params: {
  id: string;
  inputs: [];
  func: () => ReturnType;
}): Selector<ReturnType>;

export function createSelector<ReturnType, R1>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>];
  func: (val1: R1) => ReturnType;
}): Selector<ReturnType>;

export function createSelector<ReturnType, R1, R2>(params: {
  id: string;
  inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  func: (val1: R1, val2: R2) => ReturnType;
}): Selector<ReturnType>;

export function createSelector(params: any) {
  const { inputs, func, id } = params;
  const state: any = {
    dependents: [],
    listeners: [],
    cacheInputs: null,
    cacheResult: null
  };

  const getData = () => {
    const vals = inputs.map(f => f());
    if (arraysDiff(vals, state.cacheInputs)) {
      const result = func(...vals);
      state.cacheResult = result;
      state.cacheInputs = vals;
      return result;
    }
    return state.cacheResult;
  };
  getData.getId = () => id;
  getData.getDependencies = () => inputs;
  getData.addChangeListener = (listener: any) => {
    state.listeners.push(listener);
  };
  getData.removeChangeListener = (listener: any) => {
    state.listeners = state.listeners.filter((f: any) => f !== listener);
  };
  getData.getListeners = () => state.listeners;
  getData.addDependent = (selector: any) => {
    state.dependents.push(selector);
  };
  getData.getDependents = () => state.dependents;

  for (const selector of inputs) {
    selector.addDependent(getData);
  }

  return getData;
}

const EMPTY: any[] = [];

export function useSelector<T>(selector: Selector<T>) {
  const [value, setValue] = React.useState(selector());

  React.useEffect(() => {
    const listener = () => {
      setValue(selector());
    };
    selector.addChangeListener(listener);
    return () => {
      selector.removeChangeListener(listener);
    };
  }, EMPTY);

  return value;
}
