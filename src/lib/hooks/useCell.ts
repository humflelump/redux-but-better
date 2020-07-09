import React from "react";
import { store } from "../store";

export function useCell<ReturnType>(func: () => ReturnType): ReturnType {
  const [atoms] = React.useState([] as any);
  const [state] = React.useState({ count: 0, result: null as any });
  if (state.count === 0) {
    const unsub = store.subscribeToCreatedAtoms(atom => {
      atoms.push(atom);
    });
    state.result = func();
    unsub();
  }
  React.useEffect(() => {
    return () => {
      atoms.forEach(atom => store.removeAtom(atom));
    };
  }, []);
  state.count += 1;
  return state.result as ReturnType;
}
