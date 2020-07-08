import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createMolecule } from "./lib/functions/createMolecule";
import { Selector } from "./lib/node/Selector";
import { createAction } from "./lib/functions/createAction";
import { useAtom } from "./lib/hooks/useAtom";
import { useSelector } from "./lib/hooks/useSelector";
import { createAsyncAction } from "./lib/functions/createAsyncAction";
import { Atom } from "./lib/node/Atom";
import { createAsyncSelector } from "./lib/functions/createAsyncSelector";
import { useMolecule } from "./lib/hooks/useMolecule";
import { useCell } from "./lib/hooks/useCell";
import { DynamicSelector } from "./lib/node/DynamicSelector";
import { createSubscription } from "./lib/functions/createSubscription";

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
  data: "wow",
  listenersChanged: console.log
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
  inputs: [dynSel],
  onInputsChanged: (...vals) => console.log("onInputsChanged", vals),
  onSubscriptionsChanged: (...vals) =>
    console.log("onSubscriptionsChanged", vals)
});

const App8 = React.memo(() => {
  const data = useSelector(sub);
  return <div>sub: {data}</div>;
});

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
      </Toggle>
    </div>
  );
}

export default App;
