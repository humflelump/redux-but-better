import React from "react";
import { store } from "../functions/createStore";

export function useCell(func) {
  const [atoms] = React.useState([] as any);
  const [state] = React.useState({ count: 0, result: null });
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
  return state.result as any;
}
