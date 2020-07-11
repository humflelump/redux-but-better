import React from "react";
import { ListenerListener } from "../core/types";
import { store } from "../store";
import { useAtom } from "./useAtom";

const _ = [];

export function useNewAtom<T, M = any>(params: {
  data: T;
  id: string;
  metadata: M;
  listenersChanged?: ListenerListener;
}) {
  const atom = React.useMemo(() => atom(params), _);
  return useAtom(atom);
}
