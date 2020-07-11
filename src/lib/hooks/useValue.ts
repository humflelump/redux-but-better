import React from "react";
import { AtomOrSelector } from "../core/types";

const _ = [];

export function useValue<T>(selector: AtomOrSelector<T>) {
  const [value, setValue] = React.useState(selector.get());

  React.useEffect(() => {
    const listener = () => {
      setValue(selector.get());
    };
    selector.addChangeListenerToParents(listener);
    return () => {
      selector.removeChangeListenerFromParents(listener);
    };
  }, _);

  return value;
}
