import createAsyncSelector_ from "async-selector";
import { AtomOrSelector, Selector } from "../core/types";
import { AsyncSelectorPromiseState } from "./types";
import { atom } from "../core/atom";
import { selector } from "../core/selector";
import { createId } from "../helpers/createId";

export function createAsyncSelector<ReturnType, DefaultValue = null>(params: {
  id: string;
  inputs?: [];
  func: (state: AsyncSelectorPromiseState) => Promise<ReturnType>;
  shouldUseAsync?: () => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
  inputs: [AtomOrSelector<S1>];
  func: (val1: S1, state: AsyncSelectorPromiseState) => Promise<ReturnType>;
  shouldUseAsync?: (val1: S1) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  S2,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
  inputs: [AtomOrSelector<S1>, AtomOrSelector<S2>];
  func: (
    val1: S1,
    val2: S2,
    state: AsyncSelectorPromiseState
  ) => Promise<ReturnType>;
  shouldUseAsync?: (val1: S1, val2: S2) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  S2,
  S3,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
  inputs: [AtomOrSelector<S1>, AtomOrSelector<S2>, AtomOrSelector<S3>];
  func: (
    val1: S1,
    val2: S2,
    val3: S3,
    state: AsyncSelectorPromiseState
  ) => Promise<ReturnType>;
  shouldUseAsync?: (val1: S1, val2: S2, val3: S3) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  S2,
  S3,
  S4,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
  inputs: [
    AtomOrSelector<S1>,
    AtomOrSelector<S2>,
    AtomOrSelector<S3>,
    AtomOrSelector<S4>
  ];
  func: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    state: AsyncSelectorPromiseState
  ) => Promise<ReturnType>;
  shouldUseAsync?: (val1: S1, val2: S2, val3: S3, val4: S4) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
  inputs: [
    AtomOrSelector<S1>,
    AtomOrSelector<S2>,
    AtomOrSelector<S3>,
    AtomOrSelector<S4>,
    AtomOrSelector<S5>
  ];
  func: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    state: AsyncSelectorPromiseState
  ) => Promise<ReturnType>;
  shouldUseAsync?: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5
  ) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
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
    val6: S6,
    state: AsyncSelectorPromiseState
  ) => Promise<ReturnType>;
  shouldUseAsync?: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    val6: S6
  ) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  S7,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
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
    val7: S7,
    state: AsyncSelectorPromiseState
  ) => Promise<ReturnType>;
  shouldUseAsync?: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    val6: S6,
    val7: S7
  ) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  S7,
  S8,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
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
    val8: S8,
    state: AsyncSelectorPromiseState
  ) => Promise<ReturnType>;
  shouldUseAsync?: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    val6: S6,
    val7: S7,
    val8: S8
  ) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector<
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  S7,
  S8,
  S9,
  ReturnType,
  DefaultValue = null
>(params: {
  id: string;
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
    val9: S9,
    state: AsyncSelectorPromiseState
  ) => Promise<ReturnType>;
  shouldUseAsync?: (
    val1: S1,
    val2: S2,
    val3: S3,
    val4: S4,
    val5: S5,
    val6: S6,
    val7: S7,
    val8: S8,
    val9: S9
  ) => boolean;
  defaultValue: DefaultValue;
  throttle?: (f: () => void) => () => void;
}): [
  Selector<ReturnType | DefaultValue>,
  Selector<boolean>,
  Selector<any | undefined>,
  () => void
];

export function createAsyncSelector(params) {
  const { func, inputs, throttle, shouldUseAsync } = params;
  const id = params.id || createId();
  const defaultValue = "defaultValue" in params ? params.defaultValue : null;

  const asyncSelectorAtom = atom({
    id: `__valueAtom__${id}`,
    data: undefined as any
  });

  const isLoadingAtom = atom({
    id: `__loadingAtom__${id}`,
    data: false
  });

  const valueSelector = selector({
    id: `__valueSelectorSelector__${id}`,
    inputs: [asyncSelectorAtom],
    func: d => {
      return d ? d.previous : defaultValue;
    }
  });

  const isLoadingSelector = selector({
    id: `__isLoadingSelectorSelector__${id}`,
    inputs: [isLoadingAtom],
    func: d => d
  });
  const errorSelector = selector({
    id: `__errorSelectorSelector__${id}`,
    inputs: [asyncSelectorAtom],
    func: d => (d ? (d.isRejected ? d.value : undefined) : undefined)
  });

  const asyncFunc = (...params) => {
    const state = {
      id,
      cancelled: false,
      onCancel: _ => _
    };
    const promise: any = new Promise((res, rej) => {
      func(...params, state)
        .then(res)
        .catch(rej);
    });
    promise._ = state;
    return promise;
  };

  const asyncSelector = createAsyncSelector_(
    {
      async: asyncFunc,
      throttle,
      shouldUseAsync,
      onResolve: () => {
        asyncSelectorAtom.set(asyncSelector());
      },
      onReject: () => asyncSelectorAtom.set(asyncSelector()),
      onCancel: promise => {
        promise._.cancelled = true;
        promise._.onCancel();
      }
    },
    (inputs || []).map(d => () => d.get())
  );

  const resultSelector = selector({
    id: `__asyncSelector__${id}`,
    inputs: [valueSelector, ...inputs] as any,
    func: d => {
      isLoadingAtom.set(asyncSelector().isWaiting);
      return d;
    }
  });

  const forceUpdate = () => asyncSelector.forceUpdate();
  return [resultSelector, isLoadingSelector, errorSelector, forceUpdate];
}
