import { Atom } from "./atom";
class Store {
  atoms: { [id: string]: Atom<any> };
  constructor() {
    this.atoms = {};
  }

  addAtom<T>(atom: Atom<T>) {
    this.atoms[atom.getId()] = atom;
  }

  getAtom(id: string) {
    return this.atoms[id];
  }
}
export const store = new Store();
