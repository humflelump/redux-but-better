import { createId } from "../helpers/createId";
import { createAsyncSelector } from "./createAsyncSelector";
import { AtomOrSelector, Selector } from "../core/types";
import { selector } from "../core/selector";

export function createThrottledSelector<ReturnType>(params: {
  id?: string;
  inputs?: [];
  func: () => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<S1, ReturnType>(params: {
  id?: string;
  inputs: [AtomOrSelector<S1>];
  func: (val1: S1) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<S1, S2, ReturnType>(params: {
  id?: string;
  inputs: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (val1: S1, val2: S2) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<S1, S2, S3, ReturnType>(params: {
  id?: string;
  inputs: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (val1: S1, val2: S2, val3: S3) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<S1, S2, S3, S4, ReturnType>(params: {
  id?: string;
  inputs: [
    AtomOrSelector<S1>,
    AtomOrSelector<S2>,
    AtomOrSelector<S3>,
    AtomOrSelector<S4>
  ];
  func: (val1: S1, val2: S2, val3: S3, val4: S4) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  ReturnType
>(params: {
  id?: string;
  inputs: [
    AtomOrSelector<S1>,
    AtomOrSelector<S2>,
    AtomOrSelector<S3>,
    AtomOrSelector<S4>,
    AtomOrSelector<S5>
  ];
  func: (val1: S1, val2: S2, val3: S3, val4: S4, val5: S5) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  ReturnType
>(params: {
  id?: string;
  inputs: [
    AtomOrSelector<S1>,
    AtomOrSelector<S2>,
    AtomOrSelector<S3>,
    AtomOrSelector<S4>,
    AtomOrSelector<S5>,
    AtomOrSelector<S6>
  ];
  func: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    val6: S6
  ) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  S7,
  ReturnType
>(params: {
  id?: string;
  inputs: [
    AtomOrSelector<S1>,
    AtomOrSelector<S2>,
    AtomOrSelector<S3>,
    AtomOrSelector<S4>,
    AtomOrSelector<S5>,
    AtomOrSelector<S6>,
    AtomOrSelector<S7>
  ];
  func: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    val6: S6,
    val7: S7
  ) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  S7,
  S8,
  ReturnType
>(params: {
  id?: string;
  inputs: [
    AtomOrSelector<S1>,
    AtomOrSelector<S2>,
    AtomOrSelector<S3>,
    AtomOrSelector<S4>,
    AtomOrSelector<S5>,
    AtomOrSelector<S6>,
    AtomOrSelector<S7>,
    AtomOrSelector<S8>
  ];
  func: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    val6: S6,
    val7: S7,
    val8: S8
  ) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  S7,
  S8,
  S9,
  ReturnType
>(params: {
  id?: string;
  inputs: [
    AtomOrSelector<S1>,
    AtomOrSelector<S2>,
    AtomOrSelector<S3>,
    AtomOrSelector<S4>,
    AtomOrSelector<S5>,
    AtomOrSelector<S6>,
    AtomOrSelector<S7>,
    AtomOrSelector<S8>,
    AtomOrSelector<S9>
  ];
  func: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    val6: S6,
    val7: S7,
    val8: S8,
    val9: S9
  ) => ReturnType;
  throttle: (f: () => void) => () => void;
}): Selector<ReturnType>;

export function createThrottledSelector(params) {
  const { func, throttle } = params;
  const id = params.id || createId();
  const inputs = params.inputs || [];
  const INIT = {}; // Any globally unique constant would work.
  const [asyncSelector] = createAsyncSelector({
    inputs,
    id,
    throttle,
    func: async (...params) => {
      await new Promise(res => setTimeout(res, 0));
      return func(...params);
    },
    defaultValue: INIT
  });

  let cache = INIT;
  const returnSelector = selector({
    id: `_result_${id}`,
    inputs: [asyncSelector, ...inputs] as any,
    func: (val, ...outputs) => {
      if (val === INIT) {
        cache = cache === INIT ? func(...outputs) : cache;
        return cache;
      }
      return val;
    }
  });
  return returnSelector;
}
