import { Listener } from "./types";

export class ParentNode<T> {
  private id: string;
  private listeners: Set<Listener>;
  private dependents: ParentNode<any>[];
  private dependencies: ParentNode<any>[];

  constructor(params: { id: string; inputs?: ParentNode<any>[] }) {
    this.id = params.id;
    this.dependencies = params.inputs || [];
    this.dependents = [];
    this.listeners = new Set();
    this.dependencies.forEach(input => input.addDependent(this));
  }

  public addChangeListenerToParents(listener: Listener) {
    if (this.listeners.has(listener)) {
      return;
    }
    this.listeners.add(listener);
    for (let i = 0; i < this.dependencies.length; i++) {
      this.dependencies[i].addChangeListenerToParents(listener);
    }
  }

  public removeChangeListenerFromParents(listener: Listener) {
    if (!this.listeners.has(listener)) {
      return;
    }
    this.listeners.delete(listener);
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
