import React from "react";
import { Atom } from "../core/types";

const _ = [];

export function useAtom<T, M>(atom: Atom<T, M>) {
  const [value, setValue] = React.useState(atom.get());

  React.useEffect(() => {
    const listener = () => setValue(atom.get());
    atom.addChangeListenerToParents(listener);
    return () => {
      atom.removeChangeListenerFromParents(listener);
    };
  }, _);

  const setter = (val: T) => atom.set(val);
  return [value, setter] as [T, (val: T) => void];
}
