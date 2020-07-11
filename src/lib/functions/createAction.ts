import { createId } from "../helpers/createId";
import { store } from "../store";
import { ActionChange } from "./types";

export function createAction<FuncType>(func: FuncType) {
  const id = (func as any).name || createId();
  const returnFunc = (...params) => {
    const changes = [] as ActionChange[];
    const unsubscribe = store.subscribeToChangedAtoms((atom, prev) => {
      changes.push({ from: prev, to: atom.get(), atom });
    });
    const result = (func as any)(...params);
    store.notifyActionFired({ id, changes });
    unsubscribe();
    return result;
  };
  returnFunc.getId = () => id;
  return (returnFunc as any) as FuncType & { getId: () => string };
}
