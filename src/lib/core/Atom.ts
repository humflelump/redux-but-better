import { ParentNode } from "./ParentNode";
import { store } from "../store";
import { ListenerListener } from "./types";

export class Atom<T, Metadata = {}> extends ParentNode<any> {
  data: T;
  metadata: Metadata;

  constructor(params: {
    data: T;
    id: string;
    listenersChanged?: ListenerListener;
    metadata?: Metadata;
  }) {
    super(params);
    this.data = params.data;
    this.metadata = ("metadata" in params ? params.metadata : {}) as Metadata;
    store.addAtom(this);
  }

  get() {
    this.useCache = true;
    return this.data;
  }

  set(val: T, notifyListeners = true) {
    const changed = val !== this.data;
    const prev = this.data;
    this.data = val;
    super.revokeCache();
    if (changed) {
      store.notifyAtomChange(this, prev);
    }
    if (changed && notifyListeners) {
      super.getListeners().forEach(listener => listener());
    }
  }

  toJSON() {
    return {
      id: this.getId(),
      data: this.data,
      metadata: this.metadata,
      type: "__atom__"
    };
  }
}
