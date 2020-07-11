import { createId } from "./helpers/createId";
import { findAndReplace } from "./helpers/transform-json";
import { Atom } from "./core/types";
import { atom } from "./core/atom";
import { ActionEffect } from "./functions/types";

type AtomSubscription = (atom: Atom<any>) => void;

class Store {
  private atoms = {} as { [id: string]: Atom<any> };

  // Having an array of functions to call is slightly more efficient
  // than having an object of functions because it avoids Object.values()
  private subscriptions = {
    addAtom: [] as AtomSubscription[],
    addAtomIds: [] as string[],
    removeAtom: [] as AtomSubscription[],
    removeAtomIds: [] as string[],
    atomSet: [] as ((atom: Atom<any>, prev: any) => void)[],
    atomSetIds: [] as string[],
    actionFired: [] as ((effect: ActionEffect) => void)[],
    actionFiredIds: [] as string[]
  };

  private addSubscription(type: string, f: any) {
    const id = createId();
    this.subscriptions[type].push(f);
    this.subscriptions[`${type}Ids`].push(id);
    return id;
  }

  private removeSubscription(type: string, id: string) {
    const index = this.subscriptions[`${type}Ids`].indexOf(id);
    this.subscriptions[`${type}Ids`] = this.subscriptions[`${type}Ids`].filter(
      (_, i) => i !== index
    );
    this.subscriptions[type] = this.subscriptions[type].filter(
      (_, i) => i !== index
    );
  }

  public notifyAtomChange(atom: Atom<any, any>, prev: any) {
    this.subscriptions.atomSet.forEach(f => f(atom, prev));
  }

  public notifyActionFired(effect: ActionEffect) {
    this.subscriptions.actionFired.forEach(f => f(effect));
  }

  public toJSON() {
    const replace = obj => {
      const res = findAndReplace(
        obj,
        o => atom.isAtom(o),
        (a: any) => {
          const d = a.toJSON();
          d.data = replace(d.data);
          return d;
        }
      );
    };
    return replace(this.atoms);
  }

  public mergeJSON(json: { [id: string]: any }) {
    const replace = obj => {
      const res = findAndReplace(
        obj,
        (o: any) => o && o.type === "__atom__",
        (a: any) => {
          if (!(a.id in this.atoms)) {
            this.atoms[a.id] = atom(a);
          }
          this.atoms[a.id].set(replace(a.data));
          return this.atoms[a.id];
        }
      );
      return res;
    };
    return replace(json);
  }

  public subscribeToActions(f: AtomSubscription) {
    const id = this.addSubscription("actionFired", f);
    return () => this.removeSubscription("actionFired", id);
  }

  public subscribeToCreatedAtoms(f: AtomSubscription) {
    const id = this.addSubscription("addAtom", f);
    return () => this.removeSubscription("addAtom", id);
  }

  public subscribeToChangedAtoms(f: (atom: Atom<any, any>, prev: any) => void) {
    const id = this.addSubscription("atomSet", f);
    return () => this.removeSubscription("atomSet", id);
  }

  public subscribeToRemovedAtoms(f: AtomSubscription) {
    const id = this.addSubscription("removeAtom", f);
    return () => this.removeSubscription("removeAtom", id);
  }

  public addAtom(atom: Atom<any, any>) {
    this.subscriptions.addAtom.forEach(f => f(atom));
    if (atom.getId() in this.atoms) {
      throw Error(`Atom with id "${atom.getId()}" already exists`);
    }
    this.atoms[atom.getId()] = atom;
  }

  public removeAtom<T>(atom: Atom<T>) {
    this.subscriptions.removeAtom.forEach(f => f(atom));
    delete this.atoms[atom.getId()];
  }
}

export const store = new Store();
(window as any).store = store;
