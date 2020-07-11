import { parentMethods } from "./ParentNode-methods";
import { dynamicSelectorMethods } from "./DynamicSelector-methods";
import { DynamicSelector, AtomOrSelector, ListenerListener } from "./types";
import { createId } from "../helpers/createId";

const proto = { ...dynamicSelectorMethods, ...parentMethods };

export function dynamicSelector<Return>(params: {
  id?: string;
  inputs?: AtomOrSelector<Return, any>;
  func: (get: <T>(node: AtomOrSelector<T, any>) => T) => Return;
  listenersChanged?: ListenerListener;
}): DynamicSelector<Return>;

export function dynamicSelector(params) {
  const state = {
    data: params.data,
    metadata: null,
    cacheInputs: null,
    cacheVal: null,
    func: params.func,

    id: params.id || createId(),
    dependencies: params.inputs || [],
    dependants: [],
    listeners: new Set(),
    listenersChanged: params.listenersChanged || null,
    useCache: false,

    __proto__: proto
  };

  for (let i = 0; i < state.dependencies.length; i++) {
    state.dependencies[i].addDependant(state);
  }
  return state as any;
}
