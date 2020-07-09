import { Atom } from "../core/Atom";
import React from "react";
import { ListenerListener } from "../core/types";
import { store } from "../store";
import { useAtom } from "./useAtom";

const _ = [];

export function useNewAtom<T>(params: {
  data: T;
  id: string;
  listenersChanged?: ListenerListener;
}) {
  const atom = React.useMemo(() => new Atom(params), _);
  React.useEffect(() => {
    return () => store.removeAtom(atom);
  }, _);
  return useAtom(atom);
}
