import { ParentNode } from "./ParentNode";

export class Atom<T> extends ParentNode<any> {
  data: T;

  constructor(params: { data: T; id: string }) {
    super(params);
    this.data = params.data;
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
