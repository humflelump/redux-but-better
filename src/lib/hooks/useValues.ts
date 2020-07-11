import React from "react";
import { AtomOrSelector } from "../core/types";
import { arraysDiff } from "../helpers/array-diff";

export function useValues<R1>(selectors: [AtomOrSelector<R1>]): [R1];

export function useValues<R1, R2>(
  selectors: [AtomOrSelector<R1>, AtomOrSelector<R2>]
): [R1, R2];

export function useValues<R1, R2, R3>(
  selectors: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>]
): [R1, R2, R3];

export function useValues<R1, R2, R3, R4>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>
  ]
): [R1, R2, R3, R4];

export function useValues<R1, R2, R3, R4, R5>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>
  ]
): [R1, R2, R3, R4, R5];

export function useValues<R1, R2, R3, R4, R5, R6>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>
  ]
): [R1, R2, R3, R4, R5, R6];

export function useValues<R1, R2, R3, R4, R5, R6, R7>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>
  ]
): [R1, R2, R3, R4, R5, R6, R7];

export function useValues<R1, R2, R3, R4, R5, R6, R7, R8>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>
  ]
): [R1, R2, R3, R4, R5, R6, R7, R8];

export function useValues<R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>,
    AtomOrSelector<R9>
  ]
): [R1, R2, R3, R4, R5, R6, R7, R8, R9];

export function useValues<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>,
    AtomOrSelector<R9>,
    AtomOrSelector<R10>
  ]
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10];

export function useValues<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>,
    AtomOrSelector<R9>,
    AtomOrSelector<R10>,
    AtomOrSelector<R11>
  ]
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11];

export function useValues<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>,
    AtomOrSelector<R9>,
    AtomOrSelector<R10>,
    AtomOrSelector<R11>,
    AtomOrSelector<R12>
  ]
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12];

export function useValues<
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
  R11,
  R12,
  R13
>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>,
    AtomOrSelector<R9>,
    AtomOrSelector<R10>,
    AtomOrSelector<R11>,
    AtomOrSelector<R12>,
    AtomOrSelector<R13>
  ]
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13];

export function useValues<
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
  R11,
  R12,
  R13,
  R14
>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>,
    AtomOrSelector<R9>,
    AtomOrSelector<R10>,
    AtomOrSelector<R11>,
    AtomOrSelector<R12>,
    AtomOrSelector<R13>,
    AtomOrSelector<R14>
  ]
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14];

export function useValues<
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
  R11,
  R12,
  R13,
  R14,
  R15
>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>,
    AtomOrSelector<R9>,
    AtomOrSelector<R10>,
    AtomOrSelector<R11>,
    AtomOrSelector<R12>,
    AtomOrSelector<R13>,
    AtomOrSelector<R14>,
    AtomOrSelector<R15>
  ]
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15];

export function useValues(selectors: AtomOrSelector<any>[]) {
  const vals = selectors.map(d => d.get());
  const [outputs, setValue] = React.useState(vals);

  React.useEffect(() => {
    let prev = outputs;
    const listener = () => {
      const newVals = selectors.map(d => d.get());
      if (arraysDiff(prev, newVals)) {
        setValue(newVals);
        prev = newVals;
      }
    };
    selectors.forEach(s => s.addChangeListenerToParents(listener));
    return () => {
      selectors.forEach(s => s.removeChangeListenerFromParents(listener));
    };
  }, []);

  return outputs;
}
