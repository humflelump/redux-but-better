var ar = len => {
  var L = [];
  for (let i = 1; i < len + 1; i++) {
    L.push(i);
  }
  return L;
};

var ma = (a, b) => {
  var L = [];
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      L.push([i, j]);
    }
  }
  return L;
};

// prettier-ignore
function genType(inputs, atoms) {
    return `
export function createAction${inputs + atoms > 0 ? '<' : ''}${ar(atoms).map(i => `S${i}`).join(', ')}${atoms > 0 ? ', ' : ''}${ar(inputs).map(i => `R${i}`).join(', ')}${inputs + atoms > 0 ? '>' : ''}(params: {
    id: string;
    inputs${inputs === 0 ? '?' : ''}: [${ar(inputs).map(i => `AtomOrSelector<R${i}>`).join(', ')}];
    atoms${atoms === 0 ? '?' : ''}: [${ar(atoms).map(i => `AtomOrSelector<S${i}>`).join(', ')}];
    func: (${ar(atoms).map(i => `set${i}: Setter<S${i}>`).join(', ')}${atoms > 0 ? ', ' : ''}${ar(inputs).map(i => `val${i}: R${i}`).join(', ')}) => void;
}): ActionFunction;    
`
}

var res = ma(4, 4).map(a => genType(a[0], a[1])).join(`

`);
console.log(res);

// export function createAction(params: {
//     id: string;
//     inputs: [];
//     atoms: [];
//     func: () => void;
//   }): ActionFunction;

//   export function createAction<R1>(params: {
//     id: string;
//     inputs: [AtomOrSelector<R1>];
//     atoms: [];
//     func: (val1: R1) => void;
//   }): ActionFunction;

//   export function createAction<R1, R2>(params: {
//     id: string;
//     inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
//     atoms: [];
//     func: (val1: R1, val2: R2) => void;
//   }): ActionFunction;

//   export function createAction<S1>(params: {
//     id: string;
//     inputs: [];
//     atoms: [Atom<S1>];
//     func: (set1: Setter<S1>) => void;
//   }): ActionFunction;

//   export function createAction<S1, R1>(params: {
//     id: string;
//     inputs: [AtomOrSelector<R1>];
//     atoms: [Atom<S1>];
//     func: (set1: Setter<S1>, val1: R1) => void;
//   }): ActionFunction;

//   export function createAction<S1, R1, R2>(params: {
//     id: string;
//     inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
//     atoms: [Atom<S1>];
//     func: (set1: Setter<S1>, val1: R1, val2: R2) => void;
//   }): ActionFunction;

//   export function createAction<S1, S2>(params: {
//     id: string;
//     inputs: [];
//     atoms: [Atom<S1>, Atom<S2>];
//     func: (set1: Setter<S1>, set2: Setter<S2>) => void;
//   }): ActionFunction;

//   export function createAction<S1, S2, R1>(params: {
//     id: string;
//     inputs: [AtomOrSelector<R1>];
//     atoms: [Atom<S1>, Atom<S2>];
//     func: (set1: Setter<S1>, set2: Setter<S2>, val1: R1) => void;
//   }): ActionFunction;

//   export function createAction<S1, S2, R1, R2>(params: {
//     id: string;
//     inputs: [AtomOrSelector<R1>, AtomOrSelector<R2>];
//     atoms: [Atom<S1>, Atom<S2>];
//     func: (set1: Setter<S1>, set2: Setter<S2>, val1: R1, val2: R2) => void;
//   }): ActionFunction;
