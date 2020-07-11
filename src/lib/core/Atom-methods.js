import { store } from "../store";

export const atomMethods = {
  get: function() {
    this.useCache = true;
    return this.data;
  },
  set: function(val, notifyListeners = true) {
    const changed = val !== this.data;
    const prev = this.data;
    this.data = val;
    this.revokeCache();
    if (changed) {
      store.notifyAtomChange(this, prev);
    }
    if (changed && notifyListeners) {
      this.getListeners().forEach(listener => listener());
    }
  },
  toJSON: function() {
    return {
      id: this.getId(),
      data: this.data,
      metadata: this.metadata,
      type: "__atom__"
    };
  },
  getMetadata: function() {
    return this.metadata;
  }
};
// export function createAtom(params) {
//   const state = {
//     data: params.data,
//     metadata: null,
//     id: params.id || createId(),
//     dependencies: params.inputs || [],
//     dependents: [],
//     listeners: new Set(),
//     listenersChanged: params.listenersChanged || null,
//     __proto__: proto
//   };

//   return state;
// }
// var L = [];
// const t = performance.now();
// for (let i = 0; i < 100000; i++) {
//   L.push(
//     createAtom({
//       data: "53545",
//       id: String(i)
//     })
//   );
// }
// console.log("took", performance.now() - t);
// console.log(L);
