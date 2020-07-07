import { arraysDiff } from "../helpers/array-diff";
import { ParentNode } from "./ParentNode";
import { AtomOrSelector } from "./types";
export class Selector<
  ReturnType,
  R1 = any,
  R2 = any,
  R3 = any,
  R4 = any,
  R5 = any,
  R6 = any,
  R7 = any,
  R8 = any,
  R9 = any
> extends ParentNode<any> {
  cacheVal: ReturnType | null;
  cacheInputs: any[] | null;
  func: any;

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [];
    func: () => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>];
    func: (val1: R1) => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
    func: (val1: R1, val2: R2) => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>];
    func: (val1: R1, val2: R2, val3: R3) => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4) => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5) => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>, AtomOrSelector<R6>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6) => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>, AtomOrSelector<R6>, AtomOrSelector<R7>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7) => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>, AtomOrSelector<R6>, AtomOrSelector<R7>, AtomOrSelector<R8>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7, val8: R8) => ReturnType;
  });

  // prettier-ignore
  public constructor(params: {
    id: string;
    inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>, AtomOrSelector<R3>, AtomOrSelector<R4>, AtomOrSelector<R5>, AtomOrSelector<R6>, AtomOrSelector<R7>, AtomOrSelector<R8>, AtomOrSelector<R9>];
    func: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7, val8: R8, val9: R9) => ReturnType;
  });

  constructor(params: any) {
    super(params);
    this.cacheVal = null;
    this.cacheInputs = null;
    this.func = params.func;
  }

  get(): ReturnType {
    const vals: ParentNode<any>[] = super
      .getDependencies()
      .map((d: any) => d.get());
    if (arraysDiff(vals, this.cacheInputs)) {
      const result = this.func(...vals);
      this.cacheVal = result;
      this.cacheInputs = vals;
      return result;
    }
    return this.cacheVal as ReturnType;
  }
}
