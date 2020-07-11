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
function genType(inputs) {
      return `
export function createAsyncAction${inputs > 0 ? '<' : ''}${ar(inputs).map(i => `I${i}`).join(', ')}${inputs > 0 ? '>' : ''}(func: (${ar(inputs).map(i => `val${i}: I${i}`).join(', ')}${inputs > 0 ? ', ' : ''}info?: AsyncActionState) => Promise<any>): [
  AsyncActionFunction,
  Selector<boolean>,
  Selector<any | undefined>,
]; 
  `
  }

var res = ar(10).map((d, i) => genType(i)).join(`
`);
console.log(res);
