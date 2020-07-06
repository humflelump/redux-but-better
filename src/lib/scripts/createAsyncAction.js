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
  export function createAsyncAction${inputs + atoms > 0 ? '<' : ''}${ar(atoms).map(i => `S${i}`).join(', ')}${atoms > 0 ? ', ' : ''}${ar(inputs).map(i => `R${i}`).join(', ')}${inputs + atoms > 0 ? '>' : ''}(params: {
      id: string;
      inputs${inputs === 0 ? '?' : ''}: [${ar(inputs).map(i => `AtomOrSelector<R${i}>`).join(', ')}];
      atoms${atoms === 0 ? '?' : ''}: [${ar(atoms).map(i => `AtomOrSelector<S${i}>`).join(', ')}];
      func: (${ar(atoms).map(i => `set${i}: Setter<S${i}>`).join(', ')}${atoms > 0 ? ', ' : ''}${ar(inputs).map(i => `val${i}: R${i}`).join(', ')}${inputs > 0 ? ', ' : ''}state: AsyncActionState) => Promise<void>;
  }): [AsyncActionFunction, Selector<boolean>, Selector<any | undefined>];    
  `
  }

var res = ma(4, 4).map(a => genType(a[0], a[1])).join(`
  
  `);
console.log(res);
