import { ParentNode } from "./ParentNode";
import { Atom } from "./Atom";
import { arraysDiff } from "../helpers/array-diff";
import { AtomOrSelector } from "./types";
export class DynamicSelector<ReturnType> extends ParentNode<ReturnType> {
  cacheVal: ReturnType | null;
  cacheInputs: any[] | null;
  func: (get: <T>(atom: Atom<T>) => T) => ReturnType;

  constructor(params: {
    id?: string;
    inputs?: AtomOrSelector<any>[];
    func: (get: <T>(atom: Atom<T>) => T) => ReturnType;
  }) {
    super(params);
    this.cacheVal = null;
    this.cacheInputs = null;
    this.func = params.func;
  }

  get() {
    if (this.useCache === true) {
      return this.cacheVal as ReturnType;
    }
    const oldDependencies = super.getDependencies();
    const vals = oldDependencies.map((d: any) => d.get());
    if (arraysDiff(vals, this.cacheInputs)) {
      const newDependenciesSet = new Set<ParentNode<any>>();
      const oldDependenciesSet = new Set(oldDependencies);
      const getter = <T>(atom: Atom<T>) => {
        newDependenciesSet.add(atom);
        return atom.get();
      };
      const result = this.func(getter);
      this.cacheVal = result;
      this.cacheInputs = vals;
      // disconnect any nodes that are no longer dependencies
      for (const old of oldDependencies) {
        if (!newDependenciesSet.has(old)) {
          super.disconnect(old);
        }
      }
      // connect new dependencies
      for (const newDep of Array.from(newDependenciesSet)) {
        if (!oldDependenciesSet.has(newDep)) {
          super.connect(newDep);
        }
      }
      return result;
    }
    this.useCache = true;
    return this.cacheVal as ReturnType;
  }
}
