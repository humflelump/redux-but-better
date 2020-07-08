import { ParentNode } from "./ParentNode";
import { Atom } from "./Atom";
import { arraysDiff } from "../helpers/array-diff";
export class DynamicSelector<ReturnType> extends ParentNode<ReturnType> {
  cacheVal: ReturnType | null;
  cacheInputs: any[] | null;
  func: any;

  constructor(params: any) {
    super(params);
    this.cacheVal = null;
    this.cacheInputs = null;
    this.func = params.func;
  }

  get() {
    const oldDependencies = [...super.getDependencies()];
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
      for (const old of oldDependencies) {
        if (!newDependenciesSet.has(old)) {
          console.log("disconnect", old);
          super.disconnect(old);
        }
      }
      for (const newDep of Array.from(newDependenciesSet)) {
        if (!oldDependenciesSet.has(newDep)) {
          console.log("connect", newDep);
          super.connect(newDep);
        }
      }
      return result;
    }
    return this.cacheVal as ReturnType;
  }
}
