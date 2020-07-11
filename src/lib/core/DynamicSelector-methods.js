import { arraysDiff } from "../helpers/array-diff";

export const dynamicSelectorMethods = {
  get: function() {
    if (this.useCache === true) {
      return this.cacheVal;
    }
    const oldDependencies = super.getDependencies();
    const vals = oldDependencies.map(d => d.get());
    if (arraysDiff(vals, this.cacheInputs)) {
      const newDependenciesSet = new Set();
      const oldDependenciesSet = new Set(oldDependencies);
      const getter = atom => {
        newDependenciesSet.add(atom);
        return atom.get();
      };
      const result = this.func(getter);
      this.cacheVal = result;
      this.cacheInputs = vals;
      // disconnect any nodes that are no longer dependencies
      for (const old of oldDependencies) {
        if (!newDependenciesSet.has(old)) {
          this.disconnect(old);
        }
      }
      // connect new dependencies
      for (const newDep of Array.from(newDependenciesSet)) {
        if (!oldDependenciesSet.has(newDep)) {
          this.connect(newDep);
        }
      }
      return result;
    }
    this.useCache = true;
    return this.cacheVal;
  }
};
