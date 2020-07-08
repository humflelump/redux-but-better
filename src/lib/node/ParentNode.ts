import { Listener, ListenerListener } from "./types";
import { createId } from "../helpers/createId";

export class ParentNode<T> {
  private id: string;
  public listeners: Set<Listener>;
  public dependents: ParentNode<any>[];
  public dependencies: ParentNode<any>[];
  private listenersChanged: ListenerListener | null;

  constructor(params: {
    id: string;
    inputs?: ParentNode<any>[];
    listenersChanged?: ListenerListener;
  }) {
    this.id = params.id || createId();
    this.dependencies = params.inputs || [];
    this.dependents = [];
    this.listeners = new Set();
    this.dependencies.forEach(input => input.addDependent(this));
    this.listenersChanged = params.listenersChanged || null;
  }

  public disconnect<T>(parent: ParentNode<T>) {
    const existingListenersOnSiblings = new Set<Listener>();
    for (const sibling of parent.dependents) {
      if (sibling === this) continue;
      for (const listener of Array.from(sibling.listeners)) {
        existingListenersOnSiblings.add(listener);
      }
    }
    for (const listener of Array.from(this.listeners)) {
      if (!existingListenersOnSiblings.has(listener)) {
        parent.removeChangeListenerFromParents(listener);
      }
    }
    this.dependencies = this.dependencies.filter(dep => dep !== parent);
    parent.dependents = parent.dependents.filter(dep => dep !== this);
  }

  public connect<T>(parent: ParentNode<T>) {
    for (const listener of Array.from(this.listeners)) {
      parent.addChangeListenerToParents(listener);
    }
    this.dependencies.push(parent);
    parent.dependents.push(this);
  }

  public addChangeListenerToParents(listener: Listener) {
    if (this.listeners.has(listener)) {
      return;
    }
    this.listeners.add(listener);
    if (this.listenersChanged) {
      const newListeners = Array.from(this.listeners);
      const oldListeners = newListeners.filter(f => f !== listener);
      this.listenersChanged(newListeners, oldListeners);
    }
    for (let i = 0; i < this.dependencies.length; i++) {
      this.dependencies[i].addChangeListenerToParents(listener);
    }
  }

  public removeChangeListenerFromParents(listener: Listener) {
    if (!this.listeners.has(listener)) {
      return;
    }
    this.listeners.delete(listener);
    if (this.listenersChanged) {
      const newListeners = Array.from(this.listeners);
      const oldListeners = [...newListeners, listener];
      this.listenersChanged(newListeners, oldListeners);
    }
    for (let i = 0; i < this.dependencies.length; i++) {
      this.dependencies[i].removeChangeListenerFromParents(listener);
    }
  }

  public getId() {
    return this.id;
  }

  public getListeners() {
    return this.listeners;
  }

  public getDependencies() {
    return this.dependencies;
  }

  private addDependent(node: ParentNode<any>) {
    this.dependents.push(node);
  }
}
