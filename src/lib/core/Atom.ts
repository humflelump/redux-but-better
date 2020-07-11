import { atomMethods } from "./Atom-methods";
import { parentMethods } from "./ParentNode-methods";
import { Atom, ListenerListener } from "./types";

const proto = { ...atomMethods, ...parentMethods };

export function atom<Return, Metadata = null>(params: {
  data: Return;
  id: string;
  metadata?: Metadata;
  listenersChanged?: ListenerListener;
}): Atom<Return, Metadata>;

export function atom(params) {
  const state = {
    data: params.data,
    metadata: "metadata" in params ? params.metadata : null,

    id: params.id,
    dependencies: [],
    dependants: [],
    listeners: new Set(),
    listenersChanged: params.listenersChanged || null,
    useCache: false,
    __proto__: proto
  };

  return state as any;
}

atom.isAtom = (obj: any) => {
  return obj && obj.__proto__ === proto;
};
