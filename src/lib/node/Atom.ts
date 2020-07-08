import { ParentNode } from "./ParentNode";
import { store } from "../functions/createStore";
import { ListenerListener } from "./types";

export class Atom<T> extends ParentNode<any> {
  data: T;

  constructor(params: {
    data: T;
    id: string;
    listenersChanged?: ListenerListener;
  }) {
    super(params);
    this.data = params.data;
    store.addAtom(this);
  }

  get() {
    return this.data;
  }

  set(val: T, notifyListeners = true) {
    const changed = val !== this.data;
    this.data = val;
    if (changed && notifyListeners) {
      super.getListeners().forEach(listener => listener());
    }
  }
}
