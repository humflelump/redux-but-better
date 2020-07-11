import { createId } from "../helpers/createId";
import { atom } from "../core/atom";
import { selector } from "../core/selector";
import { store } from "../store";
import { AsyncActionState, AsyncActionFunction } from "./types";
import { Selector } from "../core/types";

export function createAsyncAction(
  func: (info?: AsyncActionState) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1>(
  func: (val1: I1, info?: AsyncActionState) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1, I2>(
  func: (val1: I1, val2: I2, info?: AsyncActionState) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1, I2, I3>(
  func: (val1: I1, val2: I2, val3: I3, info?: AsyncActionState) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1, I2, I3, I4>(
  func: (
    val1: I1,
    val2: I2,
    val3: I3,
    val4: I4,
    info?: AsyncActionState
  ) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1, I2, I3, I4, I5>(
  func: (
    val1: I1,
    val2: I2,
    val3: I3,
    val4: I4,
    val5: I5,
    info?: AsyncActionState
  ) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1, I2, I3, I4, I5, I6>(
  func: (
    val1: I1,
    val2: I2,
    val3: I3,
    val4: I4,
    val5: I5,
    val6: I6,
    info?: AsyncActionState
  ) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1, I2, I3, I4, I5, I6, I7>(
  func: (
    val1: I1,
    val2: I2,
    val3: I3,
    val4: I4,
    val5: I5,
    val6: I6,
    val7: I7,
    info?: AsyncActionState
  ) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1, I2, I3, I4, I5, I6, I7, I8>(
  func: (
    val1: I1,
    val2: I2,
    val3: I3,
    val4: I4,
    val5: I5,
    val6: I6,
    val7: I7,
    val8: I8,
    info?: AsyncActionState
  ) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction<I1, I2, I3, I4, I5, I6, I7, I8, I9>(
  func: (
    val1: I1,
    val2: I2,
    val3: I3,
    val4: I4,
    val5: I5,
    val6: I6,
    val7: I7,
    val8: I8,
    val9: I9,
    info?: AsyncActionState
  ) => Promise<any>
): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];

export function createAsyncAction(func: (...inputs) => Promise<void>) {
  const actionId = func.name || createId();
  const isLoadingAtom = atom({
    id: `_loadingAtom_${actionId}`,
    data: false
  });
  const errorAtom = atom({
    id: `_error_${actionId}`,
    data: void 0
  });
  const isLoadingSelector = selector({
    id: `__isLoadingActionSelector__${actionId}`,
    inputs: [isLoadingAtom as any],
    func: d => d
  });
  const errorSelector = selector({
    id: `__errorActionSelector__${actionId}`,
    inputs: [errorAtom as any],
    func: d => d
  });
  const actionStates = {};
  let mostRecentAction = null as string | null;
  const action = (...params) => {
    const id = createId();
    store.notifyActionFired({ id: actionId, changes: [] });
    mostRecentAction = id;
    actionStates[id] = { id, cancelled: false, onCancel: _ => _ };
    const finish = (error: any) => {
      if (id === mostRecentAction) {
        isLoadingAtom.set(false);
        if (error !== undefined) {
          errorAtom.set(error);
        }
      } else {
        errorAtom.set(undefined);
        actionStates[id].cancelled = true;
        actionStates[id].onCancel();
      }
      delete actionStates[id];
    };
    isLoadingAtom.set(true);
    func(...params, actionStates[id])
      .then(() => {
        finish(undefined);
      })
      .catch(error => {
        finish(error);
      });
    return actionStates[id];
  };
  action.getId = () => actionId;
  return [action, isLoadingSelector, errorSelector] as any;
}
