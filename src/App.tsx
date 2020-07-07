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

function App() {
  return (
    <div className="App">
      <Toggle>
        <App1 />
        <App2 />
        <button onClick={reset}>reset</button>
        <App3 />
        <App4 />
      </Toggle>
    </div>
  );
}

export default App;
