import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createMolecule } from "./lib/functions/createMolecule";
import { Selector } from "./lib/core/Selector";
import { createAction } from "./lib/functions/createAction";
import { useAtom } from "./lib/hooks/useAtom";
import { useSelector } from "./lib/hooks/useSelector";
import { createAsyncAction } from "./lib/functions/createAsyncAction";
import { Atom } from "./lib/core/Atom";
import { createAsyncSelector } from "./lib/functions/createAsyncSelector";
import { useMolecule } from "./lib/hooks/useMolecule";
import { useCell } from "./lib/hooks/useCell";
import { DynamicSelector } from "./lib/core/DynamicSelector";
import { createSubscription } from "./lib/functions/createSubscription";
import { store } from "./lib/store";
import { createId } from "./lib/helpers/createId";
import { findAndReplace } from "./lib/helpers/transform-json";

console.log(
  createSubscription,
  DynamicSelector,
  useCell,
  useMolecule,
  createAsyncSelector,
  Atom,
  createAsyncAction,
  useSelector,
  useAtom,
  createAction,
  Selector,
  createMolecule
);
const mol = createMolecule({
  key: "slice",
  metadata: "myslice",
  slice: {
    hey: "wow",
    yo: "um"
  }
});

const doubled = new Selector({
  id: "ay",
  inputs: [mol.hey],
  func: s => s + s
});

const reset = createAction({
  id: "wowowow",
  inputs: [],
  atoms: [mol.hey, mol.yo],
  func: (setHey, setYo) => {
    setHey("!!!");
    setYo("!!!");
  }
});

const App1 = React.memo(() => {
  const [value, setValue] = useAtom(mol.hey);
  const d = useSelector(doubled);
  return (
    <div onClick={() => setValue(value + "!")}>
      {value}
      {d}
    </div>
  );
});

const App2 = React.memo(() => {
  const [value, setValue] = useAtom(mol.yo);
  return <div onClick={() => setValue(value + "!")}>{value}</div>;
});

const [asyncAction, isLoading, getError] = createAsyncAction({
  id: "53535",
  atoms: [mol.hey],
  inputs: [mol.hey],
  func: async (setHey, hey, state) => {
    await new Promise(res => setTimeout(res, 2000));
    if (state.cancelled) return;
    setHey(hey + hey);
  }
});

const App3 = () => {
  const l = useSelector(isLoading);
  return (
    <button onClick={asyncAction}>{l ? "Loading..." : "async action"}</button>
  );
};

const a = new Atom({
  id: "345345435",
  data: "wow"
});

const [asyncSelector, aL, err, forceUpdate] = createAsyncSelector({
  defaultValue: "wowwow",
  inputs: [a],
  func: async (text, state) => {
    await new Promise(res => setTimeout(res, 2000));
    return text + text + Math.random();
  },
  id: "yoyyooy"
});

const App4 = React.memo(() => {
  const [text, setText] = useAtom(a);
  useSelector(doubled);
  const loading = useSelector(aL as any);
  const double = useSelector(asyncSelector as any);
  return (
    <div>
      <button onClick={() => setText(text + "!")}>
        {!loading ? "click" : "loading"}
      </button>
      <button onClick={forceUpdate}>force</button>
      <div>double: {double}</div>
    </div>
  );
});

const Toggle = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>close</button>
      {open ? children : null}
    </div>
  );
};

var ar = len => {
  var L = [] as any;
  for (let i = 1; i < len + 1; i++) {
    L.push(i);
  }
  return L;
};

const atoms = ar(5).map(
  i =>
    new Atom({
      id: String(i) + "__",
      data: i
    })
);

const Item = (props: { index: number }) => {
  const { index } = props;
  const [val, setVal] = useAtom(atoms[index]);
  return <div onClick={() => setVal(val + 1)}>{val}</div>;
};

const App6 = React.memo(() => {
  return (
    <div>
      {atoms.map((a, i) => (
        <Item key={i} index={i} />
      ))}
    </div>
  );
});

const ChildComp = (props: { num: number }) => {
  const numAtom = useMolecule(props).num;
  const select = useCell(() => {
    return new Selector({
      id: "wowow",
      inputs: [numAtom],
      func: num => num * 10
    });
  });
  return (
    <div>
      {numAtom.get()}, {select.get()}
    </div>
  );
};

const ParentComp = () => {
  const [num, setNum] = React.useState(1);
  return (
    <div>
      <button onClick={() => setNum(num + 1)}>increment</button>
      <ChildComp num={num} />
      <ChildComp num={66} />
    </div>
  );
};

const a1 = new Atom({
  id: "a1",
  data: "a1"
});

const a2 = new Atom({
  id: "a2",
  data: "a2"
});

const switch_ = new Atom({
  id: "SWITCH",
  data: true
});

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
const undoManager = new UndoManager();

const dynSel = new DynamicSelector({
  func: get => {
    if (get(switch_) === true) {
      return get(a1);
    } else {
      return get(a2);
    }
  }
});

const App7 = React.memo(() => {
  const val = useSelector(dynSel);
  const [switchVal, setSwitch] = useAtom(switch_);
  return (
    <div>
      <button onClick={() => setSwitch(!switchVal)}>toggle</button>
      <div>{val}</div>
    </div>
  );
});

const [sub] = createSubscription({
  id: "hththt",
  data: "mydata",
  inputs: [dynSel]
});

const App8 = React.memo(() => {
  const data = useSelector(sub);
  return <div>sub: {data}</div>;
});

const App9 = () => {
  return (
    <div>
      <button onClick={() => undoManager.undo()}>Undo</button>
      <button onClick={() => undoManager.redo()}>Redo</button>
    </div>
  );
};

const atomatom = new Atom({
  id: "atomatom",
  data: [] as Atom<number, any>[]
});

const sum = new DynamicSelector({
  id: "wowowowooww",
  func: get => {
    const atoms = get(atomatom);
    let s = 0;
    for (const atom of atoms) {
      s += get(atom);
    }
    return s;
  }
});

const addAtom = createAction({
  id: "addAction",
  inputs: [atomatom],
  atoms: [atomatom],
  func: (setter, atoms) => {
    const next = new Atom({
      id: createId(),
      data: 10
    });
    setter([...atoms, next]);
  }
});

const ChildBlah = React.memo((props: { atom: Atom<number, any> }) => {
  const [val, setVal] = useAtom(props.atom);
  console.log("render", val);
  return <div onClick={() => setVal(val + 1)}>{val}</div>;
});

const App10 = () => {
  const [atoms] = useAtom(atomatom);
  const total = useSelector(sum);
  return (
    <div>
      <button onClick={addAtom}>New Atom!</button>
      {atoms.map((atom, index) => {
        return <ChildBlah atom={atom} key={index} />;
      })}
      <div>total: ${total}</div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Toggle>
        <App1 />
        <App2 />
        <button onClick={reset}>reset</button>
        <App3 />
        <App4 />
        <App6 />
        <ParentComp />
        <App7 />
        <App8 />
        <App9 />
        <App10 />
      </Toggle>
    </div>
  );
}

setTimeout(() => {
  console.log("rumhmghm", store.toJSON());
}, 5000);

export default App;
