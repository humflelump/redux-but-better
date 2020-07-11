import React from "react";
import { AtomOrSelector, ListenerListener } from "../core/types";
import { useValue } from "./useValue";

export function useNewSelector<ReturnType>(params: {
  id?: string;
  inputs?: [];
  func: () => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<ReturnType, R1>(params: {
  id?: string;
  inputs?: [AtomOrSelector<R1>];
  func: (val1: R1) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<ReturnType, R1, R2>(params: {
  id?: string;
  inputs?: [AtomOrSelector<R1>, AtomOrSelector<R2>];
  func: (val1: R1, val2: R2) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<ReturnType, R1, R2, R3>(params: {
  id?: string;
  inputs?: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
  func: (val1: R1, val2: R2, val3: R3) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<ReturnType, R1, R2, R3, R4>(params: {
  id?: string;
  inputs?: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>
  ];
  func: (val1: R1, val2: R2, val3: R3, val4: R4) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<ReturnType, R1, R2, R3, R4, R5>(params: {
  id?: string;
  inputs?: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>
  ];
  func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<ReturnType, R1, R2, R3, R4, R5, R6>(params: {
  id?: string;
  inputs?: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>
  ];
  func: (
    val1: R1,
    val2: R2,
    val3: R3,
    val4: R4,
    val5: R5,
    val6: R6
  ) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<ReturnType, R1, R2, R3, R4, R5, R6, R7>(params: {
  id?: string;
  inputs?: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>
  ];
  func: (
    val1: R1,
    val2: R2,
    val3: R3,
    val4: R4,
    val5: R5,
    val6: R6,
    val7: R7
  ) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<
  ReturnType,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8
>(params: {
  id?: string;
  inputs?: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>
  ];
  func: (
    val1: R1,
    val2: R2,
    val3: R3,
    val4: R4,
    val5: R5,
    val6: R6,
    val7: R7,
    val8: R8
  ) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector<
  ReturnType,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9
>(params: {
  id?: string;
  inputs?: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>,
    AtomOrSelector<R9>
  ];
  func: (
    val1: R1,
    val2: R2,
    val3: R3,
    val4: R4,
    val5: R5,
    val6: R6,
    val7: R7,
    val8: R8,
    val9: R9
  ) => ReturnType;
  listenersChanged?: ListenerListener;
}): ReturnType;

export function useNewSelector(params) {
  const selector = React.useMemo(() => selector(params), []);
  return useValue(selector);
}
