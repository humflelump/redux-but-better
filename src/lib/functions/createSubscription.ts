import { Atom } from "../node/Atom";
import { Selector } from "../node/Selector";
import { AtomOrSelector, ListenerListener, Listener } from "../node/types";

export function createSubscription<ReturnType>(params: {
  id: string;
  data: ReturnType;
  inputs?: AtomOrSelector<any>[];
  onInputsChanged?: (
    current: any[],
    prev: any[] | null,
    setter: (val: ReturnType) => void
  ) => void;
  onSubscriptionsChanged?: (
    newListeners: Listener[],
    prevListeners: Listener[],
    setter: (val: ReturnType) => void
  ) => void;
}): [Selector<ReturnType>, (val: ReturnType) => void];

export function createSubscription(params) {
  const { id, data, inputs, onInputsChanged, onSubscriptionsChanged } = params;
  const atom = new Atom({
    id: `__subscription_atom__${id}`,
    data
  });

  let inputsCache = null as any;

  const setter = val => atom.set(val);

  const selector = new Selector({
    id: `__subscription_selector__${id}`,
    inputs: [atom, ...(inputs || [])] as any,
    func: (...vals) => {
      const [atomVal, ...outputs] = vals as any;
      if (onInputsChanged) {
        onInputsChanged(outputs, inputsCache, setter);
      }
      inputsCache = outputs;
      return atomVal;
    },
    listenersChanged: (cur, prev) => onSubscriptionsChanged(cur, prev, setter)
  });

  return [selector, setter];
}
