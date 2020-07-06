import React from "react";
import { AtomOrSelector } from "./atom-or-selector";

export type Atom<ReturnType> = {
  (): ReturnType;
  set(val: ReturnType, notifySubscribers?: boolean): void;
  getId(): string;
  addChangeListener(listener: () => void): void;
  removeChangeListener(listener: () => void): void;
  getListeners(): (() => void)[];
  getDependencies(): AtomOrSelector<any>[];
  addDependent<T>(selector: AtomOrSelector<T>): void;
  getDependents(): AtomOrSelector<any>[];
};

export type Atomify<Object> = {
  [P in keyof Object]: Atom<Object[P]>;
};

export function atom<T>(params: { data: T; id: string }): Atom<T>;

export function atom(params: any) {
  let { data, id } = params;
  const state: any = {
    data,
    listeners: [],
    dependents: []
  };
  const getData = () => {
    return state.data;
  };
  getData.set = (val: any, notifySubscribers = true) => {
    const changed = state.data !== val;
    state.data = val;
    if (notifySubscribers && changed) {
      const listeners = getListenersToCall([getData]);
      listeners.forEach(f => f());
    }
  };
  getData.getId = () => id;
  getData.addChangeListener = (listener: any) => {
    state.listeners.push(listener);
  };
  getData.removeChangeListener = (listener: any) => {
    state.listeners = state.listeners.filter((f: any) => f !== listener);
  };
  getData.getDependencies = () => [];
  getData.addDependent = (selector: any) => {
    state.dependents.push(selector);
  };
  getData.getListeners = () => state.listeners;
  getData.getDependents = () => state.dependents;
  return getData;
}

const EMPTY: any[] = [];

export function useAtom<T>(atom: Atom<T>) {
  const [value, setValue] = React.useState(atom());

  React.useEffect(() => {
    const listener = () => {
      setValue(atom());
    };
    atom.addChangeListener(listener);
    return () => {
      atom.removeChangeListener(listener);
    };
  }, EMPTY);

  const setter = React.useCallback((val: T) => atom.set(val), [atom]);
  return [value, setter] as [T, (val: T) => void];
}

export function getListenersToCall(atoms: Atom<any>[]) {
  type Listener = () => void;
  const visitedNodes = new Set<Listener>();
  const visitedListeners = new Set<Listener>();
  const traverse = (node: AtomOrSelector<any>) => {
    if (visitedNodes.has(node)) {
      return;
    }
    for (const listener of node.getListeners()) {
      visitedListeners.add(listener);
    }
    visitedNodes.add(node);
    for (const child of node.getDependents()) {
      traverse(child);
    }
  };
  for (const atom of atoms) {
    traverse(atom);
  }
  return Array.from(visitedListeners);
}
