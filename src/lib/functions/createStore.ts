import { Atom } from "../node/Atom";
import { createId } from "../helpers/createId";
import { mapValues } from "../helpers/map-values";

type AtomSubscription = (atom: Atom<any>) => void;

class Store {
  private atoms = {} as { [id: string]: Atom<any> };

  private subscriptions = {
    addAtom: {} as { [id: string]: AtomSubscription },
    removeAtom: {} as { [id: string]: AtomSubscription }
  };

  public toJSON() {
    return mapValues(this.atoms, atom => atom.get()) as { [id: string]: any };
  }

  public loadJSON(json: { [id: string]: any }) {
    for (const key in json) {
      if (key in this.atoms) {
        this.atoms[key].set(json[key]);
      }
    }
  }

  public subscribeToCreatedAtoms(f: AtomSubscription) {
    const id = createId();
    this.subscriptions.addAtom[id] = f;
    return () => {
      delete this.subscriptions.addAtom[id];
    };
  }

  public subscribeToRemovedAtoms(f: AtomSubscription) {
    const id = createId();
    this.subscriptions.removeAtom[id] = f;
    return () => {
      delete this.subscriptions.removeAtom[id];
    };
  }

  public addAtom<T>(atom: Atom<T>) {
    Object.values(this.subscriptions.addAtom).forEach(f => f(atom));
    if (atom.getId() in this.atoms) {
      throw Error(`Atom with id "${atom.getId()}" already exists`);
    }
    this.atoms[atom.getId()] = atom;
  }

  public removeAtom<T>(atom: Atom<T>) {
    Object.values(this.subscriptions.removeAtom).forEach(f => f(atom));
    delete this.atoms[atom.getId()];
  }
}

export const store = new Store();
(window as any).store = store;
