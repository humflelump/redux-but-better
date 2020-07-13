# Motivation

Redux is incredibly powerful state management tool, however there are many things that can be improved.

### Code Splitting

Redux's reliance on single global reducer and middleware causes poor code splitting. For example, if a single action types requires a large library like moment, every single component will need to import that library. This quickly adds up for large applications.

### Performance

In redux, every action, in addition to calling the middleware and reducer, will check every single mounted component and selector to check what needs to re-render. So simply updating a textfield may call thousands of functions. And its easy to make a small mistake and accidentally cause components to re-render after every action. This library takes a more surgical approach because it keeps track of the dependency graph. It immediately knows exactly which components and selectors need to update and only calls them.

### Boilerplate

Redux is known for its boilerplate. The action-middleware-reducer pattern and the conventions around it naturally lead to a lot of code. This library has simpler approach similar to React.useState() allowing simply setting values in state.

### Async Selectors

Native support for async selectors allows you to use data from a database or do calculations using web workers just as easily as you would normally select data out of state. This is apposed to the standard middleware approach which involves a lot of code and is hard to maintain at scale.

### Web Sockets

This library allows you to treat data streams as first-class citizens because of the subscription architecture. Web sockets can open and close in response to components subscribing and unsubscribing without the components knowing or caring about it. You can chain together selectors, async selectors, and data streams in complex ways, but the complexity of deciding what queries to make and what components to update and what data to cache is handled by the architecture.

### Size and Simplicity

With Redux, you are looking at needing a handful of libraries and an annoying initial setup to just get started. These libraries are going to set you back about 10kb - 20kb (gzip), while this library is around 2kb. Conceptually, this library is a lot simpler too. The only two concepts you need to understand are atoms and selectors. You can also integrate it easily into an existing app and requires no initial setup.

### Dev Tools

Redux is know for its powerful dev tools which functionality like time travel debugging. This library takes it a step further because it allows you to analyze the entire dependency graph and what is dependent or subscribed to what.

# Basic Example

Here is how you would make a basic counter component.

```js
import React from "react";
import { atom, useValues } from "redux-but-better";

const countAtom = atom({
  id: "count", // All atoms need a globally unique id for persistence and debugging purposes.
  data: 1
});

export const CounterComponent = React.memo(() => {
  // Using .memo prevents over-rendering
  const [count] = useValues([countAtom]);
  return <div onClick={() => countAtom.set(count + 1)}>count: {count}</div>;
});
```

All state is held in atoms, and components can subscribe to atoms and update them. This is similar to React.useState(), except the atom can be shared across many components. Now if we want to show derived state, like the square of the count, you can use selectors.

```js
import React from "react";
import { atom, selector, useValues } from "redux-but-better";

const countAtom = atom({
  id: "count",
  data: 1
});

const squareSelector = selector({
  id: "squareSelector",
  inputs: [countAtom],
  func: val => val * val
});

export const CounterComponent = React.memo(() => {
  const [count, square] = useValues([countAtom, squareSelector]);
  return (
    <div onClick={() => countAtom.set(count + 1)}>
      count: {count}, square: {square}
    </div>
  );
});
```

Congratulations! You now understand everything there is about redux-but-better. The only concepts you really need to understand are atoms and selectors. They can be thought of as the basic logic gates by which more complex abstractions can be built. All the other functions in this library are built by combining these in clever ways.

Under the hood, this works differently from redux. Rather than checking every mounted component to see if any of the selectors has a new value, here the atoms know which components are subscribed and will only check those components.

# Advanced Examples

While at the core, this library is really just atoms and selectors, there are many simple yet powerful features built on top to help developing real applications.

### Data Slices

Sometimes you want to group data together into slice, but manually giving every piece of data a unique id can be tedious. The createMolecule() function streamlines things.

```js
import { createMolecule } from "redux-but-better";

const mySlice = createMolecule({
  key: "slice",
  getMetadata: (val, key) => ({ initial: val, persist: true }), // optional
  slice: {
    atom1: "hi",
    atom2: "Hello, World"
  }
});

console.log(mySlice.atom1.get()); // hi
mySlice.atom1.set("yoyo");
console.log(mySlice.atom1.get()); // yoyo
console.log(mySlice.atom2.getId()); // slice.atom2
console.log(mySlice.atom2.getMetadata()); // { initial: "Hello, World", persist: true }
```

### Actions

You may be tempted to put all the logic for updating atoms inside the components. The problem is sometimes you will have to pass in atoms into the component that it don't actually need to render. This in turn causes over-rendering. Additionally it would be nice to place collections of atoms set events into one action for dev-tool and documentation purposes.

