import React from "react";
import { Selector } from "../core/Selector";

const _ = [];

export function useSelector<T>(selector: Selector<T>) {
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
