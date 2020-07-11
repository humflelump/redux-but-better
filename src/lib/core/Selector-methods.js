import { arraysDiff } from "../helpers/array-diff";

export const selectorMethods = {
  get: function() {
    // cache is revoked when a parent atom is set
    if (this.useCache === true) {
      return this.cacheVal;
    }
    const vals = this.getDependencies().map(d => d.get());
    if (arraysDiff(vals, this.cacheInputs)) {
      const result = this.func(...vals);
      this.cacheVal = result;
      this.cacheInputs = vals;
      return result;
    }
    this.useCache = true;
    return this.cacheVal;
  }
};