```js
import { atom, createAction, store } from "redux-but-better";

const atom1 = atom({ id: "atom1", data: 12 });
const atom2 = atom({ id: "atom2", data: 69.42 });

const setMultipleValues = createAction({
  id: "setMultipleValues",
  func: val => {
    atom1.set(val);
    atom2.set(val);
  }
});

store.subscribeToActions(actionInfo => console.log(actionInfo));
console.log(atom1.get()); // 12
setMultipleValues(42);
console.log(atom1.get()); // 42
```

### Async Actions

Many actions, like saving something to a database, are done asynchronously. Commonly, you will you want to show a loading indicator and possibly allow for the cancellation of these actions. createAsyncAction() is a convenient way to solve these problems.

```js
import { atom, createAsyncAction } from "redux-but-better";
import { saveToDb } from "./api";

const dataAtom = atom({ id: "dataAtom", data: [1, 2, 3] });

const [saveData, loadingSelector, errorSelector] = createAsyncAction({
  id: "save",
  func: async status => {
    console.log(status); // { id: "save", cancelled: false, onCancel: f }
    status.onCancel = () => console.log("Undo the request somehow");
    const data = dataAtom.get();
    await saveToDb(data);
  }
});

console.log(loadingSelector.get()); // false
console.log(errorSelector.get()); // undefined
const status = saveData(); // Begins saving the data
console.log(status); // { id: "save", cancelled: false, onCancel: f }
saveData(); // This marks the previous request as cancelled - You can handle this however you like.
console.log(status); // { id: "save", cancelled: true, onCancel: f }
console.log(loadingSelector.get()); // true
setTimeout(() => {
  console.log(loadingSelector.get()); // false
}, 5000);
```

### Async Selectors

Derived state can also be calculated asynchronously. This includes calculations done on the server or in a web worker, but also data fetches from a database. This is much more convenient and more scalable then treating these calculations as side-effects because now the library can keep track of when queries need to be made based, rather than the developer. Also, you can swap a normal selector for an async one without changing anything else. Just make sure the async functions don't actually contain long-term side-effects like updating an atom or saving to a DB. And, they should return the same value given the same inputs (at least in the short-term).

```js
import { atom, selector, createAsyncSelector } from "redux-but-better";
import {
  fetchData,
  complexAlgorithmInWebWorker,
  formatResults
} from "./some-file";
import debounce from "lodash/debounce";

const [dataResponse, dataLoading, dataError, forceUpdate] = createAsyncSelector(
  {
    id: "data fetch",
    inputs: [],
    defaultValue: null,
    func: async () => {
      return await fetchData();
    }
  }
);

const inputAtom = atom({
  id: "algorithm-input",
  data: 5
});

const [algorithmResults, algorithmLoading] = createAsyncSelector({
  id: "algorithm-async",
  inputs: [dataLoading, dataResponse, inputAtom],
  defaultValue: [],
  shouldUseAsync: (loading, resp) => !loading && resp, // don't spawn web worker until a response comes back
  throttle: f => debounce(f, 500), // in case input changes very frequently
  func: async (loading, resp, input, status) => {
    console.log(status); // { id: 'algorithm-async', cancelled: false, onCancel: f }
    status.onCancel = () => complexAlgorithmInWebWorker.abort();
    return await complexAlgorithmInWebWorker(resp, input);
  }
});

const finalResult = selector({
  id: "final-result",
  inputs: [dataResponse],
  func: resp => formatResults(resp)
});
```

### Throttled Selectors

A pretty normal situation is that you have a value that changes frequently (like something in a textfield), but there is large computation or re-render that slows down the app in response. A normal approach is to only update global state if local state hasn't changed in a while. This is cumbersome, inflexible, and violates the single-source-of-truth principle. Throttling selectors solves this problem.

```js
import { atom, useValues, createThrottledSelector } from "redux-but-better";
import debounce from "lodash/debounce";
import React from "react";

const textAtom = atom({
  id: "text",
  data: ""
});

const throttledTitle = createThrottledSelector({
  id: "throttled-text",
  inputs: [textAtom],
  func: text => "Title: " + text,
  throttle: f => debounce(f, 300)
});

const TextFieldComponent = React.memo(() => {
  const [text] = useValues([textAtom]);
  return <input value={text} onChange={e => textAtom.set(e.target.value)} />;
});

const SuperSlowToRenderComponent = React.memo(() => {
  const [text] = useValues([throttledTitle]);
  return (
    <div>
      <GiantChart title={text} />
    </div>
  );
});
```

### Subscriptions and Data Streams

Possibly the most powerful feature of redux-but-better and its architecture is its ability to help you manage subscriptions without the components knowing. You can include these subscriptions anywhere in your dependency graph along side async selectors, selectors, and atoms.

