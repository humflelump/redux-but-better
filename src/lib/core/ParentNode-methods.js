export const parentMethods = {
  revokeCache: function() {
    if (this.useCache === false) {
      return;
    }
    this.useCache = false;
    for (let i = 0; i < this.dependants.length; i++) {
      this.dependants[i].revokeCache();
    }
  },

  disconnect: function(parent) {
    const existingListenersOnSiblings = new Set();
    for (const sibling of parent.dependants) {
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
    parent.dependants = parent.dependants.filter(dep => dep !== this);
  },

  connect: function(parent) {
    for (const listener of Array.from(this.listeners)) {
      parent.addChangeListenerToParents(listener);
    }
    this.dependencies.push(parent);
    parent.dependants.push(this);
  },

  addChangeListenerToParents: function(listener) {
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
  },

  removeChangeListenerFromParents: function(listener) {
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
  },

  getId: function() {
    return this.id;
  },

  getListeners: function() {
    return this.listeners;
  },

  getDependencies: function() {
    return this.dependencies;
  },

  getDependants: function() {
    return this.dependants;
  },

  addDependant: function(node) {
    this.dependants.push(node);
  }
};
