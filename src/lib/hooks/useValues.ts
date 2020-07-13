import React from "react";
import { AtomOrSelector } from "../core/types";
import { arraysDiff } from "../helpers/array-diff";

export function useValues<R1, Data = undefined>(
  selectors: [AtomOrSelector<R1>],
  data?: Data
): [R1];

export function useValues<R1, R2, Data = undefined>(
  selectors: [AtomOrSelector<R1>, AtomOrSelector<R2>],
  data?: Data
): [R1, R2];

export function useValues<R1, R2, R3, Data = undefined>(
  selectors: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>],
  data?: Data
): [R1, R2, R3];

export function useValues<R1, R2, R3, R4, Data = undefined>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>
  ],
  data?: Data
): [R1, R2, R3, R4];

export function useValues<R1, R2, R3, R4, R5, Data = undefined>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>
  ],
  data?: Data
): [R1, R2, R3, R4, R5];

export function useValues<R1, R2, R3, R4, R5, R6, Data = undefined>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>
  ],
  data?: Data
): [R1, R2, R3, R4, R5, R6];

export function useValues<R1, R2, R3, R4, R5, R6, R7, Data = undefined>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>
  ],
  data?: Data
): [R1, R2, R3, R4, R5, R6, R7];

export function useValues<R1, R2, R3, R4, R5, R6, R7, R8, Data = undefined>(
  selectors: [
    AtomOrSelector<R1>,
    AtomOrSelector<R2>,
    AtomOrSelector<R3>,
    AtomOrSelector<R4>,
    AtomOrSelector<R5>,
    AtomOrSelector<R6>,
    AtomOrSelector<R7>,
    AtomOrSelector<R8>
  ],
  data?: Data
): [R1, R2, R3, R4, R5, R6, R7, R8];

export function useValues<R1, R2, R3, R4, R5, R6, R7, R8, R9, Data = undefined>(
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
  ],
  data?: Data
): [R1, R2, R3, R4, R5, R6, R7, R8, R9];

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
  Data = undefined
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
    AtomOrSelector<R10>
  ],
  data?: Data
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10];

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
  Data = undefined
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
    AtomOrSelector<R11>
  ],
  data?: Data
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11];

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
  Data = undefined
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
    AtomOrSelector<R12>
  ],
  data?: Data
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
  R13,
  Data = undefined
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
  ],
  data?: Data
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
  R14,
  Data = undefined
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
  ],
  data?: Data
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
  R15,
  Data = undefined
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
  ],
  data?: Data
): [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15];
export function useValues<Data = undefined>(
  selectors: AtomOrSelector<any>[],
  data?: Data
) {
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
    listener.data = data;
    selectors.forEach(s => s.subscribe(listener));
    return () => {
      selectors.forEach(s => s.unsubscribe(listener));
    };
  }, []);

  return outputs;
}