```js
import { atom, createSubscription } from 'redux-but-better';
import React from 'react';

const dateFormat = atom({id: 'format', data: 'unix' });

const data = {};

const [getDate] = createSubscription({
  id: 'date-sub',
  data: Date.now(),
  inputs: [dateFormat],
  onSubscribe: ([format], setter) => { // when subscription count goes from zero to one
    data.interval = setInterval(() => {
      if (dateFormat.get() === 'unix') {
        setter(Date.now() / 1000);
      } else {
        setter(Date.now());
      }
    }, 100)
  },
  onUnsubscribe: ([format], setter) => { // when subscription count goes from one to zero
    clearInterval(data.interval);
  },
  onInputsChanged: (current, previous, setter) => {
    // Normally you would notify the server that there are new inputs
  },
  onSubscriptionsChanged(current, previous, setter) => {

  },
})

export const CurrentTimeComponent = React.memo(() => {
  const [time] = useValues([getDate]);
  return <div>Time: {time}</div>
})
```

### Dynamic Selectors

A normal selector first computes all its input selectors before the function is called. However, sometimes not all the inputs need to computed every time, and this would be inefficient. Dynamic selectors compute the inputs lazily and actually update the dependency graph after every call.

```js
import { atom, dynamicSelector } from 'redux-but-better';
import { complexAlgorithmResult, longQueryResult, fancyWebsocketResult } = './some-file';

const switcher = atom({ id: 'switch', data: 'socket' });

const result = dynamicSelector({
  id: 'dynamic',
  func: (get) => {
    switch(get(switcher)) {
      case 'socket':
        return get(fancyWebsocketResult);
      case 'async':
        return get(longQueryResult);
      default:
        return get(complexAlgorithmResult);
    }
  },
});
```

The cool thing about this is that if switcher was set to "async", the web socket could be automatically unsubscribed.

You might consider using dynamic selectors for everything, and you can! However consider this before you do that:

1. The dependencies won't be documented clearly.
2. You will have to call get() every time, which is annoying.
3. The passed function will be tightly coupled to the library and can't be reused.
4. Keeping track of the function calls will be a slight performance drain.

### Nested Atoms

redux-but-better supports atoms within atoms. It will even serialize and deserialize the data structure for you for save/reload. A use-case for this is when you have arbitrarily many of a component, but you need the data exposed globally for some other purpose.

```js
import { atom, createAction, createId, dynamicSelector } from 'redux-but-better';

const atomOfAtoms = atom({ id: 'atoms', data: [] });

const addNewAtom = createAction({
  id: 'addNewAtom',
  func: () => {
    const old = atomOfAtoms.get();
    const newAtom = atom({ id: createId(), data: 10 });
    atomOfAtoms.set([...old, newAtom]);
  }
});

const firstAndThirdSum = dynamicSelector({
  id: 'fancy',
  func: (get) => {
    const atoms = get(atomOfAtom);
    let sum = 0;
    if (atoms.length > 1) {
      sum += get(atoms[1]);
    }
    if (atoms.length > 3) {
      sum += get(atoms[3]);
    }
    return sum;
  },
});

const ListItem = React.memo(({atom}) => {
  const [num] = useValues([atom]);
  return <div onClick={() => atom.set(num + 1)}>{num}</div>
});

const List = React.memo(() => {
  const [atoms] = useValues([atomOfAtoms]);
  return <div>
    <button onClick={addNewAtom}>New Atom</button>
  {
    atoms.map(atom => <ListItem atom={atom} key={atom.getId()} />
  }
  </div>
});

const Sum13 = React.memo(() => {
  const [sum] = useValues([firstAndThirdSum]);
  return <div>Sum: {sum}</div>
})
```

Only exactly the components that need to re-render will re-render! This would be very difficult with redux.

### Undo/Redo

Since all data is held in a central store, and all actions are monitored, undo/redo is fairly simple. Here is an example.

```js
class UndoManager {
  list = [] as any[];
  index = 0;
  shouldAddToList = true;

  constructor() {
    store.subscribeToChangedAtoms((atom, prev) => {
      if (this.shouldAddToList === true) {
        if (atom.metadata !== "myslice") return;
        if (this.list.length === 0) {
          this.list.push([atom, prev]);
        }
        this.list.push([atom, atom.get()]);
        this.index = this.list.length - 1;
      }
    });
  }

  jump(index) {
    this.shouldAddToList = false;
    this.list[index][0].set(this.list[index][1]);
    this.shouldAddToList = true;
  }

  undo() {
    if (this.index > 0) {
      this.index -= 1;
      this.jump(this.index);
    }
  }

  redo() {
    if (this.index < this.list.length - 1) {
      this.index += 1;
      this.jump(this.index);
    }
  }
}
```

### Save/Reload

The store allows for easy serialization and deserialization of state.

```js
import { store } from "redux-but-better";

const json = store.toJSON();
store.mergeJSON(json);
```
