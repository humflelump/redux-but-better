import { Atom } from "../node/Atom";
import React from "react";

const _ = [];

export function useAtom<T>(atom: Atom<T>) {
  const [value, setValue] = React.useState(atom.get());

  React.useEffect(() => {
    const listener = () => {
      setValue(atom.get());
    };
    atom.addChangeListenerToParents(listener);
    return () => {
      atom.removeChangeListenerFromParents(listener);
    };
  }, _);

  const setter = React.useCallback((val: T) => atom.set(val), [atom]);
  return [value, setter] as [T, (val: T) => void];
}