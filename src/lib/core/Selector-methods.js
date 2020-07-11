import { arraysDiff } from "../helpers/array-diff";

export const selectorMethods = {
  get: function() {
    // cache is revoked when a parent atom is set
    if (this.useCache === true) {
      return this.cacheVal;
    }
    this.useCache = true;
    const vals = this.getDependencies().map(d => d.get());
    if (arraysDiff(vals, this.cacheInputs)) {
      this.cacheInputs = vals;
      const result = this.func(...vals);
      this.cacheVal = result;
      return result;
    }
    return this.cacheVal;
  }
};
